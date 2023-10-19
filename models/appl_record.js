const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('appl_record', {
    gathering_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    mem_id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    state: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
    },
    message: {
      type: DataTypes.STRING(200),
      allowNull: false,
      defaultValue: "밥모임 가입하고 싶어요"
    }
  }, {
    sequelize,
    tableName: 'appl_record',
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
    ]
  });
};
