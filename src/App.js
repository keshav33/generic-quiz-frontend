import React from 'react';
import QuizContainer from './Components/QuizContainer';
import './style.css';

function App() {
  return (
    <div style={{textAlign: 'center'}}>
      Please enter value to 1 decimal point only(Round off the value if any)
      <div className='app-container'>
        <QuizContainer type='left' />
        <QuizContainer type='right' />
      </div>
    </div>
  );
}

export default App;
