import mysql from "mysql2/promise";
import { config } from "dotenv";
config();
const configs = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
};
const connection = await mysql.createConnection(configs);

export class VehiclesModel {
  static async getVehicles() {
    const result = await connection.query("SELECT * FROM cars");
    return result[0];
  }
  static async getVehicle(id) {
    const result = await connection.query("SELECT * FROM cars WHERE id = ?", [
      id,
    ]);
    if (result[0].length === 0) return null;
    return result[0];
  }
  static async add(vehicle, url_img, url_pdf) {
    try {
      const result = await connection.query(
        "INSERT INTO cars (name, description, brand, year, url_img, url_pdf) VALUES (?, ?, ?, ?, ?, ?)",
        [
          vehicle.name,
          vehicle.description,
          vehicle.brand,
          vehicle.year,
          url_img,
          url_pdf,
        ]
      );
      return result[0].insertId;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}
