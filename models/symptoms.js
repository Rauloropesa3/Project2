
module.exports = function(sequelize, DataTypes) {
    const symptoms = sequelize.define("symptoms", {
        // id: {type: DataTypes.INTEGER,primaryKey: true},
        symptom_id: DataTypes.INTEGER,
        symptom_name: DataTypes.STRING,
        gender: DataTypes.STRING,
        sub_body_id: DataTypes.INTEGER
    
    })
    return symptoms
}