module.exports = (sequelize, Sequelize) => {
    const Assessment = sequelize.define("assessment", {
        uuid: {
            type: Sequelize.STRING,
            allowNull: false
        },
        status: {
            type: Sequelize.STRING,
            allowNull: false
        },
        score: {
            type: Sequelize.STRING,
            allowNull: true
        }
    });
    return Assessment
}