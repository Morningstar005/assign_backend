const express = require("express");
const router = express.Router();

const {
  createSession,
  getOpenSession,
  bookSession,
  getBookedSession,
} = require("../controllers/session");

const {auth,isDean,isStudent
}=require("../middlewares/auth")

router.post("/create",auth,isDean,createSession)
router.get("/open-sessions",auth,getOpenSession)
router.post("/book",auth,isStudent,bookSession)
router.get("/booked-session",auth,isDean,getBookedSession)


module.exports=router