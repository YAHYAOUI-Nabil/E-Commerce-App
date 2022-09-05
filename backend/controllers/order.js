const Order = require('../models/Order')

exports.createOrder = async(req, res) => {
    const newOrder = new Order(req.body);

    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
      } catch (err) {
        res.status(500).json({message : 'Something went wrong?'});
      }
}

exports.getUserOrders = async(req, res) => {
    const {userId} = req.param
    
    try {
        const orders = await Order.find(userId)
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({message : 'Something went wrong?'});
    }
}

exports.getAllOrders = async(req, res) => {
    try {
        const orders = await Order.find()
        res.status(200).json(orders)
    } catch (err) {
        res.status(500).json({message : 'Something went wrong?'})
    }
}

exports.updateOrder = async(req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedOrder);
    } catch (err) {
        res.status(500).json({message : 'Something went wrong?'});
    }
}

exports.deleteOrder = async(req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Order has been deleted...");
    } catch (err) {
        res.status(500).json({message : 'Something went wrong?'});
    }
}

exports.getIncome = async(req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

    try {
        const income = await Order.aggregate([
        { $match: { createdAt: { $gte: previousMonth } } },
        {
            $project: {
            month: { $month: "$createdAt" },
            sales: "$amount",
            },
        },
        {
            $group: {
            _id: "$month",
            total: { $sum: "$sales" },
            },
        },
        ]);
        res.status(200).json(income);
    } catch (err) {
        res.status(500).json({message : 'Something went wrong?'});
    }
}