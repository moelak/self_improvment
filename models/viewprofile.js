const user = require("./user");
module.exports= function(sequelize,DataTypes){
    const viewProfile = sequelize.define('viewProfile', {
        profile: {
            type: DataTypes.TEXT
        }
    });

    viewProfile.associate= models => {
        viewProfile.belongsTo(models.user,{foreignKey: 'id'})
    }
}