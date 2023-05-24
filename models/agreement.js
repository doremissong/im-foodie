const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('agreement', {
    agreement_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    operator_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'operator',
        key: 'operator_id'
      }
    },
    title: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    create_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    update_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    delete_date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'agreement',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "agreement_id" },
        ]
      },
      {
        name: "uc_agreement_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "agreement_id" },
        ]
      },
      {
        name: "fk_agreement_operator_id",
        using: "BTREE",
        fields: [
          { name: "operator_id" },
        ]
      },
    ]
  });
};
