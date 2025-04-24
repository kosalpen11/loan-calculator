import React from 'react';
import './App.css';
import LoanCalculator from './components/LoanCalculator';

function App() {
  return (
    <div className="App">
      <header style={{ marginBottom: '32px', padding: '16px' }}>
        <h1 style={{ 
          fontSize: '28px', 
          fontWeight: 'bold', 
          textAlign: 'center', 
          color: '#1f2937' 
        }}>
          Bank Loan Repayment Calculator
        </h1>
      </header>
      <main style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '0 16px' 
      }}>
        <LoanCalculator />
      </main>
    </div>
  );
}

export default App;