import { VehiclesModel } from "../model/vehicles.model.js";
import { ImagesController } from "./images.controller.js";
import { FilesController } from "./files.controller.js";
import { validateVehicle } from "../schemas/vehicle.schemas.js";

export class VehiclesController {
  static async getVehicles(req, res) {
    const id = req.params.id;
    if (id) {
      const vehicle = await VehiclesModel.getVehicle(id);
      if (vehicle !== null) {
        res.json(vehicle);
      } else {
        res.status(404).json({ error: "Vehicle not found" });
      }
    } else {
      const vehicles = await VehiclesModel.getVehicles();
      res.json(vehicles);
    }
  }
  static async postVehicle(req, res) {
    //chequear si los archivos fueron subidos
    if (!req.files || !req.files.img || !req.files.pdf) {
      return res.status(400).json({ error: "No files were uploaded." });
    }
    //validar datos recibidos
    req.body.year = parseInt(req.body.year, 10);
    const result = validateVehicle(req.body);
    if (result.error) {
      return res.status(400).json({ error: result.error.issues[0].message });
    }
    const vehicle = req.body;
    const image = req.files.img;
    const pdf = req.files.pdf;

    //chequear si los archivos ya existen
    if (await ImagesController.existsImage(image.name))
      return res.status(409).json({ error: "Image already exists" });
    if (await FilesController.existsFile(pdf.name))
      return res.status(409).json({ error: "File already exists" });

    //agregar los archivos
    const checkImg = await ImagesController.add(image);
    const checkPdf = await FilesController.add(pdf);
    //si alguno falla se borran los dos
    if (checkImg == null || checkPdf == null) {
      if (checkImg != null) await ImagesController.delete(checkImg);
      if (checkPdf != null) await FilesController.delete(checkPdf);
      return res.status(500).json({ error: "Internal server error" });
    }
    const url_host = req.get("host");
    const url_img = `http://${url_host}/vehicles/images/${checkImg}`;
    const url_pdf = `http://${url_host}/vehicles/files/${checkPdf}`;

    const vehicleNew = await VehiclesModel.add(vehicle, url_img, url_pdf);
    if (vehicleNew == null) {
      await ImagesController.delete(checkImg);
      await FilesModel.deleteFile(checkPdf);
      return res.status(500).json({ error: "Internal server error" });
    }

    res.status(201).json({
      id: vehicleNew,
      name: vehicle.name,
      description: vehicle.description,
      brand: vehicle.brand,
      year: vehicle.year,
      url_img: url_img,
      url_pdf: url_pdf,
    });
  }
}
