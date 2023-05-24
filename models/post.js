const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('post', {
    post_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    board_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'board',
        key: 'board_id'
      }
    },
    writer_sq: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'member',
        key: 'mem_sq'
      }
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    state: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    create_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    update_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    delete_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    img_flag: {
      type: DataTypes.TINYINT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'post',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "post_id" },
        ]
      },
      {
        name: "uc_post_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "post_id" },
        ]
      },
      {
        name: "idx_post_board_id",
        using: "BTREE",
        fields: [
          { name: "board_id" },
        ]
      },
      {
        name: "idx_post_mem_sq",
        using: "BTREE",
        fields: [
          { name: "writer_sq" },
        ]
      },
    ]
  });
};
