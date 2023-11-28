const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('recipe_like', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    recipe_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'recipe',
        key: 'recipe_id'
      }
    },
    mem_id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      references: {
        model: 'member',
        key: 'mem_id'
      }
    },
    isLiked: {
      type: DataTypes.TINYINT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'recipe_like',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "FK_RECIPE_RECIPE_ID",
        using: "BTREE",
        fields: [
          { name: "recipe_id" },
        ]
      },
      {
        name: "FK_RECIPE_MEM_ID",
        using: "BTREE",
        fields: [
          { name: "mem_id" },
        ]
      },
    ]
  });
};
