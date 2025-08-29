const Sequelize = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    define: {
      timestamps: false,
      freezeTableName: true,
    },
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection successful!");
  })
  .catch((err) => {
    console.log("Error connecting to database!");
  });

const User = sequelize.define("user", {
  user_id: {
    type: Sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.DataTypes.STRING,
  },
  age: {
    type: Sequelize.DataTypes.INTEGER,
    defaultValue: 22,
  },
});

User.sync({ force: true })
  .then(() => {
    console.log("Table and model synced successfully");
  })
  .catch((error) => {
    console.log(error);
  });
