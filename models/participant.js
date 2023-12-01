const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('participant', {
    gathering_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'gathering',
        key: 'gathering_id'
      }
    },
    mem_id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'member',
        key: 'mem_id'
      }
    },
    message: {
      type: DataTypes.STRING(200),
      allowNull: false,
      defaultValue: "밥모임 가입하고 싶어요"
    },
    state: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    // ISLEADER = 0,
    // ISMEMBER = 1,
    // 신청함
    // 
    isConnected: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'participant',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "gathering_id" },
          { name: "mem_id" },
        ]
      },
      {
        name: "fk_participant_mem_id",
        using: "BTREE",
        fields: [
          { name: "mem_id" },
        ]
      },
    ]
  });
};
