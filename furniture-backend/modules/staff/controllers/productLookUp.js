const db_connection = require('../../../config/db_config')

const handleLookUpProduct = async (req,res) =>{
    const searchTerm=req.query.search
    try{
        let sql
        let values=[]
        if(searchTerm){
            sql = "SELECT * FROM products WHERE product_name LIKE ? "
            values=[`%${searchTerm}%`]
        } else {
            sql = "SELECT * FROM products"
        }

        db_connection.query(sql , values, (err,result)=>{
            if(err){
                return res.status(500).json({message:"Error searching for product"})
            }
            if(!result || result.length === 0){
                return res.status(404).json({message:"No products found"})
            }
            return res.status(200).json({
                success:true,
                count:result.length,
                products:result
        })
    })
}
   catch(err){
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}


module.exports = {
    handleLookUpProduct
}