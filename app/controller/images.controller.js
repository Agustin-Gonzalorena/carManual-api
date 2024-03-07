import { ImagesModel } from "../model/images.model.js";
import { checkNameSpaces } from "../utils/checkNameSpaces.js";
import path from "path";

export class ImagesController {
  static async getImages(req, res) {
    const { name } = req.params;
    const image = await ImagesModel.getImages(name);
    if (image != null) {
      res.setHeader("Content-Type", "image/jpeg");
      res.end(image);
    } else {
      res.status(404).json({ error: "Image not found" });
    }
  }
  static async existsImage(name_) {
    const name = checkNameSpaces(name_);
    const image = await ImagesModel.getImages(name);
    if (image != null) {
      return true;
    } else {
      return false;
    }
  }
  static async add(image) {
    if (!image) return null;
    const extension = path.extname(image.name).toLowerCase();
    if (extension !== ".jpg" && extension !== ".jpeg" && extension !== ".png") {
      return null;
    }
    const name = checkNameSpaces(image.name);
    const result = await ImagesModel.postImages(name, image.data);
    if (result) {
      return name;
    } else {
      return null;
    }
  }
  static async delete(name) {
    const result = await ImagesModel.delete(name);
    if (result) {
      return true;
    } else {
      return false;
    }
  }
}
//FIXME: borrar esto
/* static async postImages(req, res) {
  //check si mandaron alguna imagen
  if (!req.files) {
    return res.status(400).json({ error: "No files were uploaded." });
  }
  const image = req.files.img;

  //check que si es un formato aceptado
  const extension = path.extname(image.name).toLowerCase();
  if (extension !== ".jpg" && extension !== ".jpeg" && extension !== ".png") {
    return res.status(400).json({
      error: "El archivo no es una imagen válido (jpg, jpeg, png)",
    });
  }

  //check que si no existe el archivo
  if ((await ImagesModel.getImages(image.name)) != null)
    return res.status(409).json({ error: "Image already exists" });

  const result = await ImagesModel.postImages(image.name, image.data);

  if (result) {
    res.status(201).json({ ok: "Image uploaded" });
  } else {
    res.status(500).json({ error: "Internal server error" });
  }
} */
