const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('board', {
    board_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: "uc_board_name"
    },
    create_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    update_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
  }, {
    sequelize,
    tableName: 'board',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "board_id" },
        ]
      },
      {
        name: "uc_board_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "board_id" },
        ]
      },
      {
        name: "uc_board_name",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "name" },
        ]
      },
    ]
  });
};
