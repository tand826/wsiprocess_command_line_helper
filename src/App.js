import React from 'react';
import './App.css';
import Card from './Card.js'

function App() {
  return (
      <div className="App-header">
        <div className="wsiprocess">
          <Card
            title="method"
            question="What method do you want to use?"
            choices="classification detection segmentation not-specific"
          />
        </div>
      </div>
  );
}

export default App;
