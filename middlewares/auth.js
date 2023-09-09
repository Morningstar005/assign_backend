const JWT = require("jsonwebtoken");
require("dotenv").config();

//auth
exports.auth = (req, res, next) => {
  try {
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization").replace("Bearer ", "");

      if(!token){
        return res.status(401).json({
            success: false,
            message: "token is missing",
          });
      }
      try{
        const decode = JWT.verify(token,process.env.JWT_SECRET)
        req.user=decode
      }catch (error) {
        return res.status(401).json({
          success: false,
          message: "token is invalid",
        });
      }

      next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "something went wrong, while verify thee token",
    });
  }
};

exports.isStudent = (req,res,next)=>{

    try{
        if(req.user.accountType !=="Student"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for Student only"
            });
        }

        next()
    }catch (err) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified, please try again",
    });
  }
}
//Dean
exports.isDean=(req,res,next)=>{
    try{
        if(req.user.accountType !=="Dean"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for Dean only"
            });
        }

        next()
    }catch (err) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified, please try again",
    });
  }
}