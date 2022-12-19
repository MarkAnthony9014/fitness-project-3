const { Schema, model } = require('mongoose');
const { postSchema } = require('./Post');

const categorySchema = new Schema(
    {
        categoryName: {
            type: String,
            required: true,
        },
        posts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Post'
            }
        ]
    }
)



module.exports = Category;