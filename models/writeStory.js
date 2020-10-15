// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines

const User = require("./user.js");

// Creating our User model
module.exports = function(sequelize, DataTypes) {
  const WriteStory = sequelize.define('WriteStory', {
    story: {
      type: DataTypes.TEXT,
    },
  });

  WriteStory.associate = models => {
    WriteStory.belongsTo(models.User);
  }


  return WriteStory;
};

//Generate Secret Token
