const Customer = require("../models/customer");

// will add customer if custmer with that email does not exist
exports.addNewCustomer = async (req, res) => {
  try {
    const { email, name } = req.body;

    if (!email || !name) {
      return res.status(400).json({ message: "Customer name and email are required" });
    }

    const existingCustomer = await Customer.findOne({ email }).lean().exec();
    if (existingCustomer) {
      return res.status(200).json(existingCustomer);
    }

    const newCustomer = await Customer.create(req.body);
    return res.status(201).json(newCustomer);
  } catch (err) {
    console.error("Failed to save customer:", err.message);
    return res.status(500).json({ message: "Failed to save customer" });
  }
};
