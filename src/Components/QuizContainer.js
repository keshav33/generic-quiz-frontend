import React, { useState, useEffect } from 'react';
import { generateRandomQuestions } from '../utils.js/questionsHelper';
import QuizEnd from './QuizEnd';
import QuizMain from './QuizMain';

const QuizContainer = (props) => {
    const [timer, setTimer] = useState(20);
    const [input, setInput] = useState('');
    const [quizResponse, setQuizResponse] = useState([]);
    const [startQuiz, setStartQuiz] = useState(false);
    const [quizQuestion, setQuizQuestion] = useState('');
    const [numberRange, setNumberRange] = useState('');
    const [numberOfQuestions, setNumberOfQuestions] = useState('');
    const [operatorTypes, setOperatorTypes] = useState([]);
    let timerInterval = null;

    const timerCountDown = () => {
        if (timer > 0) {
            setTimer(timer - 1);
        } else {
            setTimer(20);
            moveToNextQuestion({ input, response: null });
        }
    }

    const moveToNextQuestion = (response) => {
        const updatedResponse = [...quizResponse, { quizQuestion, response }];
        setQuizResponse(updatedResponse);
        setQuizQuestion(generateRandomQuestions(numberRange, operatorTypes));
        localStorage.setItem(props.type, JSON.stringify(updatedResponse));
    }

    useEffect(() => {
        const savedResponse = localStorage.getItem(props.type)
        if (savedResponse && JSON.parse(savedResponse).length > 0) {
            setQuizResponse(JSON.parse(savedResponse));
            setTimer(20)
            setInput('');
            setStartQuiz(true);
        }
    }, []);

    useEffect(() => {
        if (startQuiz) {
            timerInterval = setInterval(() => timerCountDown(), 1000);
        } else {
            clearInterval(timerInterval);
        }

        return () => {
            clearInterval(timerInterval);
        }
    }, [startQuiz, timer])

    useEffect(() => {
        if (quizResponse.length === numberOfQuestions) {
            clearInterval(timerInterval);
        }
    }, [quizResponse])

    const handleStartQuiz = () => {
        if (numberOfQuestions <= 0) {
            return alert('Please enter valid number of questions');
        }
        if (numberRange <= 0) {
            return alert('Please enter valid test range');
        }
        if (operatorTypes.length === 0) {
            return alert('Please enter operator type');
        }
        setQuizQuestion(generateRandomQuestions(numberRange, operatorTypes));
        setInput('');
        setStartQuiz(true);
    }

    const handleResetQuiz = () => {
        setStartQuiz(false);
        setTimer(20);
        setQuizResponse([]);
        setInput('');
        localStorage.setItem(props.type, JSON.stringify([]));
    }

    const handleInput = (value) => {
        setInput(value);
    }

    const handleSubmit = () => {
        if (input === '') {
            return alert('Please enter valid input');
        }
        const evaluatedSolution = eval(quizQuestion);
        let response = false;
        if (parseFloat(evaluatedSolution).toFixed(1) === parseFloat(input).toFixed(1)) {
            response = true
        }
        moveToNextQuestion({ input, response });
        setInput('');
        setTimer(20);
    }

    const handleSetNumberRange = (value) => {
        setNumberRange(parseInt(value));
    }

    const handleNumberOfQuestions = (value) => {
        setNumberOfQuestions(parseInt(value))
    }

    const handleOperatorType = (type) => {
        if (operatorTypes.includes(type)) {
            const updateOperatorTypes = operatorTypes.filter(ot => ot !== type);
            setOperatorTypes(updateOperatorTypes);
        } else {
            setOperatorTypes([...operatorTypes, type]);
        }
    }

    return (
        <div className='quiz-container'>
            {!numberOfQuestions || quizResponse.length < numberOfQuestions ?
                <>
                    {
                        !startQuiz &&
                        <>
                            <div>
                                <label name='questions'>Please enter the number of questions</label>
                                <input
                                    type='number'
                                    placeholder='Input number of questions'
                                    value={numberOfQuestions}
                                    name='questions'
                                    onChange={(event) => handleNumberOfQuestions(event.target.value)}
                                />
                            </div>
                            <br />
                            <div>
                                <label name='range'>Please enter the range of random numbers</label>
                                <input
                                    type='number'
                                    placeholder='Input test range'
                                    value={numberRange}
                                    name='range'
                                    onChange={(event) => handleSetNumberRange(event.target.value)}
                                />
                            </div>
                            <br />
                            <label name='operator'>Please select the operator type for the test</label>
                            <span>
                                <input type='checkbox' checked={operatorTypes.includes('+')} onClick={() => handleOperatorType('+')} />+
                            </span>
                            <span>
                                <input type='checkbox' checked={operatorTypes.includes('-')} onClick={() => handleOperatorType('-')} />-
                            </span>
                            <span>
                                <input type='checkbox' checked={operatorTypes.includes('/')} onClick={() => handleOperatorType('/')} />/
                            </span>
                            <span>
                                <input type='checkbox' checked={operatorTypes.includes('*')} onClick={() => handleOperatorType('*')} />*
                            </span>
                        </>

                    }
                    <QuizMain
                        startQuiz={startQuiz}
                        timer={timer}
                        quizQuestion={quizQuestion}
                        input={input}
                        quizResponse={quizResponse}
                        numberOfQuestions={numberOfQuestions}
                        handleInput={handleInput}
                        handleSubmit={handleSubmit}
                        handleResetQuiz={handleResetQuiz}
                        handleStartQuiz={handleStartQuiz}
                    />
                </>
                :
                (
                    <QuizEnd
                        quizResponse={quizResponse}
                        startQuiz={startQuiz}
                        numberOfQuestions={numberOfQuestions}
                        handleResetQuiz={handleResetQuiz}
                    />
                )
            }
        </div>
    )
}

export default QuizContainer;