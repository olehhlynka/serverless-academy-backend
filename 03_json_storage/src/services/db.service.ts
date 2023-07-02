import DocumentModel from "../models/document.model";
import { IDocument } from "../interfaces/document.interface";
import {
  DBSaveError,
  DBQueryError,
} from "../errors/db.error";

const saveDocument = async (
  path: string,
  fileName: string,
  data: string
): Promise<IDocument> => {
  try {
    return await DocumentModel.create({
      path,
      fileName,
      data,
    });
  } catch (error: any) {
    throw new DBSaveError(
      "Failed to save the document to the database"
    );
  }
};

const findDocument = async (
  path: string,
  fileName: string
): Promise<IDocument | undefined> => {
  try {
    const result = await DocumentModel.find()
      .where("path")
      .equals(path)
      .where("fileName")
      .equals(fileName);
    return result[0];
  } catch (error: any) {
    throw new DBQueryError("Failed to query the database");
  }
};

export { saveDocument, findDocument };
