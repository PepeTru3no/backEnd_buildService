import sequelize from "../db/connect.js";

export const Services = (Sequelize) => {
    const services = sequelize.define("services", {
        name: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {         
              model: 'users',
              key: 'id'
            }            
        },
        stars: {
            type: Sequelize.DECIMAL
        },
        category: {
            type: Sequelize.STRING
        },
    },
        {
            createdAt: false,
            updatedAt: false,
        }
    );
    return services;
}