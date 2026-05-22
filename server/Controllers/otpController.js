const Otp =require('../Models/otp');
const Numbers =require('../Models/Users');
const generateOtp=require('../utils/generateOtp');
const sendOtpSms=require('../services/twolioService')



// sending otp by taking phone number
const sendOtp=async (req,res)=>{
try{
    const {phone}=req.body;


    const user=await Numbers.findOne({phone});
    
       if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

const otp=generateOtp();


// otp expires after 2mins
const expiresAt=new Date(
    Date.now()+2*60*1000
);

    await Otp.create({
      phone,
      otp,
      expiresAt
    });

     user.phone = phone;

    await user.save();
    await sendOtpSms(phone, otp);
    res.status(200).json({
        message:"OTP sent Succesfully"
    })

}catch(err){
    console.log(err)
}

}




//verifying the otp
const verifyOtp = async (req, res) => {

  try {

    const { phone, otp } = req.body;

    // find otp
    const otpRecord = await Otp.findOne({
      phone,
      otp
    });

    // invalid otp
    if (!otpRecord) {

      return res.status(400).json({
        message: "Invalid OTP"
      });
    }

    // check expiry
    if (new Date() > otpRecord.expiresAt) {

      return res.status(400).json({
        message: "OTP Expired"
      });
    }

    // update user verified
    await Numbers.findOneAndUpdate(
      { phone },
      {
        isPhoneVerified: true
      }
    );

    // delete otp after success
    await Otp.deleteMany({ phone });

    res.status(200).json({
      message: "Phone Verified Successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  sendOtp,
  verifyOtp
};