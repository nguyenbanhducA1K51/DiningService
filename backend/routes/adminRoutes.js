import multer from "multer"
import express from 'express'
import path from "path"
import { createFood,getFood ,delOne,delAll} from '../controllers/FoodController'

const router = express.Router()
const FOOD_ROUTE = "/food"
const IMG_SAVE = path.join(__dirname, "../../storage/imagestorage")

const fullPath = path.resolve(IMG_SAVE)
console.log(fullPath)
const foodImageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, fullPath)
      
    },
    filename: (req, file, cb) => {
        const saveFile = Date.now() + "_" + file.originalname
        cb(null, saveFile)
        req.body.filePath= saveFile
    }
})
const upload = multer({ storage: foodImageStorage })


router.post(`${FOOD_ROUTE}`, upload.single("file") ,createFood)
router.get(`${FOOD_ROUTE}/all`, getFood)
router.post(`${FOOD_ROUTE}/delone`, delOne)
router.post(`${FOOD_ROUTE}/delall`,delAll)
export default router