const User = require("../models/User");
const Session = require("../models/Session");

exports.createSession = async (req, res) => {
  try {
    const userId = req.user.id;
    const { day, date, status } = req.body;

    if ((!day, !date)) {
      return res.status(400).json({
        success: false,
        message: "All Fields are Mandatory",
      });
    }

    if (!status || status === undefined) {
      status = "Open";
    }

    const instructorDetails = await User.findById(userId, {
      accountType: "Dean",
    });

    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Dean Details Not Found",
      });
    }

    const createNewSession = await Session.create({
      day,
      date,
      status,
    });

    res.status(200).json({
      success: true,
      data: createNewSession,
      message: "Session Created Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getOpenSession = async (req, res) => {
  try {
    const openSession = await Session.find({status:"Open"});

    console.log("Session",openSession)

    return res.json({
      openSession,
      message: "Successfully fetch",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.bookSession = async (req, res) => {
  try {
    const {studentId,sessionId} = req.body;

    if ((!studentId, !sessionId)) {
      return res.json({
        success: false,
        message: "studentid or sessionid is missing",
      });


    }

    try{
      const enrolledsession = await Session.findByIdAndUpdate(
        {_id:sessionId},
        {$push:{studentId:studentId}},
        {new:true}
      )

      if(!enrolledsession){
        return res
        .status(500)
        .json({ success: false, message: "Course not Found" });
    }

    res.status(200).json({
      success:true,
      message:enrolledsession
    })

    }catch(error){
      console.log("error")

    }

   return res.json({ message: "Session booked successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.getBookedSession = async (req,res)=>{
    try{
        const bookedSessions = await Session.find({status:"Pending"}).populate({
            path:"studentId",
            select:"universityId name"
        })

        return res.json({
          success:true,
          bookedSessions:bookedSessions,
          message:"Fetch Successfully"
        })
    }catch(error){
        console.error(error);
    res.status(500).json({ message: "Internal server error" });
    }
}