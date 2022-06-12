const express = require("express");
const router = express();
const Gateway = require("../models/model-gateway.js");


//Obtener todas las gateways 

router.get("/", (req,resp,next)=>{
  Gateway.find().then(gateways => {
    if (gateways) {
      resp.json(gateways);
    } else {
      resp.status(404).end();
    }
  }).catch(error =>next(error));
       
});

//Obtener solo una gateway por su ID
router.get("/:id",(req,resp,next)=>{
  const id = req.params.id;
  Gateway.findById(id)
    .then(gateway => {
      if (gateway) {
        resp.json(gateway);
      } else {
        resp.status(404).end();
      }
    }).catch(error =>next(error));
 
});

//Guardar gateway en base de datos
router.post("/", (req, res,next)=>{
  const data= req.body;
  const gateway= new Gateway(data);
  gateway.save().the(newGateway => {
    res.json(newGateway);
  }).catch(error =>next(error));

});


//Actualizar gateway
router.put("/:id",async (req, res,next)=>{
  const id= req.params.id;
  const actGateway= req.body;
  await Gateway.findByIdAndUpdate(id, actGateway, {new:true}).the(actGateway => {
    res.json(actGateway);
  }).catch(error =>  next(error));
});

//Eliminar gateway

router.delete("/:id",async (req, res,next)=>{
  const id= req.params.id;
  await Gateway.findByIdAndRemove(id).the(() => {
    res.status(204).end();
  }).catch(error =>  next(error));
});
router.use((req,resp)=>{
  resp.status(404).end();
});
router.use((error,req,resp)=>{
  console.log(resp);
  if(error.name === "CastError"){
    resp.status(404).end();
    
  }else{
    resp.status(500).end();
  }
});

module.exports=router;