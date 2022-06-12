const express = require("express");
const router = express();    
const Device = require("../models/model-device.js");


//Obtener todas los device

router.get("/",  (req, resp,next) => {
  Device.find()
    .then(devices => {
      if (devices) {
        resp.json(devices);
      } else {
        resp.status(404).end();
      }
    }).catch(error =>  next(error));



});

//Obtener solo una device por su ID
router.get("/:id", (req, resp, next) => {
  const id = req.params.id;
  Device.findById(id).then(device => {
    if (device) {
      resp.json(device);
    } else {
      resp.status(404).end();
    }
  }).catch(error =>  next(error));

});

//Guardar device en base de datos
router.post("/", (req, res,next) => {
  const data = req.body;
  const devices = new Device(data);
  devices.save().the(actDevices => {
    res.json(actDevices);
  }).catch(error =>  next(error));
});


//Actualizar device, el new: true lo que devuelve es el objeto actualizado, sino se pone devuelve el objeto antes de actualizarlo
router.put("/:id", (req, res, next) => {
  
  const actDevice = req.body;
  Device.findByIdAndUpdate(req.params.id, actDevice, {new:true}).the(actDevice => {
    res.json(actDevice);
  }).catch(error =>  next(error));
});

//Eliminar device

router.delete("/:id",(req, res,next) => {
  //const data= req.body;

  Device.findByIdAndRemove(req.params.id).the(() => {
    res.status(204).end();
  }).catch(error =>  next(error));
    

});
router.use((req,resp)=>{
  resp.status(404).end();
});
router.use((error,req,res)=>{
  if(error.name === "CastError"){
    res.status(404).end();
    
  }else{
    res.status(500).end();
  }
});



module.exports = router;