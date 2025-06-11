export const Comments = (sequelize, Sequelize) => {
    return sequelize.define("comments", {
        comment: {
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
        answer_id: {
            type: Sequelize.INTEGER,
            references: {         
              model: 'comments',
              key: 'id'
            }            
        },
        service_id: {
            type: Sequelize.INTEGER,
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