import { Document } from "mongoose";

export interface IDocument extends Document {
  path: string;
  fileName: string;
  data: string;
}
