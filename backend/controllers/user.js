const User = require('../models/User')
const bcrypt = require('bcryptjs')

exports.getUser = async(req, res) => {
    const {id} = req.params
    try {
        const user = await User.findById(id)
        const {password, ...others} = user._doc

         res.status(200).json(others)
    } catch (error) {
        return res.status(500).json({message : 'Something went wrong?'})
    }
}

exports.getAllUsers = async(req, res) => {
    const query = req.query.new;
    try {
        const users = query
        ? await User.find().sort({ _id: -1 }).limit(5)
        : await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({message : 'Something went wrong?'});
    }
}

exports.update = async(req, res) => {
    const {id} = req.params
    
    try {
        if(req.body.password !== req.body.confirmPassword){
            return res.status(400).json({message : `Passwords don't match.`})
        }
        
        salt = await bcrypt.genSalt(12)
        req.body.password = await bcrypt.hash(req.body.password, salt)
    
        const updatedUser = await User.findByIdAndUpdate(id, {$set: req.body}, { new: true })
        const {password, ...others} = updatedUser._doc
    
        res.status(200).json(others)
    } catch (error) {
        return res.status(500).json({message : 'Something went wrong?'})
    }

}

exports.delete = async(req, res) => {
    const { id } = req.params

    try {
        await User.findByIdAndRemove(id)

         res.json({ message: "User deleted successfully." })
    } catch (error) {
        return res.status(500).json({message : 'Something went wrong?'})
    }
}

exports.getStats = async(req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
        const data = await User.aggregate([
        { $match: { createdAt: { $gte: lastYear } } },
        {
            $project: {
            month: { $month: "$createdAt" },
            },
        },
        {
            $group: {
            _id: "$month",
            total: { $sum: 1 },
            },
        },
        ]);
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json('nabil');
    }
}