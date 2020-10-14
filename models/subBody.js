module.exports = function(sequelize, DataTypes) {
    const sub_body = sequelize.define("sub_body", {
        sub_body_id: DataTypes.INTEGER,
        sub_body_name: DataTypes.STRING
    }, {
        freezeTableName: true
    })
    return sub_body
}

