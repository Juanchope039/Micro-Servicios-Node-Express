const {DataTypes, Model } =  require("sequelize");

class HeroeSchema extends Model {
    /** Aquí defines relaciones con otros modelos */
    /**
     static associate(models) {
     // Un usuario puede tener múltiples tokens
     User.hasMany(models.Token, {
     as:         'tokens',
     foreignKey: 'userId',
     onDelete:   'CASCADE',
     })
     }**/
}
function defineHeroe(sequelize) {

    HeroeSchema.init(
        {
            'id': {
                type: DataTypes.INTEGER,
                allowNull: true,
                primaryKey: true,
                autoIncrement: true,
            },
            'nombre': {
                type: DataTypes.STRING,
                allowNull: false
                // allowNull defaults to true
            },
            'bio': {
                type: DataTypes.TEXT,
                allowNull: false
                // allowNull defaults to true
            },
            'img': {
                type: DataTypes.STRING,
                allowNull: false
                // allowNull defaults to true
            },
            'aparicion': {
                type: DataTypes.DATE
                // allowNull defaults to true
            },
            'casa': {
                type: DataTypes.STRING
                // allowNull defaults to true
            },
        },
        {
            sequelize,
            modelName: 'heroe',
            tableName: 'heroes',
            timestamps: true,
            underscored: true,

            //Maintain table name don't plurilize
            freezeTableName: true,

            // I don't want createdAt
            createdAt: false,

            // I don't want updatedAt
            updatedAt: false
        }
    )
    return HeroeSchema;
}

module.exports = { HeroeSchema, defineHeroe };