import { Router } from "express";
import { ImagesController } from "./app/controller/images.controller.js";
import { FilesController } from "./app/controller/files.controller.js";
import { VehiclesController } from "./app/controller/vehicles.controller.js";

export const routes = Router();

routes.get("/images/:name", ImagesController.getImages);

routes.get("/files/:name", FilesController.getFile);

routes.get("/", VehiclesController.getVehicles);
routes.get("/:id", VehiclesController.getVehicles);
routes.post("/", VehiclesController.postVehicle);
