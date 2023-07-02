import mongoose, { Schema } from "mongoose";
import { IDocument } from "../interfaces/document.interface";

const DocumentSchema = new Schema<IDocument>({
  path: { type: String, required: true, maxLength: 100 },
  fileName: {
    type: String,
    required: true,
    maxLength: 100,
  },
  data: { type: String, required: true },
});

export default mongoose.model<IDocument>(
  "Document",
  DocumentSchema
);
