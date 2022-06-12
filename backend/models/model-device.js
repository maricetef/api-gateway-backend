const mongoose = require("mongoose");//npm install mongoose
const { model,Schema } = mongoose;

const DeviceSchema = new Schema({

  UID: { type: Number, requiered: true },
  proveedor: { type: String, requiered: true },
  fechaCreacion: { type: Date, requiered: true },
  estado: { type: String, requiered: true }

});

module.exports = model("Device", DeviceSchema);
