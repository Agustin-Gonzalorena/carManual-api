import express, { json } from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import { routes } from "./router.js";

const app = express();
app.use(json());
app.disabled("x-powered-by");
app.use(cors());
app.use(fileUpload());

app.use("/vehicles", routes);

app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
