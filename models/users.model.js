export const Users = (sequelize, DataType) => {
    return sequelize.define("users", {
        name: {
            type: DataType.STRING
        },
        last_name: {
            type: DataType.STRING
        },
        email: {
            type: DataType.STRING
        },
        age: {
            type: DataType.INTEGER
        },
        registration_date: {
            type: DataType.DATE
        },
        state: {
            type: DataType.STRING
        },
        username: {
            type: DataType.STRING
        },
        password: {
            type: DataType.STRING
        },
        phone: {
            type: DataType.STRING
        },
        stars: {
            type: DataType.DECIMAL
        },
        verification_token: {
            type: DataType.STRING
        }
    },
        {
            createdAt: false,
            updatedAt: false,
        }
    );
}