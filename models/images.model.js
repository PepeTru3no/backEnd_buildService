export const Images = (sequelize, DataType) => {
    return sequelize.define("images", {
        sample_image: {
            type: DataType.STRING
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
