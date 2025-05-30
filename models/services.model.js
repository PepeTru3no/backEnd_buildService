export const Services = (sequelize, Sequelize) => {
     const services =sequelize.define("services", {
        name:{
            type: Sequelize.STRING
        },
        description:{
            type: Sequelize.STRING
        },
        user_id:{
            type: Sequelize.INTEGER
        },
        stars:{
            type: Sequelize.DECIMAL
        }
    });
    return services;
}