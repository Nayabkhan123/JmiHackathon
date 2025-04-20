const userModel = require("../models/userModel");

const editProfile = async (req, res) => {
  try {
    const userId = req.userid
    const {
      name,
      profession,
      department,
      batch,
      location,
      profilePic,
    } = req.body;

    // Update fields
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      {
        name,
        profession,
        department,
        batch,
        location,
        profilePic
      },
      { new: true } 
    );

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    console.error("Edit profile error:", err);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};

module.exports = editProfile;
