import multer from "multer"
import express from 'express'
import path from "path"
import { createFood, getFood, delOne, delAll } from '../controllers/FoodController'
import { protect } from "../middleware/authMiddleware"
import { postMenu, getMenu } from "../controllers/MenuController"
import { getRating, postRating } from "../controllers/RatingControlller"
import { getKeywords, postKeyWords,getKeywordsByUser } from "../controllers/KeywordController"
const router = express.Router()
const BUFFER  = path.resolve(path.join(__dirname, "../../storage/buffer"))
const foodImageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, BUFFER)

    },
    filename: (req, file, cb) => {
        const saveFile = Date.now() + "_" + file.originalname
        cb(null, saveFile)
        req.body.fileIden = saveFile
    }
})
const upload = multer({ storage: foodImageStorage })

const FOOD_ROUTE = "/food"
router.use(protect)
router.post(`${FOOD_ROUTE}`, upload.single("file"), createFood)
router.get(`${FOOD_ROUTE}/all`, getFood)
router.post(`${FOOD_ROUTE}/delone`, delOne)
router.post(`${FOOD_ROUTE}/delall`, delAll)


const MENU_ROUTE = "/dailyFood"
router.post(`${MENU_ROUTE}`, postMenu)
router.get(`${MENU_ROUTE}`, getMenu)

const RATING_ROUTE = "/rating"
router.get(`${RATING_ROUTE}`, getRating)
router.post(`${RATING_ROUTE}`, postRating)

const KEYWORD_ROUTE = "/keyword"
router.get(`${KEYWORD_ROUTE}`, getKeywords)
router.post(`${KEYWORD_ROUTE}`, postKeyWords)
router.get(`${KEYWORD_ROUTE}/user`,getKeywordsByUser)
export default router 
