interface bmiData {
    height: number,
    weight: number
}

const calculateBmi = (data: bmiData): string => {
    const { height, weight } = data;
    const bmi = weight/((height/100)^2);
    if (bmi >= 40) return "Obese (Class III)";
    else if (bmi >= 35) return "Obese (Class II)";
    else if (bmi >= 30) return "Obese (Class I)";
    else if (bmi >= 25) return "Overweight (Pre-obese)";
    else if (bmi >= 18.5) return "Normal range";
    else if (bmi >= 17) return "Underweight (Mild thinness)";
    else if (bmi >= 16) return "Underweight (Moderate thinness)";
    else return "Underweight (Severe thinness)";
};

const parseArguments = (args: string[]): bmiData => {
    if (args.length > 4) throw new Error("Too much arguments");
    else if (args.length < 4) throw new Error("Missing arguments");
    
    const height = Number(args[2]);
    const weight = Number(args[3]);

    if (!isNaN(height) && !isNaN(weight)) {
        if (height <= 0 || weight <= 0) throw new Error("both arguments must be greater than 0");
        return { height, weight };
    }
    else {
        throw new Error("Both arguments must be numbers");
    }

};

if(process.argv[1] === import.meta.filename){
    try {
    const data = parseArguments(process.argv);
    const result = calculateBmi(data);
    console.log(result);
} catch (error: unknown) {
    let errorMessage = "Something bad happened";
    if(error instanceof Error) {
        errorMessage += ": " + error.message;
    }
    console.log(errorMessage);
}


}

export default calculateBmi;
