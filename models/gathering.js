const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('gathering', {
    gathering_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: "uc_gathering_name"
    },
    leader_id: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    region: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "미정"
    },
    place: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "미정"
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    state: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    maximumHeadCount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    currentHeadCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    image_url: {
      type: DataTypes.BLOB,
      allowNull: true
    },
    deadline: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'gathering',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "gathering_id" },
        ]
      },
      {
        name: "uc_gathering_name",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "name" },
        ]
      },
    ]
  });
};
