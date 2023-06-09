const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('post_clip', {
    post_clip_id: {
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
    isClipped: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    register_datetime: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'post_clip',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "post_clip_id" },
        ]
      },
      {
        name: "uc_post_clip_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "post_clip_id" },
        ]
      },
      {
        name: "fk_post_clip_post_id",
        using: "BTREE",
        fields: [
          { name: "post_id" },
        ]
      },
      {
        name: "fk_post_clip_mem_sq",
        using: "BTREE",
        fields: [
          { name: "mem_sq" },
        ]
      },
    ]
  });
};
