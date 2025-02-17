const router = require("express").Router();
const { User, validate } = require("../models/User");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
    try
    {
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message });

        let user = await User.findOne({ email: req.body.email });
        if (user)
            return res
                .status(409)
                .send({ message: "User exists with this Email!" });


        const salt = await bcrypt.genSalt(Number("10"));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        user = await new User({ ...req.body, password: hashPassword }).save();

        await User.updateOne({ _id: user._id }, { $set: { signupDate: new Date() } });
        await User.updateOne({_id:user._id},{$set:{verified:true}});
        res.status(201).json({ message: "User has been successfully Signed Up" });

    }
    catch (error)
    {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error: Email Log" });
    }
});


router.put("/", async (req, res) => {
    try {
        const userId = req.body.userId;
        console.log(userId);
        let user = await User.findById(userId);
        console.log(user.email);

        if (!user)
        {
            console.log("Invalid user ID: " + userId);
            return res.status(400).send({ message: "Invalid user ID" });
        }

        // Update user fields
        if(req.body.firstName) {user.firstName = req.body.firstName;}
        if(req.body.middleName) {user.middleName = req.body.middleName;}
        if(req.body.lastName) {user.lastName = req.body.lastName;}

        // Save the updated user
        await user.save();

        console.log("User StudentProfile updated successfully");
        res.status(200).send({ message: "User StudentProfile updated successfully" });
    }
    catch (error)
    {
        console.error(`Error updating user profile: ${error.message}`);
        console.log("Error updating");
        res.status(500).send({ message: "Internal Server Error: Update User Profile" });
    }
});


//get specific user
router.get("/:id", async (req, res) => {
    try
    {
        const userId = req.params.id;
        const user = await User.findById(userId);

        if (!user)
        {
            console.log("Invalid userID");
            return res.status(404).send({ message: "User not found" });
        }
        console.log(`User data added to profile`);
        res.status(200).send({ user });
    }
    catch (error)
    {
        console.error(`Error by retrieving user data: ${error.message}`);
        res.status(500).send({ message: "Internal Server Error by Retrieve User Data" });
    }
});




// get all users
router.get("/", async (req, res) => {
    try {
        const users = await User.find();

        if (!users) {
            console.log("No users found");
            return res.status(404).send({ message: "No users found" });
        }

        console.log("Users data retrieved");
        res.status(200).send({ users });
    } catch (error) {
        console.error(`Error retrieving users data: ${error.message}`);
        res.status(500).send({ message: "Internal Server Error: Retrieve Users Data" });
    }
});


module.exports = router;