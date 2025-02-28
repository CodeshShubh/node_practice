import express from 'express';
import {dbConnection} from './database.js';
import path from 'path'
import  {v2 as cloudinary} from 'cloudinary'
import {CloudinaryStorage} from 'multer-storage-cloudinary'
import multer from 'multer';

// initilized app by the instance of express
const app = express();
const PORT = 8001;

// calling database function
const URI = 'mongodb://localhost:27017/multerUploadImage'
dbConnection(URI);





app.set('view engine', 'ejs');

app.set('views', path.resolve('./views') )
app.use(express.json());
express.urlencoded({ extended: true })


app.get('/',(req,res)=>{
    return res.render('home')
})



//-------------------------------------------------------------->

// Configure Cloudinary
cloudinary.config({ 
    cloud_name: '', 
    api_key: '', 
    api_secret: '' 
  });
  

// Configure Cloudinary Storage for Multer
  const storage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder:'uploads',
        format: async()=>'jpg',
        public_id: (req,file)=>file.originalname.split('.')[0]
    }
  })

const upload = multer({storage})




// Upload Image Endpoint
app.post('/upload', upload.single('image'), (req, res) => {
    res.status(200).json({ 
      message: 'Image Uploaded Successfully', 
      imageUrl: req.file.path 
    });
  });

  










app.listen(PORT, ()=>{
    console.log(`Server is working on port : ${PORT}`)
})
