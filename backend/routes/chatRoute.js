const express = require('express');
const Chat = require('../models/Chat');
const User = require('../models/User');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { userId, language, messages } = req.body;

        // Validate required fields
        if (!userId || !language || !messages) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields: userId, language, messages'
            });
        }

        // Check for existing chat
        const existingChat = await Chat.findOne({ userId, language });

        if (existingChat) {
            // Update existing chat
            existingChat.messages.push(...messages);
            await existingChat.save();

            res.status(200).json({
                message: 'Chat history updated successfully',
                chats: existingChat
            });
        } else {
            // Create new chat and update user (if applicable)
            const chat = new Chat({ userId, language, messages });
            await chat.save();

            const user = await User.findById(userId);
            if (user && user.chats) { // Check if user has a 'chats' array
                user.chats.push(chat);
                await user.save();
            }

            res.status(201).json({
                message: 'Chat history saved successfully',
                chats: chat
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

router.post('/getchats', async (req, res) => {
    try {
        const { userId, language } = req.body;

        // Build query object for filtering
        const query = {};
        if (userId) {
            query.userId = userId;
        }
        if (language) {
            query.language = language;
        }

        const chats = await Chat.find(query); // Find chats based on query

        res.status(200).json({
            message: 'Chats retrieved successfully',
            chats
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});



router.delete('/deleteChatHistory', async (req, res) => {
  try {
    const { userId, language } = req.body;

    // Build query object for filtering
    const query = {};
    if (userId) {
        query.userId = userId;
    }
    if (language) {
        query.language = language;
    }

    const chats = await Chat.findOneAndDelete(query); // Find chats based on query

    res.status(200).json({
        message: 'Chats Deleted successfully',
        chats
    });
} catch (error) {
    console.error(error);
    res.status(500).json({
        success: false,
        error: 'Internal server error'
    });
}
});


module.exports = router;