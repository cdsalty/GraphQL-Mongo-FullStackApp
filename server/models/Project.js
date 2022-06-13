const mongoose = require("mongoose");

// Create a schema for the Mongoose Schema Project model. (the mongo schema is not related to a graphql schema.)

// the Project's schema:
const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    // Since we want to only give it a few status options, we can set the enum to the following:
    enum: ["Not Started", "In Progress", "Completed"],
  },
  // the clientId is a reference to the clientId of the client Model that this project belongs to.
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
  },
});

module.exports = mongoose.model("Project", ProjectSchema);
