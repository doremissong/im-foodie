const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('recipe_tag', {
    recipe_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'recipe',
        key: 'recipe_id'
      }
    },
    tag_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'tag',
        key: 'tag_id'
      }
    }
  }, {
    sequelize,
    tableName: 'recipe_tag',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "recipe_id" },
          { name: "tag_id" },
        ]
      },
      {
        name: "FK_RECIPE_TAG_TAG_ID",
        using: "BTREE",
        fields: [
          { name: "tag_id" },
        ]
      },
    ]
  });
};
