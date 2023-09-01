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
        type: DataTypes.STRING,
        references: {
            model: 'user',
            key: 'id',
        },
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    date_created: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
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
},
);

module.exports = Comment;