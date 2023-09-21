const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('chat', {
    chat_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    gathering_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'gathering',
        key: 'gathering_id'
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
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    unread_count: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    image_url: {
      type: DataTypes.BLOB,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'chat',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "chat_id" },
        ]
      },
      {
        name: "fk_chat_gathering_id",
        using: "BTREE",
        fields: [
          { name: "gathering_id" },
        ]
      },
      {
        name: "fk_chat_mem_id",
        using: "BTREE",
        fields: [
          { name: "mem_id" },
        ]
      },
    ]
  });
};
