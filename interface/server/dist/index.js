"use strict";

var _express = _interopRequireDefault(require("express"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _chat = _interopRequireDefault(require("./chat.js"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _cors = _interopRequireDefault(require("cors"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// app.post("/api/chat", async (req, res) => {
//   const { message } = req.body;

//   try {
//     const response = await openai.createChatCompletion({
//       model: "gpt-3.5-turbo",
//       messages: [{ role: "user", content: message }],
//     });

//     res.json({ reply: response.data.choices[0].message.content });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error communicating with OpenAI");
//   }
// });

// Import the router

// Import cors

_dotenv["default"].config();
var app = (0, _express["default"])();
var PORT = process.env.PORT || 5001;

// Use CORS middleware
app.use((0, _cors["default"])({
  origin: "http://localhost:3000" // Allow requests from this origin
}));

// Connect to MongoDB
_mongoose["default"].connect(process.env.MONGODB_URI || "mongodb+srv://healthier:iap2025@atlascluster.orvyczc.mongodb.net/healthier?retryWrites=true&w=majority&appName=AtlasCluster", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  return console.log("MongoDB connected");
})["catch"](function (err) {
  return console.error(err);
});
app.use(_express["default"].json());
// Use the router
app.use("/", _chat["default"]);

// Start the server
app.listen(PORT, function () {
  console.log("Server running on port ".concat(PORT));
});