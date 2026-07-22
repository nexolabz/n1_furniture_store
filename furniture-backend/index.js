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
const userRoutes=require('./routes/users')
const staffRoutes=require("./modules/staff/routes/staff_routes")
const deliveryRoutes=require("./modules/delivery/routes/delivery")
const adminRoutes=require("./modules/admin/routes/admin_routes")
app.use('/api/auth/',cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }), authRoutes)
app.use('/api/users/',cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }), userRoutes)
app.use('/api/staff/',cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }), staffRoutes)
app.use('/api/delivery/',cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }), deliveryRoutes)
app.use('/api/admin/',cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }), adminRoutes)

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})