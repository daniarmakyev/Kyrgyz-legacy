const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const bcrypt = require("bcrypt");
// Модель User
const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: "USER",
    allowNull: true,
  },
  level: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    allowNull: true,
  },
  lives: {
    type: DataTypes.INTEGER,
    defaultValue: 5,
  },
  passwordConfirm: {
    type: DataTypes.VIRTUAL,
  },
  lang: {
    type: DataTypes.STRING,
    allowNull: false, 
    validate: {
      isIn: [['ru', 'en', 'hi']],
    },
    defaultValue: 'en',
  },
  refreshToken: {
  type: DataTypes.STRING,
  allowNull: true,
},
});

User.beforeSave(async (user, options) => {
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, 5);
  }
});

const Word = sequelize.define(
    'word',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      wordId: {
        type: DataTypes.INTEGER,
        allowNull: false, // обязательное поле
      },
      level: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      word: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      translationRu: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      translationHi: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      translationEn: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      manSound: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      womanSound: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: false,
    }
  );

module.exports = {
  User,
  Word,
};