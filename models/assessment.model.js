module.exports = (sequelize, Sequelize) => {
    const Assessment = sequelize.define("assessment", {
        uuid: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return Assessment
}