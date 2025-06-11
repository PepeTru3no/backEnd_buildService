export const SavedService = (sequelize, DataType) => {
    return sequelize.define("saved_services", {
        user_id: {
            type: DataType.INTEGER,
            allowNull: false,
            references: {        
              model: 'users',
              key: 'id'
            }            
        },
        service_id: {
            type: DataType.INTEGER,
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