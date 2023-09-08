const puppeteer = require("puppeteer");

/**
 * Function to scrape exchange rate from MAS website
 * @param {string} startYear Example: "2023"
 * @param {strin} endYear Example: "2023"
 * @param {string} startMonth Example: "Aug", "Sep", "Apr"
 * @param {string} endMonth Example: "Aug", "Sep", "Apr"
 * @param {string} frequency Example: "Monthly", "Yearly", "Daily", "Weekly"
 * @returns
 */
const scrapeRates = async (
  startYear,
  endYear,
  startMonth,
  endMonth,
  frequency
) => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto(
    "https://eservices.mas.gov.sg/Statistics/msb/ExchangeRates.aspx"
  );

  // Set screen size. Mainly used for debugging purpose when taking screenshot
  await page.setViewport({ width: 1080, height: 1024 });

  // Select Start Year
  const startYearOption = (
    await page.$x(
      `//*[@id = "ContentPlaceHolder1_StartYearDropDownList"]/option[text() = "${startYear}"]`
    )
  )[0];
  const startYearValue = await (
    await startYearOption.getProperty("value")
  ).jsonValue();
  await page.select(
    "#ContentPlaceHolder1_StartYearDropDownList",
    startYearValue
  );

  // Select End Year
  const endYearOption = (
    await page.$x(
      `//*[@id = "ContentPlaceHolder1_EndYearDropDownList"]/option[text() = "${endYear}"]`
    )
  )[0];
  const endYearValue = await (
    await endYearOption.getProperty("value")
  ).jsonValue();
  await page.select("#ContentPlaceHolder1_EndYearDropDownList", endYearValue);

  // Select Start Month
  const startMonthOption = (
    await page.$x(
      `//*[@id = "ContentPlaceHolder1_StartMonthDropDownList"]/option[text() = "${startMonth}"]`
    )
  )[0];
  const startMonthValue = await (
    await startMonthOption.getProperty("value")
  ).jsonValue();
  await page.select(
    "#ContentPlaceHolder1_StartMonthDropDownList",
    startMonthValue
  );

  // Select End Month
  const endMonthOption = (
    await page.$x(
      `//*[@id = "ContentPlaceHolder1_EndMonthDropDownList"]/option[text() = "${endMonth}"]`
    )
  )[0];
  const endMonthValue = await (
    await endMonthOption.getProperty("value")
  ).jsonValue();
  await page.select("#ContentPlaceHolder1_EndMonthDropDownList", endMonthValue);

  // Select Frequency
  const frequencyOption = (
    await page.$x(
      `//*[@id = "ContentPlaceHolder1_FrequencyDropDownList"]/option[text() = "${frequency}"]`
    )
  )[0];
  const frequencyValue = await (
    await frequencyOption.getProperty("value")
  ).jsonValue();
  await page.select(
    "#ContentPlaceHolder1_FrequencyDropDownList",
    frequencyValue
  );

  // Locate the Display button then click
  await page.locator("#ContentPlaceHolder1_DisplayButton").click();

  // Wait for page to navigate
  await page.waitForNavigation();

  // Take screenshot - For debugging purpose
  // await page.screenshot({ path: "example.png" });

  const rates = await page.$$eval("table tr td", (tds) =>
    tds.map((td) => {
      return td.innerText;
    })
  );

  const requiredRate = rates[4];

  await browser.close();

  return requiredRate;
};

module.exports = {
  scrapeRates,
};
