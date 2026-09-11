import mongoose from 'mongoose'
import dns from 'dns'

// fixes dns issue connecting to mongodb atlas
dns.setServers(['8.8.8.8', '1.1.1.1'])

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log('Connected to DB')
    }
    catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

export default connectDB