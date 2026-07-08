const express=require("express");
const app=express();
const cors=require("cors");


const db=require('./config/db_config')

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
}));

const authRoutes=require('./routes/auth')
app.use('/api/auth/',cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }), authRoutes)

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})