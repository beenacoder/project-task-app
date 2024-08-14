import mongoose from 'mongoose';
import colors from 'colors';

export const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.DATABASE_URL);
        console.log(colors.cyan.bold(`MongoDB connected: ${connect.connection.host}`))

    } catch (error) {
        console.log(error.message)
    }
}