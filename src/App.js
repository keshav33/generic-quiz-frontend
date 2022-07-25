import React from 'react';
import QuizContainer from './Components/QuizContainer';
import './style.css';

function App() {
  return (
    <div style={{textAlign: 'center'}}>
      Please enter value to 1 decimal point only(Round off the value if any)
      <div className='app-container'>
        <QuizContainer type='first' />
        <QuizContainer type='second' />
      </div>
    </div>
  );
}

export default App;
