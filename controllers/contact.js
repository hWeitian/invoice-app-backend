const { db } = require("../db/models/index");
const { Op } = require("sequelize");
const axios = require("axios").default;
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const { Contact, Company } = db;

async function getAll(req, res) {
  try {
    const newContact = await Contact.findAll();
    return res.json(newContact);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
}

async function getFromCompany(req, res) {
  const { companyId } = req.params;
  try {
    const newContact = await Contact.findAll({
      attributes: ["id", "firstName", "lastName", "designation", "email"],
      where: { companyId: companyId },
    });
    return res.json(newContact);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
}

async function getFromEmail(req, res) {
  const { email } = req.params;
  try {
    const currentUser = await Contact.findOne({ where: { email: email } });
    return res.json(currentUser);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
}

async function getPaginatedData(req, res) {
  const { page, size } = req.params;
  try {
    const newContacts = await Contact.findAndCountAll({
      include: [{ model: Company }],
      limit: size,
      offset: page * size,
      distinct: true,
      order: [["id", "ASC"]],
    });
    return res.json(newContacts);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
}

async function searchContactByCopmpany(req, res) {
  const { searchText, page, size } = req.params;
  try {
    const contacts = await Contact.findAndCountAll({
      distinct: true,
      order: [["id", "ASC"]],
      include: [
        { model: Company, where: { name: { [Op.iLike]: `%${searchText}%` } } },
      ],
    });

    let finalData = {
      count: contacts.count,
      rows: [],
    };

    const pageNum = Number(page);
    const sizeNum = Number(size);

    if (contacts.count > sizeNum) {
      const startIndex = pageNum * sizeNum;
      const endIndex = startIndex + (sizeNum - 1);

      for (let i = startIndex; i <= endIndex; i++) {
        if (contacts.rows[i] !== undefined) {
          finalData.rows.push(contacts.rows[i]);
        }
      }

      return res.json(finalData);
    } else {
      return res.json(contacts);
    }
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
}

async function searchContactByName(req, res) {
  const { searchText, page, size } = req.params;
  try {
    const contacts = await Contact.findAndCountAll({
      where: {
        [Op.or]: [
          {
            lastName: {
              [Op.iLike]: `%${searchText}%`,
            },
          },
          {
            firstName: {
              [Op.iLike]: `%${searchText}%`,
            },
          },
        ],
      },
      include: [{ model: Company }],
      distinct: true,
      order: [["id", "ASC"]],
    });

    let finalData = {
      count: contacts.count,
      rows: [],
    };

    const pageNum = Number(page);
    const sizeNum = Number(size);

    if (contacts.count > sizeNum) {
      const startIndex = pageNum * sizeNum;
      const endIndex = startIndex + (sizeNum - 1);

      for (let i = startIndex; i <= endIndex; i++) {
        if (contacts.rows[i] !== undefined) {
          finalData.rows.push(contacts.rows[i]);
        }
      }

      return res.json(finalData);
    } else {
      return res.json(contacts);
    }
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
}

async function addContact(req, res) {
  const newData = req.body;
  try {
    const newContact = await Contact.create(newData);
    if (newData.isAdmin) {
      const response = await addUserToAuth(newData.firstName, newData.email);
    }
    return res.json(newContact);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
}

async function updateContact(req, res) {
  const { adminChanged, id } = req.params;
  const newData = req.body;
  try {
    const updatedContact = await Contact.update(newData, {
      where: { id: id },
    });

    if (adminChanged === "true") {
      if (newData.isAdmin) {
        await addUserToAuth(newData.firstName, newData.email);
      } else {
        const userId = await getUserFromAuth(newData.email);
        const response = await deleteUserFromAuth(userId);
      }
    } else if (newData.isAdmin === true) {
      const userId = await getUserFromAuth(newData.email);
      const response = await updateUserInAuth(userId, newData.firstName);
    }

    return res.json(updatedContact);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
}

async function deleteContact(req, res) {
  const { id } = req.params;
  try {
    const deletedContact = await Contact.destroy({
      where: { id: id },
    });
    return res.json(deletedContact);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
}

async function getAuthAccessToken() {
  const options = {
    method: "POST",
    url: `https://${process.env.AUTH_URL}/oauth/token`,
    headers: { "content-type": "application/x-www-form-urlencoded" },
    data: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: process.env.AUTH_CLIENTID,
      client_secret: process.env.AUTH_SECRET,
      audience: `https://${process.env.AUTH_DOMAIN}/api/v2/`,
    }),
  };

  const response = await axios.request(options);
  return response.data.access_token;
}

async function updateUserInAuth(userId, userName) {
  try {
    const accessToken = await getAuthAccessToken();
    const user = await axios.patch(
      `https://${process.env.AUTH_DOMAIN}/api/v2/users/${userId}`,
      {
        name: userName,
      },
      {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return user.data.user_id;
  } catch (e) {
    console.log(e);
  }
}

async function createUser(accessToken, newUser) {
  try {
    const user = await axios.post(
      `https://${process.env.AUTH_DOMAIN}/api/v2/users`,
      newUser,
      {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const userId = user.data.user_id;
    return userId;
  } catch (e) {
    console.error(e);
  }
}

async function createPasswordChangeTicket(accessToken, userEmail) {
  try {
    const ticket = {
      email: userEmail,
      connection_id: process.env.AUTH_CONNECTION_ID,
      result_url: process.env.AUTH_REDIRECTURL,
      mark_email_as_verified: true,
      ttl_sec: 259200, // 3 days. If set to 0  or 432000 is 5 days
    };
    const returnTicket = await axios.post(
      `https://${process.env.AUTH_DOMAIN}/api/v2/tickets/password-change`,
      ticket,
      {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return returnTicket;
  } catch (e) {
    console.log(e);
  }
}

async function sendEmail(userEmail, ticketLink) {
  try {
    const msg = {
      to: userEmail,
      from: { name: "InvoiceGenie", email: process.env.SG_EMAIL }, // Verified sender email in send grid
      subject: "Invitation from InvoiceGenie",
      text: `Click here ${ticketLink} to accept invitation`,
      html: `<html>
  <head>
    <style type="text/css">
      .ExternalClass,.ExternalClass div,.ExternalClass font,.ExternalClass p,.ExternalClass span,.ExternalClass td,img {line-height: 100%;}#outlook a {padding: 0;}.ExternalClass,.ReadMsgBody {width: 100%;}a,blockquote,body,li,p,table,td {-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;}table,td {mso-table-lspace: 0;mso-table-rspace: 0;}img {-ms-interpolation-mode: bicubic;border: 0;height: auto;outline: 0;text-decoration: none;}table {border-collapse: collapse !important;}#bodyCell,#bodyTable,body {height: 100% !important;margin: 0;padding: 0;font-family: ProximaNova, sans-serif;}#bodyCell {padding: 20px;}#bodyTable {width: 600px;}@font-face {font-family: ProximaNova;src: url(https://cdn.auth0.com/fonts/proxima-nova/proximanova-regular-webfont-webfont.eot);src: url(https://cdn.auth0.com/fonts/proxima-nova/proximanova-regular-webfont-webfont.eot?#iefix)format("embedded-opentype"),url(https://cdn.auth0.com/fonts/proxima-nova/proximanova-regular-webfont-webfont.woff) format("woff");font-weight: 400;font-style: normal;}@font-face {font-family: ProximaNova;src: url(https://cdn.auth0.com/fonts/proxima-nova/proximanova-semibold-webfont-webfont.eot);src: url(https://cdn.auth0.com/fonts/proxima-nova/proximanova-semibold-webfont-webfont.eot?#iefix)format("embedded-opentype"),url(https://cdn.auth0.com/fonts/proxima-nova/proximanova-semibold-webfont-webfont.woff) format("woff");font-weight: 600;font-style: normal;}@media only screen and (max-width: 480px) {#bodyTable,body {width: 100% !important;}a,blockquote,body,li,p,table,td {-webkit-text-size-adjust: none !important;}body {min-width: 100% !important;}#bodyTable {max-width: 600px !important;}#signIn {max-width: 280px !important;}}
    </style>
  </head>
  <body>
    <center>
      <table
        style='width: 600px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;margin: 0;padding: 0;font-family: "ProximaNova", sans-serif;border-collapse: collapse !important;height: 100% !important;'
        align="center"
        border="0"
        cellpadding="0"
        cellspacing="0"
        height="100%"
        width="100%"
        id="bodyTable"
      >
        <tr>
          <td
            align="center"
            valign="top"
            id="bodyCell"
            style='-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;margin: 0;padding: 20px;font-family: "ProximaNova", sans-serif;height: 100% !important;'
          >
            <div class="main">
              <p
                style="text-align: center;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%; margin-bottom: 30px;"
              >
                <img
                  src="https://raw.githubusercontent.com/hWeitian/invoice-app-frontend/main/src/Assets/Logo.png"
                  width="350"
                  alt="invoice genie logo"
                  style="-ms-interpolation-mode: bicubic;border: 0;height: auto;line-height: 100%;outline: none;text-decoration: none;"
                />
              </p>
              
      
               <h1>Invitation to Access InvoiceGenie</h1>
              
              <p>The administrator has invited you to access InvoiceGenie</p>
              
              <p>
                <strong><a href="${ticketLink}">Click here</a></strong> to accept the invitation.
              </p>
              
              <strong>Invoice Genie</strong>

              <br /><br />
              <hr style="border: 2px solid #EAEEF3; border-bottom: 0; margin: 20px 0;" />
              <p style="text-align: center;color: #A9B3BC;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;">
                If you did not make this request, please contact us by replying to this mail.
              </p>
            </div>
          </td>
        </tr>
      </table>
    </center>
  </body>
</html>`,
    };

    const response = await sgMail.send(msg);
    return response[0].statusCode;
  } catch (e) {
    console.log(e);
  }
}

async function getUserFromAuth(userEmail) {
  try {
    const accessToken = await getAuthAccessToken();
    const user = await axios.get(
      `https://${process.env.AUTH_DOMAIN}/api/v2/users-by-email`,
      {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          email: `${userEmail}`,
        },
      }
    );
    return user.data[0].user_id;
  } catch (e) {
    console.log(e);
  }
}

async function deleteUserFromAuth(userId) {
  try {
    const accessToken = await getAuthAccessToken();
    const response = await axios.delete(
      `https://${process.env.AUTH_DOMAIN}/api/v2/users/${userId}`,
      {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return "User deleted";
  } catch (e) {
    console.log(e);
  }
}

async function addUserToAuth(userName, userEmail) {
  const newUser = {
    email: userEmail,
    email_verified: true,
    name: userName,
    connection: process.env.AUTH_CONNECTION,
    password: process.env.AUTH_TEMP_PW,
  };
  try {
    const accessToken = await getAuthAccessToken();
    const userId = await createUser(accessToken, newUser);
    const ticket = await createPasswordChangeTicket(accessToken, newUser.email);
    const ticketLink = `${ticket.data.ticket}type=invite`;
    const result = await sendEmail(newUser.email, ticketLink);
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  getAll,
  getFromCompany,
  getFromEmail,
  getPaginatedData,
  addContact,
  updateContact,
  deleteContact,
  searchContactByCopmpany,
  searchContactByName,
};
