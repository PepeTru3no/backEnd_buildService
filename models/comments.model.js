export const Comments = (sequelize, DataType) => {
    return sequelize.define("comments", {
        comment: {
            type: DataType.STRING
        },
        user_id: {
            type: DataType.INTEGER,
            allowNull: false,
            references: {        
              model: 'users',
              key: 'id'
            }            
        },
        answer_id: {
            type: DataType.INTEGER,
            references: {         
              model: 'comments',
              key: 'id'
            }            
        },
        service_id: {
            type: DataType.INTEGER,
            references: {         
              model: 'services',
              key: 'id'
            }            
        },
    },
        {
            createdAt: false,
            updatedAt: false,
        }
    );
}