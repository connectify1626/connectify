
import UserInfo from "../models/userInfo.js";

/* Register User */
export const handleProfile = async (req, res) => {

    const { userId } = req.body;
    const file = 'uploads/' + req.file.filename;

    const user = await UserInfo.findOne({ _id: userId });

    if(user) {
        await UserInfo.findByIdAndUpdate(user._id, {
            profilePath: file,
            updatedBy: user._id,
        })
    
        res.status(201).json({
            success: true,
            message: "Profile Created Successfully."
        });
    }
    else {
        return res.status(400).json({ success: false, message: "User doesn't exist." });
    }

};