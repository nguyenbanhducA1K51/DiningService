const IMG_STORE = path.resolve(__dirname + "/../../storage/image")
import path from "path"
import fs from "fs"
export const encodeImage = (iden) => {
    const object = {}
    const img_path = path.join(IMG_STORE, iden)
    object["data"] = fs.readFileSync(img_path).toString('base64');

    const extend = iden.split(".").pop()

    if (extend === "jpg" || extend == "jpeg") {
        object["type"] = "image/jpeg"
    }
    else if (extend === "png") {
        object["type"] = "image/png"
    }
    return object

}