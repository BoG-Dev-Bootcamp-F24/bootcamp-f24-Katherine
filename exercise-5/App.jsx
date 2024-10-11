import React from 'react';
import './App.css'; 
import LinesPage from './pages/LinesPage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Train Schedule</h1>
      </header>
      <main>
        <LinesPage /> {/* make sure to add later... */}
      </main>
    </div>
  );
}

export default App;
