import express from "express";
import calculateBmi from "./bmiCalculator.ts";
import { calculateExercises } from "./exerciseCalculator.ts";

const isValidQuery = (value: object): boolean => {
    if (!(typeof value === "object") || (value === null)) return false;

    const prototype: unknown = Object.getPrototypeOf(value);
    if(!(prototype === Object.prototype || prototype === null)) return false;

    return Object.keys(value).includes("height") && Object.keys(value).includes("weight");
};


const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
    res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
    const queryParams = req.query;
    console.log(queryParams);
    if(!isValidQuery(queryParams)) {
        res.status(400).json({error: "malformatted parameters"});
        return;
    }

    const height = Number(queryParams.height);
    const weight = Number(queryParams.weight);

    if(isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
        res.status(400).json({error: "malformatted parameters"});
        return;
    }

    const bmi = calculateBmi({
        height, weight
    });

    res.json({height, weight, bmi});
});

app.post("/exercises", (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const body = req.body;
    if(!body || !("daily_exercises" in body && "target" in body)) {
        res.status(400).json({error: "parameters missing"});
        return;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises: dailyExercises, target } = body;

    if(
        !Array.isArray(dailyExercises) || 
        dailyExercises.length === 0 || 
        dailyExercises.some(value => isNaN(Number(value))) || 
        isNaN(Number(target)) || target <= 0
    ) {
        res.status(400).json({ error: "malformatted parameters" });
        return;
    }

    const info = { hours: dailyExercises, target: Number(target)};

    const result = calculateExercises(info);

    res.json(result);

});

const PORT = 3000;

app.listen(PORT, () => console.log(`Server is listening at port ${PORT}`));