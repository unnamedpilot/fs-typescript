interface ExerciseSummary {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

export interface ExerciseInformation {
    hours: number[],
    target: number
}

const parseArguments = (args: string[]): ExerciseInformation => {
    if (args.length < 4) throw new Error("not enough arguments");

    const mappedArgs = args.slice(2).map(num => Number(num));
    if (mappedArgs.every(num => !isNaN(num))) {
        return {
            hours: mappedArgs.slice(0,-1),
            target: mappedArgs[mappedArgs.length - 1]
        };
    }   
    else {
        throw new Error("all arguments must be numbers");
    }

};

export const calculateExercises = (info: ExerciseInformation): ExerciseSummary => {
    const { hours, target } = info;
    const average = hours.reduce((acc, currDay) => acc + currDay, 0)/hours.length;
    const periodLength = hours.length;
    const trainingDays = hours.filter(day => day !== 0).length;
    const success = average >= target;
    const rating = Math.trunc(average/target * 3);
    const ratingList = [
        "Expect you to make an effort next time",
        "you have plenty of room for improvement",
        "not bad but it could be better",
        "perfect"
    ];
    const ratingDescription = ratingList[rating];
    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
};

if(process.argv[1] === import.meta.filename) {
    try {
        const info = parseArguments(process.argv);
        const summary = calculateExercises(info);
        console.log(summary);
    } catch (error: unknown) {
        let errorMessage = "Something bad happened";
        if (error instanceof Error){
            errorMessage += ": " + error;
        }
        console.log(errorMessage);
    }
}



export {};
