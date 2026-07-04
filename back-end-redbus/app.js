const express = require("express");
const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, ".env"),
  quiet: true,
});
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

mongoose.pluralize(null);
app.use(express.json());
app.use(cors());
const busRoutes = require("./routes/bus");
const bookingRoutes = require("./routes/booking");
const customerRoutes = require("./routes/customer");
const routeRoutes = require("./routes/route");

app.post("/v1/api/stripe-payments", async (req, res) => {
  const { product, token } = req.body;
  console.log("PRODUCT", product);
  console.log("PRICE", product.price);
  const idempontencyKey = uuidv4();
  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges.create(
        {
          amount: product.price * 100,
          currency: "inr",
          customer: customer.id,
          receipt_email: token.email,
          description: `Purchase of ${product.name}`,
        },
        { idempontencyKey }
      );
    })
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
});

app.use(busRoutes);
app.use(bookingRoutes);
app.use(customerRoutes);
app.use(routeRoutes);
const bookingHireRoutes = require("./routes/bookinghire");
app.use(bookingHireRoutes);

const busServiceRoutes = require("./routes/busservice");
app.use(busServiceRoutes);

const connect = () => {
  const db = mongoose.connection; // Get the mongoose connection object

  // Listen to events on the mongoose connection
  db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
  });

  db.once('open', () => {
    console.log('MongoDB connection established.');
  });

  return mongoose.connect(process.env.DATABASE, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
};


const port = process.env.PORT || 3020;
let host = process.env.HOST;

if (host && host.startsWith("http")) {
  host = new URL(host).hostname;
}

const start = async () => {
  if (!process.env.DATABASE) {
    throw new Error("DATABASE is missing in .env");
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is missing in .env");
  }

  try {
    await connect();
    console.log("Database connected");
    app.listen(port, host, () => console.log("Server is running"));
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err.message);
    process.exit(1);
  }
};
start();
