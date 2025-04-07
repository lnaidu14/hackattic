import express from "express"

import readingQrRoute from "./routes/readingQr.js"

const app = express()

const port = 3000

app.use(express.json());

app.use('/api/hackattic/readingQr', readingQrRoute)

app.listen(port, () => console.log(`server running on port ${port}`))   