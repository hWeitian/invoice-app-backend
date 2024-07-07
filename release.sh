npm install
# npx sequelize-cli db:drop
# npx sequelize-cli db:create
npx sequelize-cli db:migrate
# npx sequelize-cli db:seed:all

npx sequelize-cli db:seed --seed 20240707023040-gst_rates.js