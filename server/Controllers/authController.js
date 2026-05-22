const Numbers = require("../Models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// Registering the user
const register = async (req, res) => {
  try {
    const { name, email, password,phone } = req.body;

    // check existing user
  const existingUser = await Numbers.findOne({
  $or: [
    { email },
    { phone }
  ]
});

if (existingUser) {

  return res.status(400).json({
    message:
      "Email or Phone already exists"
  });
}
let formattedPhone = phone;

if (!phone.startsWith("+91")) {

  formattedPhone = `+91${phone}`;
}
    // hashing password
    const hashedPassword = await bcrypt.hash(password, 10);
    // creating user
    const user = await Numbers.create({
      name,
      email,
      password: hashedPassword,
      phone:formattedPhone
    });

    res.status(201).json({
      message: "User registered successfully",
      user
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // checking user
    const user = await Numbers.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    // comparing password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    // creating token
  const token = jwt.sign(
  {
    id: user._id,
    email: user.email,
    phone: user.phone
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "1d"
  }
);

    res.status(200).json({
      message: "Login successful",
      token
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  register,
  login
};