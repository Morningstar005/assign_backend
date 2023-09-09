const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")


exports.signUp = async (req, res) => {
  try {
    const { universityId, name, accountType, password } = req.body;

    if ((!universityId, !name, !accountType, !password)) {
      return res.status(403).json({
        success: false,
        message: "ALL field are Required",
      });
    }
    // Check if user already exists
    const existingUser = await User.findOne({ universityId });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists. Please login in to continue.",
      });
    }
    // password hash
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    const user = await User.create({
      name,
      universityId,
      accountType: accountType,
      password: hashedPassword,
    });

    console.log(user);
    return res.status(200).json({
      success: true,
      message: "User Registered Successfully",
    });
  } catch (error) {
    // console.log("error in signing ", error);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered. Please try again.",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { universityId, password } = req.body;

    if ((!universityId, !password)) {
      return (
        res.status(400),
        json({
          success: false,
          message: "Please fill all the details carefully",
        })
      );
    }

    // Find user with provided email
    let user = await User.findOne({ universityId });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "University ID is not register",
      });
    }

    const payload = {
      universityId: user.universityId,
      id: user._id,
      accountType: user.accountType,
    };

    //verify password & generate a JWt token
    if(await bcrypt.compare(password,user.password)){
        const token = jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn:"24h"
        })
        user.token =token; 
        user.password = undefined;
        const option = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        }

        res.cookie("token",token,option).status(200).json({
            success:"Login Successfully",
            token,
            user,
            message:"user is login in successfully"
        });
    }
    else{
        return res.status(403).json({
            success: "false",
        message: "Password Incorrect",
        })
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Login Failure Please Try Again",
    });
  }
};
