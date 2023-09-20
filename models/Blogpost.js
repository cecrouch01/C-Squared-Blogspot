const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class BlogPost extends Model {}

BlogPost.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isAlphanumeric: true,
        },
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id',
        }
    }
},
{
    sequelize,
    modelName: 'blog_post',
    tableName: 'blog_post',
    timestamps: true,
    createdAt: 'date_created',
    updatedAt: false
});

module.exports = BlogPost;