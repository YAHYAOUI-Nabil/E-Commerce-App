const Cart = require('../models/Cart')

exports.createCart = async(req, res) => {
    const newCart = new Cart(req.body);

    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
      } catch (err) {
        res.status(500).json({message : 'Something went wrong?'});
      }
}

exports.getUserCart = async(req, res) => {
    const {userId} = req.param
    
    try {
        const cart = await Cart.find(userId)
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({message : 'Something went wrong?'});
    }
}

exports.getAllCarts = async(req, res) => {
    try {
        const carts = await Cart.find()
        res.status(200).json(carts)
    } catch (err) {
        res.status(500).json({message : 'Something went wrong?'})
    }
}

exports.updateCart = async(req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedCart);
    } catch (err) {
        res.status(500).json({message : 'Something went wrong?'});
    }
}

exports.deleteCart = async(req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart has been deleted...");
    } catch (err) {
        res.status(500).json({message : 'Something went wrong?'});
    }
}