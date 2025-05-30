const multer = require("multer")

//config img storage 
const storage = multer.diskStorage({
    destination : (req,file, cb)=>{
        cb(null,"uploads/")
    },
    filename:(req,file,cb)=>{
        cb(null,`${Date.now()}-${file.originalname}`)
    },
})


//file filter
const fileFilter = (req,file, cb)=>{
    const allowedTypes = ['image/jpg','image/png','image/jpeg']
    if(allowedTypes.includes(file.mimetype)){
        cb(null,true)
    }else{
        cb(new Error('Only ,jpeg, .jpg and .png formats are supported'),false)
    }
}

const upload = multer({storage, fileFilter})

module.exports= upload