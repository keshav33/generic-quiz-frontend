import React from 'react';

const QuizMain = (props) => {
    return (
        <div>
            {props.startQuiz &&
                <>
                    <div>
                        Question number: {props.quizResponse.length + 1}/{props.numberOfQuestions}
                    </div>
                    <div>
                        Time Left: {props.timer}
                    </div>
                    <div>
                        Question: {props.quizQuestion}
                    </div>
                    <input
                        type='number'
                        value={props.input}
                        onChange={(event) => props.handleInput(event.target.value)}
                    />
                    <button
                        onClick={() => props.handleSubmit()}
                    >
                        Next
                    </button>
                    <button
                        onClick={() => props.handleResetQuiz()}>
                        Reset Quiz
                    </button>
                </>
            }
            {!props.startQuiz &&
                <button onClick={() => props.handleStartQuiz()}>
                    Start Quiz
                </button>
            }
        </div>
    )
}

export default QuizMain;