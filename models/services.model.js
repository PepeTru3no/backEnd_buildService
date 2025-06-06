export const Services = (sequelize, Sequelize) => {
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
        }
    },
        {
            createdAt: false,
            updatedAt: false,
        }
    );
    return services;
}