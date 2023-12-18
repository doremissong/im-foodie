var DataTypes = require("sequelize").DataTypes;
var _alim = require("./alim");
var _appl_record = require("./appl_record");
var _chat = require("./chat");
var _gathering = require("./gathering");
var _member = require("./member");
var _notice = require("./notice");
var _operator = require("./operator");
var _participant = require("./participant");
var _post = require("./post");
var _post_clip = require("./post_clip");
var _post_comment = require("./post_comment");
var _post_image = require("./post_image");
var _post_like = require("./post_like");
var _recipe = require("./recipe");
var _recipe_comment = require("./recipe_comment");
var _recipe_ingredient = require("./recipe_ingredient");
var _recipe_like = require("./recipe_like");
var _recipe_step = require("./recipe_step");
var _recipe_tag = require("./recipe_tag");
var _sessions = require("./sessions");
var _tag = require("./tag");
var _temp = require("./temp");

function initModels(sequelize) {
  var alim = _alim(sequelize, DataTypes);
  var appl_record = _appl_record(sequelize, DataTypes);
  var chat = _chat(sequelize, DataTypes);
  var gathering = _gathering(sequelize, DataTypes);
  var member = _member(sequelize, DataTypes);
  var notice = _notice(sequelize, DataTypes);
  var operator = _operator(sequelize, DataTypes);
  var participant = _participant(sequelize, DataTypes);
  var post = _post(sequelize, DataTypes);
  var post_clip = _post_clip(sequelize, DataTypes);
  var post_comment = _post_comment(sequelize, DataTypes);
  var post_image = _post_image(sequelize, DataTypes);
  var post_like = _post_like(sequelize, DataTypes);
  var recipe = _recipe(sequelize, DataTypes);
  var recipe_comment = _recipe_comment(sequelize, DataTypes);
  var recipe_ingredient = _recipe_ingredient(sequelize, DataTypes);
  var recipe_like = _recipe_like(sequelize, DataTypes);
  var recipe_step = _recipe_step(sequelize, DataTypes);
  var recipe_tag = _recipe_tag(sequelize, DataTypes);
  var sessions = _sessions(sequelize, DataTypes);
  var tag = _tag(sequelize, DataTypes);
  var temp = _temp(sequelize, DataTypes);

  gathering.belongsToMany(member, { as: 'mem_id_members', through: participant, foreignKey: "gathering_id", otherKey: "mem_id" });
  member.belongsToMany(gathering, { as: 'gathering_id_gatherings', through: participant, foreignKey: "mem_id", otherKey: "gathering_id" });
  recipe.belongsToMany(tag, { as: 'tag_id_tags', through: recipe_tag, foreignKey: "recipe_id", otherKey: "tag_id" });
  tag.belongsToMany(recipe, { as: 'recipe_id_recipes', through: recipe_tag, foreignKey: "tag_id", otherKey: "recipe_id" });
  participant.belongsTo(gathering, { as: "gathering", foreignKey: "gathering_id"});
  gathering.hasMany(participant, { as: "participants", foreignKey: "gathering_id"});
  chat.belongsTo(member, { as: "mem", foreignKey: "mem_id"});
  member.hasMany(chat, { as: "chats", foreignKey: "mem_id"});
  participant.belongsTo(member, { as: "mem", foreignKey: "mem_id"});
  member.hasMany(participant, { as: "participants", foreignKey: "mem_id"});
  recipe_like.belongsTo(member, { as: "mem", foreignKey: "mem_id"});
  member.hasMany(recipe_like, { as: "recipe_likes", foreignKey: "mem_id"});
  post_clip.belongsTo(post, { as: "post", foreignKey: "post_id"});
  post.hasMany(post_clip, { as: "post_clips", foreignKey: "post_id"});
  post_image.belongsTo(post, { as: "post", foreignKey: "post_id"});
  post.hasMany(post_image, { as: "post_images", foreignKey: "post_id"});
  post_like.belongsTo(post, { as: "post", foreignKey: "post_id"});
  post.hasMany(post_like, { as: "post_likes", foreignKey: "post_id"});
  recipe_ingredient.belongsTo(recipe, { as: "recipe", foreignKey: "recipe_id"});
  recipe.hasMany(recipe_ingredient, { as: "recipe_ingredients", foreignKey: "recipe_id"});
  recipe_like.belongsTo(recipe, { as: "recipe", foreignKey: "recipe_id"});
  recipe.hasMany(recipe_like, { as: "recipe_likes", foreignKey: "recipe_id"});
  recipe_step.belongsTo(recipe, { as: "recipe", foreignKey: "recipe_id"});
  recipe.hasMany(recipe_step, { as: "recipe_steps", foreignKey: "recipe_id"});
  recipe_tag.belongsTo(recipe, { as: "recipe", foreignKey: "recipe_id"});
  recipe.hasMany(recipe_tag, { as: "recipe_tags", foreignKey: "recipe_id"});
  recipe_tag.belongsTo(tag, { as: "tag", foreignKey: "tag_id"});
  tag.hasMany(recipe_tag, { as: "recipe_tags", foreignKey: "tag_id"});

  return {
    alim,
    appl_record,
    chat,
    gathering,
    member,
    notice,
    operator,
    participant,
    post,
    post_clip,
    post_comment,
    post_image,
    post_like,
    recipe,
    recipe_comment,
    recipe_ingredient,
    recipe_like,
    recipe_step,
    recipe_tag,
    sessions,
    tag,
    temp,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
