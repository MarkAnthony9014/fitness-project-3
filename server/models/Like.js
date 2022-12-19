const { Schema } = require("mongoose");

const likeSchema = new Schema(
  {
    // reactionBody: {
    //   type: String,
    //   required: true,
    //   maxlength: 280
    // },
    userId: [{
      type: String,
      required: true,
    }],
    username: {
        type: String, 
        required: true
    },
    // createdAt: {
    //   type: Date,
    //   default: Date.now,
    //   get: timestamp => dateFormat(timestamp)
    // }
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

module.exports = likeSchema;
