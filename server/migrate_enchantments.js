import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const migrate = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const users = await User.find({});
        console.log(`Found ${users.length} users`);

        for (const user of users) {
            if (!user.enchantedBy) {
                user.enchantedBy = [];
                await user.save();
                console.log(`Initialized enchantedBy for ${user.username}`);
            }
        }

        console.log('Migration complete');
        process.exit(0);
    } catch (error) {
        console.error('Migration error:', error);
        process.exit(1);
    }
};

migrate();
