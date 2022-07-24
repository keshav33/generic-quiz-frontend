import React from 'react';

const QuizEnd = (props) => {
    const score = props.quizResponse.filter(quiz => quiz && quiz.response && quiz.response.response === true).length;
    return (
        <div>
            Quiz Over (Score: {score}/20)
            {props.quizResponse.map((quiz, index) => {
                return (
                    <div key={index}
                        className={quiz.response.response === true ? 'correct-answer' : 'wrong-answer'}
                    >
                        {quiz.quizQuestion} = {quiz.response.input}
                    </div>
                )
            })}
            {props.startQuiz &&
                <button
                    onClick={() => props.handleResetQuiz()}>
                    Reset Quiz
                </button>
            }
        </div>
    )
}

export default QuizEnd;