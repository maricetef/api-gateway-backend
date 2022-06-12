const bd= require("mongoose");//npm install mongoose

//Direccion de la base de Datos local
const URI = "mongodb://localhost:27017/controllergateway";
//Si es en la nube se pone una  url donde hay que cambiarle la Clave y el nombre de la Base de Datos, 
bd.connect(URI)
  .then(() => console.log("Conectado"))
  .catch(err=>console.error(err));

module.exports = bd;