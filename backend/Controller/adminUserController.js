const userModel  = require("../model/userSchema");

//get all users
const getAllUsers = async (req, res) =>{
    try{

        const user = await userModel.find();
        res.json({
            status: "success",
            message: "All users fetched successfully",
            data: user,
        })


    }
    catch(err){
        res.json({
            status: "error",
            message: "Error fetching users",
            error: err.message,
        })
    }
}

//get user by id
const getUserById = async (req, res) =>{
    try{

        const deletedUser = await userModel.findById(req.params.id);
        if(!deletedUser){
            return res.json({
                status: "error",
                message: "User not found",
            })
        }   

        res.json({
            status: "success",
            message: "User fetched successfully",
            data: deletedUser,
        })

    }
    catch(err){
        res.json({
            status: "error",
            message: "Error fetching user",
            error: err.message,
        })
    }
}

//delete user
const deleteUser = async (req, res) =>{
    try{

        const deletedUser = await userModel.findByIdAndDelete(req.params.id);

        if(!deletedUser){
            return res.json({
                status: "error",
                message: "User not found",
            })
        }

        res.json({
            status: "success",
            message: "User deleted successfully",
            data: deletedUser,
        })

    }
    catch(err){
        res.json({
            status: "error",
            message: "Error deleting user",
            error: err.message,
        })
    }
}


module.exports = {
    getAllUsers,
    deleteUser,
    getUserById,
}
