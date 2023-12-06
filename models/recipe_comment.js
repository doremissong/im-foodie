const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('recipe_comment', {
    recipe_comment_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    recipe_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    mem_id: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    state: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    depth: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    group_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    group_no: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'recipe_comment',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "recipe_comment_id" },
        ]
      },
    ]
  });
};
