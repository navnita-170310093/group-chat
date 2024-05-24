const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

//@description     Edit user
//@route           POST /api/admin/edit
//@access          admin
const editUser = asyncHandler(async (req, res) => {
    const { email, address, about} = await req.body;
  
    if (!email ) {
      res.status(400);
      throw new Error("Invalid request, email not provided");
    }
  
    const userExists = await User.findOne({ email });
  
    if (!userExists) {
      res.status(400);
      throw new Error("User not exists");
    }
  
    try {
 
        await User.findOneAndUpdate({email}, { address, about});
    
        res.json({message:"Updated"});
      } catch (error) {
        res.status(400);
        throw new Error(error.message);
      }
  });

  module.exports = { editUser};