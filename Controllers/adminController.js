const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const Admin=require("../Models/adminModel.js")
const User=require("../Models/userModel.js")
const Review=require("../Models/reviewModel.js")
const Favorite  = require("../Models/favoriteModel.js");

const newAdmin = async (req,res) => {
    try {
        const firstName = req.body.firstName
        const lastName = req.body.lastName
        const email = req.body.email
        const password = req.body.password
        const authorization_keyValue = req.body.authorization_keyValue

        if (firstName === undefined || lastName === undefined || email === undefined || password === undefined || authorization_keyValue === undefined) {
            return res.status(400).json({message: "Authentification failed: Missing the required fields."});
        }

        const existingAdmin = await User.findOne({ email: email });
        if (existingAdmin) {
          return res.status(422).json({ message: "Email already exists" });
        }
        console.log("working");
        const hashedPassword = bcrypt.hashSync(password, saltRounds);

        if (authorization_keyValue !== process.env.ADMIN_AUTH_KEY) {
            return res.status(401).json({ message: "Invalid authorization key" });
          }

        const admin = new Admin({
           firstName:firstName,
           lastName:lastName,
            email: email,
            password: hashedPassword,
            authorization_keyValue: process.env.ADMIN_AUTH_KEY
        })

        await admin.save();
        
        const token = jwt.sign({ data:admin._id }, process.env.SECRET_KEY, { expiresIn: '24h' })
    
         const adminResponse = {...admin._doc}
        delete adminResponse.authorization_key;

        res.status(201).json({token,...adminResponse, message: "Successfuly created an Account"})

    } catch (error) {
        console.error("Signup error: ", error);
        res.status(500).json({error: "Internal server error"});
        
    }

}


const adminSignin = async (req,res) => {
    try {
        
        const email = req.body.email;
        const password = req.body.password;
        const authorization_keyValue = req.body.authorization_keyValue;

        if ( email === undefined || password === undefined || authorization_keyValue === undefined) {
            return res.status(400).json({error: "Authentification failed: Missing username, email, password and authorization key."});
        }

        const admin = await Admin.findOne({email: email} ).select("username email password authorization_key").exec()

        if(!admin) {
            return res.status(401).json({error: "Unauthorized access: user not found."});
        }

        const passwordMatch = bcrypt.compareSync(password, admin.password);

        if(passwordMatch && authorization_keyValue === process.env.ADMIN_AUTH_KEY ) {
            const token = jwt.sign({ data: admin._id }, process.env.SECRET_KEY, { expiresIn: '24h' })
           
            const adminResponse = {...admin._doc}
            delete adminResponse.authorization_keyValue
            return res.status(200).json({token, ...adminResponse, message: "Signin successful"})
        }else {
            return res.status(401).json({error: "Unauthorized access: Incorrect Password"});
        }

    } catch (err) {
        console.error("Signin error:", err);
        res.status(500).json({error: "Internal server error"});
    }
}

const getAllTheUsers = async (req,res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        console.log('error: ',error);
        res.status(500).json({error: "Internal server error"});
    }
}


const getAllTheReviewsOfUserById = async (req,res) => {
    try {
        const {userId} = req.params;
        console.log(userId)
        const reviews = await Review.find({user:userId})
        res.status(200).json(reviews)
    } catch (error) {
        console.log("error :", error)
        res.status(500).json({error: "failed"});
    }
}

const getAllTheFavoritesOfUser = async (req, res) => {
    try {
        const {userId} = req.params;
        const favorites = await Favorite.find({user: userId})
        res.status(200).json(favorites)
    } catch (error) {
        console.log("error :", error)
        res.status(500).json({error: "failed"});
    }
}

module.exports={newAdmin,adminSignin,getAllTheUsers,getAllTheReviewsOfUserById,getAllTheFavoritesOfUser};


 


