import { hashPassword, verifyPassword, } from '../Helpers/passwordHelper.js';
import { tokenGenrate } from '../Helpers/tokenHelper.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../Models/user.model.js'
import userDetail from '../Models/userDetail.model.js';
dotenv.config();


export const showUsers = async (req, res) => {
    try {
        const users = await userDetail.find().populate('user_id');
        res.status(200).json({
            success: true,
            data: users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const getMe = async (req, res) => {
    console.log(req.userInfo);
    
    res.status(200).json({
        success: true,
        user: req.user,         
        userDetail: req.userInfo,      
    })
}

    export const OrganizerApprove = async (req, res) => {
        try {
            const organizerId = req.body.id;

            const organizer = await userDetail.findById(organizerId).populate("user_id");

            const user = await User.findById(organizer.user_id);

            console.log(user.isOrganizerReq);

            if (!organizer) {
                return res.status(401).json({
                    message: "organizer not found",
                    success: false
                });
            }
            if (!user) {
                return res.status(401).json({
                    message: "user not found",
                    success: false
                });
            }

            user.isOrganizerReq = false
            user.role = 'organizer'

            await user.save();

            return res.status(200).json({
                success: true,
                message: "Reaquest Approved Successfully!"
            })
            

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Failed to Approved!"
            })
        }
    }

export const OrganizerRequest = async (req,res) => {
    try {

        const users = await User.find({isOrganizerReq: true}).select("_id");
       
        if(!users.length > 0){
            return res.status(401).json({
                message: "No organizer found",  
                success: false
            });
        }
        
        const orgReq = await userDetail.find({ user_id: {$in: users.map((u) => u._id)} }).populate("user_id");
        if (!orgReq) {
            return res.status(401).json({
                message: "Organizer Request Not Found!",
                success: false,
            })
        }
        else{
            return res.status(200).json({
                success: true,
                data: orgReq
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        })
    }   
}

export const SignUp = async (req, res) => {
    try {
        const {email, password, isOrganizerReq, name , dept ,enrollment_no, mobile, skills } = req.body;


        const existEmail = await User.findOne({ email });

        if (existEmail) {       
            return res.status(401).json({
                message: "Email Already Exist!",
                success: false,
            });
        }

        const checkEnroll = await userDetail.findOne({enrollment_no});

        if(checkEnroll){
            return res.status(401).json({
                message: "Enrollment No Already Exist!",
                success: false
            });
        }


        const hashPass = await hashPassword(password);

        

        let user = await User.create({ 
            email,
            password: hashPass,
            role: 'participant',
            isOrganizerReq,
         });

        await userDetail.create({
            user_id: user._id,
            name,
            dept,
            enrollment_no,  
            mobile,
            skills
        });

        res.status(200).json({
            message: "User Created successfully!",
            success: true,
            userId: user._id
        })

    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        });
    }
}

export const Login = async (req, res) => {

    const { email, password } =  req.body;

    try {

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "user not found"
            })
        }

        const passMatched = await verifyPassword(password, user.password);

        if (!passMatched) {
            return res.status(401).json({
                success: false,
                message: "invalid credentials",
                
            });
        }

        const token = await tokenGenrate(user._id, user.role);

        res.cookie("token", token, {
            httpOnly: true,      
            secure: false,        
            sameSite: "lax",
            maxAge: 1000 * 60 * 60 * 24
        }
        );

        res.status(200).json({
            success: true,
            message: "Login Successfully!",
            data: user,
            token: token,
        })


    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        });
    }

}   

export const Logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,   // production me true rakhna (https required)
      sameSite: "lax",
      path: "/",
    });

    res.status(200).json({
      success: true,
      message: "Logout Successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false, // ❌ yahan true na ho
      message: error.message,
    });
  }
};



export const EditUser = async (req, res) => {
  try {
    const userId = req.params.id; // get user ID from params
    const {
      name,
      email,
      password,
      dept,
      enrollment_no,
      mobile,
      skills,
      isOrganizerReq,
    } = req.body;

    // Find user and userDetail
    const user = await User.findById(userId).select("+password");
    const userDetails = await userDetail.findOne({ user_id: userId });

    if (!user || !userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update email if provided
    if (email) {
      const existEmail = await User.findOne({ email, _id: { $ne: userId } });
      if (existEmail) {
        return res.status(400).json({
          success: false,
          message: "Email already exists",
        });
      }
      user.email = email;
    }

    // Update password if provided
    if (password) {
      const { hashPassword } = await import("../Helpers/passwordHelper.js");
      user.password = await hashPassword(password);
    }

    if (typeof isOrganizerReq !== "undefined") {
      user.isOrganizerReq = isOrganizerReq;
    }

    await user.save();

    // Update userDetail fields
    if (name) userDetails.name = name;
    if (dept) userDetails.dept = dept;
    if (enrollment_no) userDetails.enrollment_no = enrollment_no;
    if (mobile) userDetails.mobile = mobile;
    if (skills) userDetails.skills = skills;

    await userDetails.save();

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: { user, userDetails },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get single user by ID
export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log(userId);


    const userDetails = await userDetail
      .findOne({ user_id: userId})
      .populate('user_id'); // populate reference

      console.log(userDetails);
      

    if (!userDetails) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, data: userDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


    export const OrganizerReject = async (req, res) => {
        try {
            const organizerId = req.body.id;

            const organizer = await userDetail.findById(organizerId).populate("user_id");

            const user = await User.findById(organizer.user_id);

            console.log(user.isOrganizerReq);

            if (!organizer) {
                return res.status(401).json({
                    message: "organizer not found",
                    success: false
                });
            }
            if (!user) {
                return res.status(401).json({
                    message: "user not found",
                    success: false
                });
            }

            user.isOrganizerReq = false

            await user.save();

            return res.status(200).json({
                success: true,
                message: "Reaquest Reject Successfully!"
            })
            

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Failed to Approved!"
            })
        }
    }