const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('recipe', {
    recipe_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    writer_id: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    menu: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    cookTime: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 30
    },
    cookLevel: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 3
    },
    imageURL: {
      type: DataTypes.BLOB,
      allowNull: true
    },
    viewCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'recipe',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "recipe_id" },
        ]
      },
    ]
  });
};
