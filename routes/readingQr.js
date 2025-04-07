import express from "express"
import axios from "axios"
import { Jimp } from "jimp"
import jsQR from "jsqr"

const router = express.Router();

const parseQrCode = async (req, res) => {
    const response = await axios.get("https://hackattic.com/challenges/reading_qr/problem?access_token=8b64569ffdcf95c0").then(resp => resp.data)
    const image = await Jimp.read(response.image_url);
    // Get the image data
    const imageData = {
        data: new Uint8ClampedArray(image.bitmap.data),
        width: image.bitmap.width,
        height: image.bitmap.height,
    };

    // Use jsQR to decode the QR code
    const decodedQR = jsQR(imageData.data, imageData.width, imageData.height);
    if (decodedQR) {
        const response = await axios.post("https://hackattic.com/challenges/reading_qr/solve?access_token=8b64569ffdcf95c0", { code: decodedQR.data }).then(resp => resp.data.message)
        if (response === "woah there! you've solved this one, no need to convince me more.") {
            res.json({ message: "success :)" })
        } else {
            res.json({ message: "failure :(" })
        }

    }
}

router.get("/", parseQrCode)


export default router