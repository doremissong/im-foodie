// 각각 생성된 모델들의 관계를 설정하고 데이터베이스를 잇는 역할
var DataTypes = require("sequelize").DataTypes;
var _agreement = require("./agreement");
var _board = require("./board");
var _member = require("./member");
var _operator = require("./operator");
var _post = require("./post");
var _post_clip = require("./post_clip");
var _post_comment = require("./post_comment");
var _post_image = require("./post_image");
var _post_like = require("./post_like");
var _temp = require("./temp");

function initModels(sequelize) {
  var agreement = _agreement(sequelize, DataTypes);
  var board = _board(sequelize, DataTypes);
  var member = _member(sequelize, DataTypes);
  var operator = _operator(sequelize, DataTypes);
  var post = _post(sequelize, DataTypes);
  var post_clip = _post_clip(sequelize, DataTypes);
  var post_comment = _post_comment(sequelize, DataTypes);
  var post_image = _post_image(sequelize, DataTypes);
  var post_like = _post_like(sequelize, DataTypes);
  var temp = _temp(sequelize, DataTypes);

  member.belongsToMany(post, { as: 'post_id_posts', through: post_like, foreignKey: "mem_sq", otherKey: "post_id" });
  post.belongsToMany(member, { as: 'mem_sq_members', through: post_like, foreignKey: "post_id", otherKey: "mem_sq" });
  post.belongsTo(board, { as: "board", foreignKey: "board_id"});
  board.hasMany(post, { as: "posts", foreignKey: "board_id"});
  operator.belongsTo(member, { as: "mem_sq_member", foreignKey: "mem_sq"});
  member.hasMany(operator, { as: "operators", foreignKey: "mem_sq"});
  post.belongsTo(member, { as: "writer_sq_member", foreignKey: "writer_sq"});
  member.hasMany(post, { as: "posts", foreignKey: "writer_sq"});
  post_clip.belongsTo(member, { as: "mem_sq_member", foreignKey: "mem_sq"});
  member.hasMany(post_clip, { as: "post_clips", foreignKey: "mem_sq"});
  post_comment.belongsTo(member, { as: "mem_sq_member", foreignKey: "mem_sq"});
  member.hasMany(post_comment, { as: "post_comments", foreignKey: "mem_sq"});
  post_like.belongsTo(member, { as: "mem_sq_member", foreignKey: "mem_sq"});
  member.hasMany(post_like, { as: "post_likes", foreignKey: "mem_sq"});
  agreement.belongsTo(operator, { as: "operator", foreignKey: "operator_id"});
  operator.hasMany(agreement, { as: "agreements", foreignKey: "operator_id"});
  post_clip.belongsTo(post, { as: "post", foreignKey: "post_id"});
  post.hasMany(post_clip, { as: "post_clips", foreignKey: "post_id"});
  post_comment.belongsTo(post, { as: "post", foreignKey: "post_id"});
  post.hasMany(post_comment, { as: "post_comments", foreignKey: "post_id"});
  post_image.belongsTo(post, { as: "post", foreignKey: "post_id"});
  post.hasMany(post_image, { as: "post_images", foreignKey: "post_id"});
  post_like.belongsTo(post, { as: "post", foreignKey: "post_id"});
  post.hasMany(post_like, { as: "post_likes", foreignKey: "post_id"});

  return {
    agreement,
    board,
    member,
    operator,
    post,
    post_clip,
    post_comment,
    post_image,
    post_like,
    temp,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
