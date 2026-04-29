import Order from "../models/Order.js";
import mongoose from "mongoose";

// 🔹 Create Order
export const createOrder = async (req, res) => {
  try {
    const { customerName, phone, garments } = req.body;

    if (!customerName || !phone || !Array.isArray(garments) || garments.length === 0) {
      return res.status(400).json({ message: "All fields required with valid garments" });
    }

    // validate garments
    for (let item of garments) {
      if (!item.type || !item.quantity || !item.price) {
        return res.status(400).json({ message: "Invalid garment data" });
      }
    }

    // total calculate
    const totalAmount = garments.reduce((total, item) => {
      return total + item.quantity * item.price;
    }, 0);

    const order = new Order({
      customerName,
      phone,
      garments,
      totalAmount
    });

    await order.save();

    res.status(201).json({
      message: "Order created successfully",
      order
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// 🔹 Get Orders (with filtering)
export const getOrders = async (req, res) => {
  try {
    const { status, search } = req.query;

    let filter = {};

    // normalize status
    if (status) {
      filter.status = status.toUpperCase().trim();
    }

    // search by name or phone
    if (search) {
      filter.$or = [
        { customerName: { $regex: search.trim(), $options: "i" } },
        { phone: { $regex: search.trim(), $options: "i" } }
      ];
    }

    const orders = await Order.find(filter).sort({ createdAt: -1 });

    res.json({
      count: orders.length,
      orders
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// 🔹 Update Order Status
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid order id format" });
    }

    const validStatuses = ["RECEIVED", "PROCESSING", "READY", "DELIVERED"];

    // normalize input
    const normalizedStatus = status?.toUpperCase().trim();

    if (!normalizedStatus || !validStatuses.includes(normalizedStatus)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const order = await Order.findByIdAndUpdate(
      id,
      { status: normalizedStatus },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({
      message: "Status updated successfully",
      order
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getDashboard = async (req, res) => {
  try {
    const [summary, statusBreakdown] = await Promise.all([
      Order.aggregate([
        {
          $group: {
            _id: null,
            totalOrders: { $sum: 1 },
            totalRevenue: { $sum: "$totalAmount" }
          }
        }
      ]),
      Order.aggregate([
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 }
          }
        }
      ])
    ]);

    const totals = summary[0] || { totalOrders: 0, totalRevenue: 0 };
    const ordersPerStatus = {
      RECEIVED: 0,
      PROCESSING: 0,
      READY: 0,
      DELIVERED: 0
    };

    statusBreakdown.forEach((item) => {
      ordersPerStatus[item._id] = item.count;
    });

    res.json({
      totalOrders: totals.totalOrders,
      totalRevenue: totals.totalRevenue,
      ordersPerStatus
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
