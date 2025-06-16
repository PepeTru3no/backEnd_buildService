export const Images = (sequelize, DataType) => {
    return sequelize.define("images", {
        sample_image: {
            type: DataType.STRING
        },
        service_id: {
            type: DataType.INTEGER,
            allowNull: true,
            references: {         
              model: 'services',
              key: 'id'
            }            
        },
        user_id: {
            type: DataType.INTEGER,
            allowNull: true,
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
}
