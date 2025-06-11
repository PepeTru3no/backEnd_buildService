export const Services = (sequelize, DataType) => {
    return sequelize.define("services", {
        name: {
            type: DataType.STRING
        },
        description: {
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
        stars: {
            type: DataType.DECIMAL
        },
        category: {
            type: DataType.STRING
        },
    },
        {
            createdAt: false,
            updatedAt: false,
        }
    );
}