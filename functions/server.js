import app from "../app.js";
import serverless from 'serverless-http'

app.get('/',(req,res)=>{
    res.json({message:"Servidor corriendo en netlify"});
})
export const handler = serverless(app);