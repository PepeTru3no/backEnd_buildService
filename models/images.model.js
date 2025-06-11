export const Images = (sequelize, Sequelize) => {
    return sequelize.define("images", {
        sample_image: {
            type: Sequelize.STRING
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
