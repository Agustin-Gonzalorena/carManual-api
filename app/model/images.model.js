import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class ImagesModel {
  static async getImages(name) {
    const filePath = path.join(__dirname, "../../imgs", name);
    try {
      const image = fs.readFileSync(filePath);
      return image;
    } catch (err) {
      return null;
    }
  }
  static async postImages(name, data) {
    const filePath = path.join(__dirname, "../../imgs", name);
    try {
      fs.writeFileSync(filePath, data);
      return true;
    } catch (err) {
      return false;
    }
  }
  static async delete(name) {
    const filePath = path.join(__dirname, "../../imgs", name);
    try {
      fs.unlinkSync(filePath, (err) => {
        if (err) throw err;
      });
      return true;
    } catch (err) {
      return false;
    }
  }
}
