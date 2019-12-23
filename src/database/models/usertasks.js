'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserTasks = sequelize.define('UserTasks', {
    description: DataTypes.STRING,
    state: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {});
  UserTasks.associate = function(models) {
      UserTasks.belongsTo(models.User, {
        as: "user",
        foreignKey: "user_id",
        onDelete: "CASCADE"
      });
  };
  return UserTasks;
};