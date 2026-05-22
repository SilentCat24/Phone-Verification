const twilio=require('twilio');


const client=twilio(
 process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)


const sendOtpSms=async(phone,otp)=>{
    try{
        const message=await client.messages.create({
            body:`your OTP is ${otp}`,
            from:process.env.TWILIO_PHONE_NUMBER,
            to:phone,
        });

        console.log("SMS sent")
    }catch(err){
        console.log("Twolio err",err)
    }
}


module.exports=sendOtpSms;