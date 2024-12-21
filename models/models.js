// Import mongoose
const mongoose = require('mongoose');

// User Schema
const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: {
      street: String,
      city: String,
      postalCode: String,
      country: String,
    },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    orderHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
  },
  { timestamps: true }
);

// Product Schema
const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true },
    images: [String],
    ratings: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        rating: { type: Number, required: true },
        comment: String,
      },
    ],
    relatedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand' },
  },
  { timestamps: true }
);

// Brand Schema
const BrandSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    logo: String,
    description: String,
  },
  { timestamps: true }
);

// Order Schema
const OrderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
      },
    ],
    shippingAddress: {
      street: String,
      city: String,
      postalCode: String,
      country: String,
    },
    paymentDetails: {
      cardNumber: String,
      expiryDate: String,
      nameOnCard: String,
    },
    orderStatus: { type: String, default: 'Processing' },
    totalAmount: { type: Number, required: true },
  },
  { timestamps: true }
);

// Category Schema
const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    icon: String,
  },
  { timestamps: true }
);

// Testimonial Schema
const TestimonialSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  { timestamps: true }
);

// Create Models
const User = mongoose.model('User', UserSchema);
const Product = mongoose.model('Product', ProductSchema);
const Brand = mongoose.model('Brand', BrandSchema);
const Order = mongoose.model('Order', OrderSchema);
const Category = mongoose.model('Category', CategorySchema);
const Testimonial = mongoose.model('Testimonial', TestimonialSchema);

// Export Models
module.exports = { User, Product, Brand, Order, Category, Testimonial };
