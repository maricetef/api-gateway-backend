const uniqueValidator =require("mongoose-unique-validator") ;//npm install mongoose
const { model,Schema} = require("mongoose");

const gatewaySchema = new Schema({
  numSerie:{type: Number, requiered: true, unique:true},
  nombre: {type: String, requiered: true},
  dirIPv4: {type: String, requiered: true},
  devices :[{
    type: Schema.Types.ObjectId,
    ref:"Device"}]
 
});
 
gatewaySchema.set("toJSON",{
  transform: (documento, returnObject) =>{
    returnObject.id= returnObject._id;
    delete returnObject._id;
    delete returnObject.__v;
  }
});

gatewaySchema.plugin(uniqueValidator);
module.exports = model("Gateway",gatewaySchema);