import express from "express";
import Program from "./programSchema.js"; // Import the Program model
import OpenAI from "openai";
import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs"; // Import the fs module
import path from "path"; // Import the path module

dotenv.config();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
const router = express.Router();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Get data from MongoDB
async function fetchAllData() {
  try {
    const programs = await Program.find({});
    console.log("Programs:", programs);
    return programs;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

const benefits = await fetchAllData();
const benefits_json = { programs: benefits };

// Function to generate instructions with context from MongoDB
async function generateInstructionsWithContext(benefits_json) {
  try {
    // Fetch relevant federal benefits data based on the message
    // Use benefits data to generate instructions
    return `You are a chatbot who will answer questions about federal benefits. If the user first generally inquires about what benefits they might qualify for, ask them to provide some information about themselves especially regarding any specially circumstances they may be in. Then, guide your answer based on alignment with their answer and the database. If the user inquires about a program or some information is not provided, answer you are not sure but the user should email "healthierdemocracy@gmail.com". Importantly, be kind and welcoming in your tone. Always ask if the user has more questions or would like more information. Crucially, you will base your answer using the following information about federal and state benefits in Massachusetts: ${JSON.stringify(
      benefits_json
    )}. `;
  } catch (error) {
    console.error("Error fetching federal benefits data:", error);
    throw error;
  }
}

(async () => {
  console.log(benefits_json);
  const instructions = await generateInstructionsWithContext(benefits_json);

  console.log(instructions);
  const assistant = await openai.beta.assistants.create({
    name: "Link",
    instructions: instructions,
    tools: [{ type: "code_interpreter" }],
    model: "gpt-4o",
  });

  const thread = await openai.beta.threads.create();

  router.post("/ask", async (req, res) => {
    const { message } = req.body;
    console.log(assistant, thread);

    try {
      // Send the user's message to the assistant
      await openai.beta.threads.messages.create(thread.id, {
        role: "user",
        content: message,
      });

      // Run the assistant
      const run = await openai.beta.threads.runs.create(thread.id, {
        assistant_id: assistant.id,
      });

      // Wait for the run to complete
      let runStatus = await openai.beta.threads.runs.retrieve(
        thread.id,
        run.id
      );
      while (runStatus.status !== "completed") {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second
        runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
      }

      // Retrieve the assistant's messages
      const messages = await openai.beta.threads.messages.list(thread.id);

      const formattedMessages = messages.data.map((msg) => ({
        role: msg.role,
        content: msg.content[0].text.value,
      }));

      // Send the complete chat history back to the client
      res.status(200).json({ messages: formattedMessages });
    } catch (error) {
      console.error("Error processing message:", error);
      res.status(500).send(error);
    }
  });
})();

export default router;
