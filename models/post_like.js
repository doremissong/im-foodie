const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('post_like', {
    post_like_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "uc_post_like_id"
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'post',
        key: 'post_id'
      }
    },
    mem_id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    isLiked: {
      type: DataTypes.TINYINT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'post_like',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "post_id" },
          { name: "mem_id" },
        ]
      },
      {
        name: "uc_post_like_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "post_like_id" },
        ]
      },
      {
        name: "uc_postId_memId",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "post_id" },
          { name: "mem_id" },
        ]
      },
    ]
  });
};
