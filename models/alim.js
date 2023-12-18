const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('alim', {
    alim_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    mem_id: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    sender_id: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    isRead: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'alim',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "alim_id" },
        ]
      },
    ]
  });
};
