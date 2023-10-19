const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('member', {
    mem_id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "uc_mem_pw"
    },
    name: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "uc_mem_email"
    },
    tel: {
      type: DataTypes.STRING(11),
      allowNull: false,
      unique: "uc_mem_tel"
    },
    address: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: "0"
    },
    birthdate: {
      type: DataTypes.STRING(6),
      allowNull: false
    },
    profile_image: {
      type: DataTypes.BLOB,
      allowNull: false
    },
    state: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    tos_flag: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    pip_flag: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    notification_flag: {
      type: DataTypes.TINYINT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'member',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "mem_id" },
        ]
      },
      {
        name: "uc_mem_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "mem_id" },
        ]
      },
      {
        name: "uc_mem_email",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "uc_mem_tel",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "tel" },
        ]
      },
      {
        name: "uc_mem_pw",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "password" },
        ]
      },
    ]
  });
};
