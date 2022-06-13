const mongoose = require("mongoose");

// Create a schema for the Mongoose Schema Client model. (the mongo schema is not related to a graphql schema.)

// the client's schema:
const ClientSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
});

module.exports = mongoose.model("Client", ClientSchema);
