// src/server.js
import express from "express";
import path from "path"; // Asegúrate de importar el módulo 'path'

const app = express();
app.use(express.static(path.join("", "dist")));

app.get("/", (req, res) => {
	res.sendFile(path.join("", "dist", "index.html"));
});

app.listen(3000, "0.0.0.0", () => {
	console.log("Servidor corriendo en http://localhost:3000");
});
