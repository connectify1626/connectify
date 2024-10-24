
import UserInfo from "../models/userInfo.js";
import UserDetails from "../models/userDetails.js";
import fs from "fs";

/* Register User */
export const handleProfile = async (req, res) => {

    const { userId, description = null } = req.body;

    if(!req?.file?.filename) return res.status(400).json({ success: false, message: "Please Select Profile Image." });

    const file = 'uploads/' + req.file.filename;
    const user = await UserInfo.findOne({ _id: userId });

    if(user) {

        const userDetails = await UserDetails.findOne({ UserId: userId });
        if(userDetails) {

            fs.unlinkSync(userDetails.profilePath); //deleting previously uploaded profile image.

            await UserDetails.findByIdAndUpdate(userDetails._id, {
                profilePath: file,
                userDesc: description,
                updatedBy: userId,
            });
        }
        else {
            const newUserDetails = new UserDetails({
                UserId: userId,
                userDesc: description,
                profilePath: file,
                createdBy: userId
            });
    
            await newUserDetails.save();
        }

        return res.status(201).json({
            success: true,
            message: `Profile ${userDetails ? "Updated" : "Created"} Successfully.`
        });
    }
    else {
        return res.status(400).json({ success: false, message: "User doesn't exist." });
    }

};