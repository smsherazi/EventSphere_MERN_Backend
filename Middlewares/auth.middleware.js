import { tokenDecoder } from '../Helpers/tokenHelper.js';
import User from '../Models/user.model.js';
import dotenv from 'dotenv';
import userDetailModel from '../Models/userDetail.model.js';
dotenv.config();

export const authVerify = async (req, res, next) => {
    const secretKey = process.env.SECRET_KEY;
    console.log("Cookies: ", req.cookies);

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "token not found"
        })
    }

    try {
        const decode = await tokenDecoder(token, secretKey);

        const user = await User.findById(decode.id);
        const userDetailData = await userDetailModel.findOne({ user_id: user._id });
        console.log(userDetailData);
        
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found",
            });
        }

        req.user = user;
        req.userInfo = userDetailData;
        next();

    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message
        })
    }
}
