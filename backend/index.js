
require("../backend/database.js");
const express = require("express");
const cors = require("cors");
const server=express();
const path=require("path");



//Setting

server.set("port", process.env.PORT || 5000);

//Middlewares este en especifico funciones que se ejecutan antes de las rutas

server.use(cors());
server.use(express.json());//permite q todo se formate a json



//Routes
server.use("/api/gateways", require("./controllers/gateways.js"));
server.use("/api/devices", require("./controllers/devices.js"));

//View
server.use(express.static(path.join(__dirname,"public")));//Obtener la ruta de la carpeta public
//Cuando no encunetre ninguna ruta
server.use((req,resp)=>{
  resp.status(404).end();
});

//Star server
server.listen(server.get("port"),()=>{
  console.log(`Servidor corriendo en ${server.get("port")}` );
});