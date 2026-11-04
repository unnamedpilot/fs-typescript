interface ExerciseInformation {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const calculateExercises = (hours: number[], target: number): ExerciseInformation => {
    // This is not the average there is something missing
    const average = hours.reduce((acc, currDay) => acc + currDay, 0)/hours.length;
    const periodLength = hours.length;
    const trainingDays = hours.filter(day => day !== 0).length;
    const success = average >= target;
    const rating = Math.trunc(trainingDays/periodLength * 3);
    const ratingList = [
        "Expect you to make an effort next time",
        "you have plenty of room for improvement",
        "not bad but it could be better",
        "perfect"
    ]
    const ratingDescription = ratingList[rating]
    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))