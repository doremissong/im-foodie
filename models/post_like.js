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
    mem_sq: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'member',
        key: 'mem_sq'
      }
    },
    isLiked: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    register_datetime: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'post_like',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "post_id" },
          { name: "mem_sq" },
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
        name: "fk_post_like_mem_sq",
        using: "BTREE",
        fields: [
          { name: "mem_sq" },
        ]
      },
    ]
  });
};
