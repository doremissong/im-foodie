const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('operator', {
    operator_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    mem_sq: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'member',
        key: 'mem_sq'
      }
    }
  }, {
    sequelize,
    tableName: 'operator',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "operator_id" },
        ]
      },
      {
        name: "uc_operator_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "operator_id" },
        ]
      },
      {
        name: "fk_operator_mem_sq",
        using: "BTREE",
        fields: [
          { name: "mem_sq" },
        ]
      },
    ]
  });
};
