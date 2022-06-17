const uniqueValidator =require("mongoose-unique-validator") ;//npm install mongoose
const { model,Schema} = require("mongoose");

const deviceSchema = new Schema({

  UID: { type: Number, requiered: true, unique: true },
  proveedor: { type: String, requiered: true },
  fechaCreacion: Date,
  estado: Boolean,
  gateway: {
    type: Schema.Types.ObjectId,
    ref: "Gateway"
  }

});
deviceSchema.set("toJSON",{
  transform: (documento, returnObject) =>{
    returnObject.id= returnObject._id;
    delete returnObject._id;
    delete returnObject.__v;
  }
});

deviceSchema.plugin(uniqueValidator);

module.exports = model("Device", deviceSchema);
