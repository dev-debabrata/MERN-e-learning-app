const express = require("express");
const User = require("../models/User");
const router = express.Router();

// insert
router.post("/", async (req, res) => {
    const { name, email, phone } = req.body;
    try {
        const user = new User({ name, email, phone });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(201).json({ error: error.message })
    }
});

// read users
router.get("/", async (req, res) => {
    const users = await User.find();
    res.json(users);
});

// update
router.put("/", async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
});

// delete
router.delete("/", async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id);
        res.json({ message: "user deleted" });
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
});

module.exports = router;