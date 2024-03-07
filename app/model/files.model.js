import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class FilesModel {
  static async getFile(name) {
    const filePath = path.join(__dirname, "../../pdfs", name);

    if (fs.existsSync(filePath)) {
      return filePath;
    } else {
      return null;
    }
  }
  static async saveFile(name, data) {
    const filePath = path.join(__dirname, "../../pdfs", name);
    try {
      fs.writeFileSync(filePath, data);
      return true;
    } catch (err) {
      return false;
    }
  }
  static async delete(name) {
    const filePath = path.join(__dirname, "../../pdfs", name);
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
