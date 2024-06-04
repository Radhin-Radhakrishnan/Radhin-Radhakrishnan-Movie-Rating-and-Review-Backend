const User= require("../Models/userModel.js")
const bcrypt=require("bcrypt")
const generateToken=require("../utils/generateToken.js")

const signUp = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ error: "User already exists" });
    }

    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password:hashPassword
    });
    const newUserCreated = await newUser.save();
    if (!newUserCreated) {
      return res.status(500).json({ error: "Failed to create user" });
    }

    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    console.error("Error occurred during sign up:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const signIn = async (req, res) => {
  try {
    const {email,password } = req.body;

    const user = await User.findOne({ email:email}).select("email password").exec();
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
   console.log("user",user.password)
    const matchPassword = await bcrypt.compare(password,user.password);
    if (!matchPassword) {
      return res.status(401).json({ error: "Incorrect password" });
    }

 
    const token = generateToken(user._id);
    res.cookie("token", token,{ httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.send("Logged in!");
  } catch (error) {
    console.error("Error occurred during sign in:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const updatePassword = async (req, res) => {
  try {
    const { decoded } = req;
    const { data: userId } = decoded;
    const { email, newPassword: password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: "Authentication failed: Missing email or password." });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "User not found." });
    }
    const hash = bcrypt.hashSync(password, saltRounds);

    const updatedUser = await User.findByIdAndUpdate(userId, { password: hash }, { new: true });

    if (!updatedUser) {
      return res.status(400).json({ error: "User not found." });
    }
    return res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    console.error("Update password error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

const getUserById = async (req, res) => {
  try {
    const { decoded } = req;
    const { data: userId } = decoded;

    if (!userId) {
      return res.status(400).json({ error: "User does not exist!" });
    }

    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Data fetching error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { signIn, signUp,updatePassword,getUserById};
