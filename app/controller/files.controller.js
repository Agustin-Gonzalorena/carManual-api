import { FilesModel } from "../model/files.model.js";
import path from "path";
import { checkNameSpaces } from "../utils/checkNameSpaces.js";

export class FilesController {
  static async getFile(req, res) {
    const { name } = req.params;
    const filePath = await FilesModel.getFile(name);

    if (filePath != null) {
      res.sendFile(filePath);
    } else {
      res.status(404).json({ error: "File not found" });
    }
  }

  static async existsFile(name_) {
    const name = checkNameSpaces(name_);
    const file = await FilesModel.getFile(name);
    if (file != null) {
      return true;
    } else {
      return false;
    }
  }

  static async add(file) {
    if (!file) return null;
    const extension = path.extname(file.name).toLowerCase();
    if (extension !== ".pdf") {
      return null;
    }
    const name = checkNameSpaces(file.name);
    const result = await FilesModel.saveFile(name, file.data);
    if (result) {
      return name;
    } else {
      return null;
    }
  }
  static async delete(name) {
    const result = await FilesModel.delete(name);
    if (result) {
      return true;
    } else {
      return false;
    }
  }
}

/* static async postFile(req, res) {
  //check si mandaron algun archivo
  if (!req.files) {
    return res.status(400).json({ error: "No files were uploaded." });
  }
  const pdf = req.files.pdf;
  console.log(pdf);

  //check que si es un formato aceptado
  const extension = path.extname(pdf.name).toLowerCase();
  if (extension !== ".pdf") {
    return res.status(400).json({ error: "El archivo no es un pdf" });
  }
  //check si no existe el archivo
  if ((await FilesModel.getFile(pdf.name)) != null)
    return res.status(409).json({ error: "File already exists" });

  const result = await FilesModel.saveFile(pdf.name, pdf.data);

  if (result) {
    res.status(201).json({ message: "File uploaded" });
  } else {
    res.status(500).json({ error: "Error uploading file" });
  }
} */
