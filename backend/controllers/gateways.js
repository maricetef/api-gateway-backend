const routerGateway= require("express").Router();
const Gateway = require("../models/Gateway.js");


//Obtener todas las gateways 

routerGateway.get("/", async(req,resp,next)=>{
  await  Gateway.find().populate("devices",{
    UID:1,
    proveedor:1

  })
    .then(gateways => {
      if (gateways) {
        resp.json(gateways);
      } else {
        resp.status(404).end();
      }
    }).catch(error =>next(error));
       
});

//Obtener solo una gateway por su ID
routerGateway.get("/:id", async(req,resp,next)=>{
  const id = req.params.id;
  await  Gateway.findById(id).populate("devices",{
    UID:1,
    proveedor:1
  })
    .then(gateway => {
      if (gateway) {
        resp.json(gateway);
      } else {
        resp.status(404).end();
      }
    }).catch(error =>next(error));
 
});


//Guardar gateway en base de datos
routerGateway.post("/", async (req, res,next)=>{
  const {body}= req;
  const{numSerie,nombre,dirIPv4}=body;
 
  const gateway= new Gateway({
    numSerie,nombre,dirIPv4
  });
 
  try{
    const saveGateway= await gateway.save();
  
    res.json(saveGateway);
  }catch(error){
    next(error);
  }

});


//Actualizar gateway
routerGateway.put("/:id",async (req, res,next)=>{
  const id= req.params.id;
  const actGateway= req.body;
  await Gateway.findByIdAndUpdate(id, actGateway, {new:true}).the(actGateway => {
    res.json(actGateway);
  }).catch(error =>  next(error));
});

//Eliminar gateway

routerGateway.delete("/:id",async (req, res,next)=>{
  const id= req.params.id;
 
  await Gateway.findByIdAndRemove(id).then(() => {
    res.status(204).end();
  }).catch(error =>  next(error));

});


routerGateway.use((req,resp)=>{
  resp.status(404).end();
});

routerGateway.use((error,req,resp)=>{
  console.log(resp);
  if(error.name === "CastError"){
    resp.status(404).end();
    
  }else{
    resp.status(500).end();
  }
});

module.exports=routerGateway;