import multer from "multer"
import express from 'express'
import path from "path"
import { createFood,getFood ,delOne,delAll} from '../controllers/FoodController'
import { protect } from "../middleware/authMiddleware"
import { postMenu, getMenu } from "../controllers/MenuController"
const router = express.Router()
const IMG_SAVE = path.join(__dirname, "../../storage/imagestorage")

const fullPath = path.resolve(IMG_SAVE)
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

const FOOD_ROUTE = "/food"
router.use(protect)
router.post(`${FOOD_ROUTE}`, upload.single("file") ,createFood)
router.get(`${FOOD_ROUTE}/all`, getFood)
router.post(`${FOOD_ROUTE}/delone`, delOne)
router.post(`${FOOD_ROUTE}/delall`, delAll)


const MENU_ROUTE = "/menu"
router.post(`${MENU_ROUTE}`, postMenu)
router.get(`${MENU_ROUTE}`, getMenu)
export default router 