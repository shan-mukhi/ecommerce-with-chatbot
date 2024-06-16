import mongoose, {Schema} from "mongoose";
const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true, 
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowecase: true,
            trim: true, 
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        phone: {
            type: String,
            required: true,
        },
        
        address: {
            type: String,
            required: true,
        },
        role:{
            type:Number,
            default:0
        }
       },
    {
        timestamps: true
    }
)

export const User = mongoose.model("User", userSchema)