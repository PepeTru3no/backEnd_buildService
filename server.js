// server.js
import app from "./app.js";

const PORT = process.env.SERVER_PORT || 3000;

const servidor= process.env.RENDER?'correindo desde RENDER': 'corriendo en LOCAL'; 

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

app.get('/',(req,res)=>{
    res.json({message:`Bienvenido al servicio, ${servidor}`});
})