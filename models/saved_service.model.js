export const SavedService = (sequelize, Sequelize) => {
    const saved_service = sequelize.define("saved_services", {
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
    return saved_service;
}