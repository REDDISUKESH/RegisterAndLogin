const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../model/Registration');

// Register
router.post('/Register', async (req, res) => {
    try {
        const { UserName, Mobile, Email, Password, ConfirmPassword } = req.body;

        if (!UserName || !Mobile || !Email || !Password || !ConfirmPassword ) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (Password !== ConfirmPassword) {
            return res.status(400).json({ message: 'Password and confirm password do not match' });
        }

        const hashedPwd = await bcrypt.hash(Password, 10); // Hash the password
        const hashedConfirmPwd = await bcrypt.hash(ConfirmPassword, 10); // Hash the confirm password separately

        const newUser = { UserName, Mobile, Email, Password: hashedPwd, ConfirmPassword: hashedConfirmPwd};

        const user = await User.create(newUser);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Login
router.post("/Login", async (req, res) => {
    try {
        const user = await User.findOne({ Email: req.body.Email });

        if (!user || !(await bcrypt.compare(req.body.Password, user.Password))) {
            return res.status(400).json({ error: 'Wrong Credentials' });
        }

        const { ConfirmPassword,Password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.put('/user/:Id', async (req, res) => {
    try {
        console.log(req.body)
        if (req.body.Password && req.body.Confirmpassword) {
            const hashedPassword = await bcrypt.hash(req.body.Password, 10);
            const hashedConfirmPassword = await bcrypt.hash(req.body.Confirmpassword, 10);
            req.body.Password = hashedPassword;
            req.body.Confirmpassword = hashedConfirmPassword;
        }

        //console.log(req.body);
        const updateduser = await User.findByIdAndUpdate(
            req.params.Id,
            { $set: req.body },
            { new: true }
        );

        res.status(200).json(updateduser);
    } catch (err) {
        res.status(400).json(err);
    }
});
router.delete('/user/:Id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.Id);
        if (!deletedUser) {
            return res.status(404).json("User not found");
        }
        res.status(200).json("User has been deleted");
    } catch (err) {
        res.status(500).json(err);
    }
});
router.get('/user/:Id',async(req,res)=>{
    try {
        const user = await User.findById(req.params.Id);
        res.status(200).json(user);
    } catch (err) {
        res.status(401).json(err);
    }
})


module.exports = router;
