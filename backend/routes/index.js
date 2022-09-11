const router = require("express").Router();
//const passport = require('passport')
const {
  sendOTPController,
  registerController,
  getAllGroupController,
  deleteGroupController,
  setGroupController,
  sendMailController,
  verifyOTPController,
  loginController,
  refreshTokenController,
  getGroupController,
  getGroupByIdController,
  getAllUserController,
  getIPController,
} = require("../controllers");

//require('../passport/google')

/*router.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'], session: false }));

router.get('/auth/google/callback',
  passport.authenticate('google'),
  function (req, res) {
    tokenGenerate(req.user).then(({ accessToken, refreshToken }) => {
      res.send({                                                        //Might have to send this through query params
          accessToken,
          refreshToken,
          found: true,
      })
    });
  }
);
*/
router.post("/sendOTP", sendOTPController); //This route is used for send otp

router.get("/verifyOTP", verifyOTPController); //This route is used for verifying otp

router.post("/register", registerController); //Save users in database logging them with phone number

router.post("/sendmail", sendMailController); //Activation of email through mail

router.post("/login", loginController); //Logging in user through phone number

router.get("/refreshTokenGenerate", refreshTokenController);

router.post("/setgroup", setGroupController);

router.get("/getgroup", getGroupController);

router.get("/getgroupbyId", getGroupByIdController);

router.delete("/deletegroup", deleteGroupController);

router.get("/getallgroup", getAllGroupController);

router.get("/getalluser", getAllUserController);

router.get("/getIP", getIPController);

module.exports = router;
