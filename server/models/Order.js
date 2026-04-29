import mongoose from "mongoose";

const generateOrderId = () => {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(1000 + Math.random() * 9000);
  return `ORD-${timestamp}-${random}`;
};

const garmentSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    unique: true
  },
  customerName: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  garments: [garmentSchema],

  totalAmount: {
    type: Number,
    default: 0
  },


  status: {
    type: String,
    enum: ["RECEIVED", "PROCESSING", "READY", "DELIVERED"],
    default: "RECEIVED"
  }
}, { timestamps: true });

orderSchema.pre("validate", function preValidate() {
  if (!this.orderId) {
    this.orderId = generateOrderId();
  }
});

export default mongoose.model("Order", orderSchema);
