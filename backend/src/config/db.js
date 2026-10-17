import mongoose from 'mongoose'
export const connectBD = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Mongo DB connected successfully!!")
    } catch (error) {
        console.log("Connection Failed!", error.message)
    }
}