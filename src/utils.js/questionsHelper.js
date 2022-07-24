export const generateRandomQuestions = (numberRange, operatorTypes) => {
    const firstNumber = Math.floor(Math.random() * numberRange + 1);
    const secondNumber = Math.floor(Math.random() * numberRange + 1);
    const operatorIndex = Math.floor(Math.random() * operatorTypes.length);
    return `${firstNumber} ${operatorTypes[operatorIndex]} ${secondNumber}`
}