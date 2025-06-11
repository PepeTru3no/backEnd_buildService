export const SavedService = (sequelize, Sequelize) => {
    return sequelize.define("saved_services", {
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
}