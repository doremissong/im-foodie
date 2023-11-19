const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('post_comment', {
    post_comment_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    post_id: {
      type: DataTypes.INTEGER,
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
    },
    state: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'post_comment',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "post_comment_id" },
        ]
      },
      {
        name: "uc_post_comment_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "post_comment_id" },
        ]
      },
      {
        name: "fk_post_comment_mem_sq",
        using: "BTREE",
        fields: [
          { name: "mem_id" },
        ]
      },
    ]
  });
};
