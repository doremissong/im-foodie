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
      allowNull: false,
      references: {
        model: 'post',
        key: 'post_id'
      }
    },
    mem_sq: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'member',
        key: 'mem_sq'
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    depth: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    group_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    group_no: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    create_datetime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    update_datetime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    delete_datetime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    state: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'post_comment',
    timestamps: false,
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
        name: "fk_post_comment_post_id",
        using: "BTREE",
        fields: [
          { name: "post_id" },
        ]
      },
      {
        name: "fk_post_comment_mem_sq",
        using: "BTREE",
        fields: [
          { name: "mem_sq" },
        ]
      },
    ]
  });
};
