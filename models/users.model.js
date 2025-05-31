export const Users = (sequelize, Sequelize) => {
    const users = sequelize.define("users", {
        name: {
            type: Sequelize.STRING
        },
        last_name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        age: {
            type: Sequelize.INTEGER
        },
        registration_date: {
            type: Sequelize.DATE
        },
        state: {
            type: Sequelize.STRING
        },
        username: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.STRING
        },
        stars: {
            type: Sequelize.DECIMAL
        }
    },
        {
            createdAt: false,
            updatedAt: false,
        }
    );
    return users;
}