const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('post_image', {
    post_image_id: {
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
    image_no: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    caption: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    image_url: {
      type: DataTypes.BLOB,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'post_image',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "post_image_id" },
        ]
      },
      {
        name: "uc_post_image_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "post_image_id" },
        ]
      },
      {
        name: "fk_post_image_post_id",
        using: "BTREE",
        fields: [
          { name: "post_id" },
        ]
      },
    ]
  });
};
