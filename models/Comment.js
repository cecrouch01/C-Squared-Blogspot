const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id',
        },
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    blog_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'blog_post',
            key: 'id',
        },
    },
},
{
    sequelize,
    modelName: 'comment',
    timestamps: true,
    createdAt: 'date_created',
    updatedAt: false
},
);

module.exports = Comment;