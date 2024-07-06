const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    language: {
        type: String,
        required: true
    },
    messages: [{
        sender: {
            type: String,
            enum: ['user', 'ai-bot'],
            required: true
        },
        message: {
            type: String,
            required: true
        },
        timestamp: {
            type: Date,
            default: Date.now
        }
    }]
});

const Chat = mongoose.model('Chat', ChatSchema);

module.exports = Chat;