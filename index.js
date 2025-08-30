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
  }
);

const { DataTypes } = Sequelize;

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
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
  },
  age: {
    type: DataTypes.INTEGER,
    defaultValue: 22,
  },
  WittCodeRocks: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

User.sync({ alter: true })
  .then(() => {
    // console.log("Table and model synced successfully");
    const user = User.create({
      username: "WittCode",
      password: "123",
      age: 25,
      WittCodeRocks: true,
    });

    return user;
  })
  .then((data) => {
    console.log("User added to DB");
    console.log(data.toJSON());
    data.username = "Robin";
    return data.destroy();
  })
  .then((data) => {
    console.log("User updated");
    console.log("2nd:", data.toJSON());
  })
  .catch((error) => {
    console.log(error);
  });
