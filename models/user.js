// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
const bcrypt = require('bcryptjs');

// Creating our User model
module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define('User', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
  },
    // The email cannot be null, and must be a proper email before creation
    anonymousName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 10],
          msg: 'The name must contain between 3 and 10 characters.' // Error message I want to display
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail:{
          arg:true,
          msg: 'Please provide a valid Email.'
        }
        
      },
    },
    // The password cannot be null
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          
        
        // msg: 'A minimum 8 characters password contains a combination of uppercase and lowercase letter and number.'

      },
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 18,
      },
    },
    policy: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        isCheckBox(value) {
          if (value !== true) {
            throw new Error(
              'By clicking the check box I Agree to the Privacy Policy'
            );
          }
        },
      },
    },

    secretToken: {
      type: DataTypes.STRING,
    },

    active: {
      type: DataTypes.BOOLEAN,
      validate: {
        isBoolean:{
          arg: true,
          msg: "Incorrect access token"
        }
      },
    },
    
  });
  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  User.addHook('beforeCreate', user => {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10),
      null
    );
  });

  User.associate = models => {
    User.hasMany(models.WriteStory);
  }

 


  return User;
};

//Generate Secret Token
