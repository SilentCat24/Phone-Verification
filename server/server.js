require('dotenv').config();
const express=require('express');
const connectDb=require('./config/db');
const cors=require('cors');
const authRoutes=require('./routes/authRoutes');
const otpRoutes=require('./routes/otpRoutes');

const app=express();

const PORT =process.env.PORT || 5000;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://phone-verification-delta.vercel.app/"
    ],
    credentials: true
  })
);
app.use(express.json());

app.use('/auth/',authRoutes)
app.use('/otp/',otpRoutes)


connectDb();


app.get('/',(req,res)=>{
    res.send("Api is Running......");
})


app.listen(PORT,()=>{
    console.log(`server has started at port,${PORT}`);
})