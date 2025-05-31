export const SavedServices = (sequelize, Sequelize) => {
    const savedServices = sequelize.define("saved_service", {
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {        
              model: 'users',
              key: 'id'
            }            
        },
        service_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {         
              model: 'services',
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