const mongoose= require("mongoose");//npm install mongoose
const {model,Schema} = mongoose;

const GatewaySchema = new Schema({
  numSerie:{type: Number, requiered: true},
  nombre: {type: String, requiered: true},
  dirIPv4: {type: String, requiered: true},
  //Device : {type: Device}
 
});

module.exports = model("Gateway",GatewaySchema);