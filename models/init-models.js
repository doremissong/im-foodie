var DataTypes = require("sequelize").DataTypes;
var _appl_record = require("./appl_record");
var _chat = require("./chat");
var _gathering = require("./gathering");
var _member = require("./member");
var _operator = require("./operator");
var _participant = require("./participant");
var _post = require("./post");
var _post_clip = require("./post_clip");
var _post_comment = require("./post_comment");
var _post_image = require("./post_image");
var _post_like = require("./post_like");
var _sessions = require("./sessions");
var _temp = require("./temp");

function initModels(sequelize) {
  var appl_record = _appl_record(sequelize, DataTypes);
  var chat = _chat(sequelize, DataTypes);
  var gathering = _gathering(sequelize, DataTypes);
  var member = _member(sequelize, DataTypes);
  var operator = _operator(sequelize, DataTypes);
  var participant = _participant(sequelize, DataTypes);
  var post = _post(sequelize, DataTypes);
  var post_clip = _post_clip(sequelize, DataTypes);
  var post_comment = _post_comment(sequelize, DataTypes);
  var post_image = _post_image(sequelize, DataTypes);
  var post_like = _post_like(sequelize, DataTypes);
  var sessions = _sessions(sequelize, DataTypes);
  var temp = _temp(sequelize, DataTypes);

  gathering.belongsToMany(member, { as: 'mem_id_members', through: participant, foreignKey: "gathering_id", otherKey: "mem_id" });
  member.belongsToMany(gathering, { as: 'gathering_id_gatherings', through: participant, foreignKey: "mem_id", otherKey: "gathering_id" });
  chat.belongsTo(gathering, { as: "gathering", foreignKey: "gathering_id"});
  gathering.hasMany(chat, { as: "chats", foreignKey: "gathering_id"});
  participant.belongsTo(gathering, { as: "gathering", foreignKey: "gathering_id"});
  gathering.hasMany(participant, { as: "participants", foreignKey: "gathering_id"});
  chat.belongsTo(member, { as: "mem", foreignKey: "mem_id"});
  member.hasMany(chat, { as: "chats", foreignKey: "mem_id"});
  participant.belongsTo(member, { as: "mem", foreignKey: "mem_id"});
  member.hasMany(participant, { as: "participants", foreignKey: "mem_id"});
  post_clip.belongsTo(post, { as: "post", foreignKey: "post_id"});
  post.hasMany(post_clip, { as: "post_clips", foreignKey: "post_id"});
  post_comment.belongsTo(post, { as: "post", foreignKey: "post_id"});
  post.hasMany(post_comment, { as: "post_comments", foreignKey: "post_id"});
  post_image.belongsTo(post, { as: "post", foreignKey: "post_id"});
  post.hasMany(post_image, { as: "post_images", foreignKey: "post_id"});
  post_like.belongsTo(post, { as: "post", foreignKey: "post_id"});
  post.hasMany(post_like, { as: "post_likes", foreignKey: "post_id"});

  return {
    appl_record,
    chat,
    gathering,
    member,
    operator,
    participant,
    post,
    post_clip,
    post_comment,
    post_image,
    post_like,
    sessions,
    temp,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
