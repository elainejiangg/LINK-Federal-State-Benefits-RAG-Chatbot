import mongoose from "mongoose";

const programSchema = new mongoose.Schema({
  program_name: { type: String, required: true },
  agency: { type: String, required: true },
  description: { type: String, required: true },
  website: { type: String, required: false },
  eligibility: { type: String, required: false },
  limitations: { type: String, required: false },
  amount: { type: String, required: false },
  how_to_apply: { type: String, required: false },
  linked_services: { type: String, required: false },
  right_to_appeal: { type: String, required: false },
  retroactive: { type: String, required: false },
  other: { type: String, required: false },
});

const Program = mongoose.model("Program", programSchema);

export default Program;
