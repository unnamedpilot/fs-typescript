import express from "express"
import calculateBmi from "./bmiCalculator.ts"

const isValidQuery = (value: Object): boolean => {
    if (!(typeof value === "object") || (value === null)) return false

    const prototype = Object.getPrototypeOf(value)
    if(!(prototype === Object.prototype || prototype === null)) return false

    return Object.keys(value).includes("height") && Object.keys(value).includes("weight")
}


const app = express()

app.get("/hello", (_req, res) => {
    res.send("Hello Full Stack!")
})

app.get("/bmi", (req, res) => {
    const queryParams = req.query;
    console.log(queryParams)
    if(!isValidQuery(queryParams)) {
        res.status(400).json({error: "malformatted parameters"})
        return
    }

    const height = Number(queryParams.height)
    const weight = Number(queryParams.weight)

    if(isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
        res.status(400).json({error: "malformatted parameters"})
        return
    }

    const bmi = calculateBmi({
        height, weight
    })

    res.json({...queryParams, bmi})
})

const PORT = 3003;

app.listen(PORT, () => console.log(`Server is listening at port ${PORT}`))