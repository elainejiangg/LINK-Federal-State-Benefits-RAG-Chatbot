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

import express from "express";
import mongoose from "mongoose";
import router from "./chat.js"; // Import the router
import dotenv from "dotenv";
import cors from "cors"; // Import cors

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

// Use CORS middleware
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from this origin
  })
);

// Connect to MongoDB
mongoose
  .connect(
    process.env.MONGODB_URI ||
      "mongodb+srv://healthier:iap2025@atlascluster.orvyczc.mongodb.net/healthier?retryWrites=true&w=majority&appName=AtlasCluster",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.use(express.json());
// Use the router
app.use("/", router);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
