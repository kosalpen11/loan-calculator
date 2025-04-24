import React, { useState, useEffect, useCallback } from 'react';
import './LoanCalculator.css';

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(10000);
  const [loanTenor, setLoanTenor] = useState(12);
  const [interestRate, setInterestRate] = useState(5);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  // Use useCallback to memoize the calculation function
  // Calculate monthly payment using the formula: PMT = P * (r(1+r)^n)/((1+r)^n-1)
  // Where: P = Principal, r = monthly interest rate, n = number of months
  const calculateMonthlyPayment = useCallback(() => {
    const monthlyRate = (interestRate / 100) / 12;
    const numberOfPayments = loanTenor;
    
    const monthlyPayment = loanAmount * 
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    return isNaN(monthlyPayment) || !isFinite(monthlyPayment) ? 0 : monthlyPayment;
  }, [loanAmount, loanTenor, interestRate]);

  useEffect(() => {
    setMonthlyPayment(calculateMonthlyPayment());
  }, [calculateMonthlyPayment]);

  return (
    <div className="modern-calculator">
      <div className="calculator-header">
        <h2>Loan Repayment Calculator</h2>
        <p>Simulate your loan repayment plan</p>
      </div>
      
      <div className="calculator-body">
        <div className="form-section">
          <div className="input-group">
            <label htmlFor="loanAmount">
              Loan Amount
              <div className="value-display">${loanAmount.toLocaleString()}</div>
            </label>
            <div className="slider-container">
              <input
                type="range"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                min="1000"
                max="1000000"
                step="1000"
                className="modern-slider"
              />
              <div className="range-labels">
                <span>$1,000</span>
                <span>$1,000,000</span>
              </div>
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="loanTenor">
              Loan Term
              <div className="value-display">{loanTenor} months{loanTenor >= 12 ? ` (${(loanTenor / 12).toFixed(1)} years)` : ''}</div>
            </label>
            <div className="slider-container">
              <input
                type="range"
                value={loanTenor}
                onChange={(e) => setLoanTenor(Number(e.target.value))}
                min="1"
                max="360"
                step="1"
                className="modern-slider"
              />
              <div className="range-labels">
                <span>1 mo</span>
                <span>30 yrs</span>
              </div>
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="interestRate">
              Annual Interest Rate
              <div className="value-display">{interestRate}%</div>
            </label>
            <div className="slider-container">
              <input
                type="range"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                min="0"
                max="30"
                step="0.1"
                className="modern-slider"
              />
              <div className="range-labels">
                <span>0%</span>
                <span>30%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="results-section">
          <div className="monthly-payment">
            <span className="result-label">Monthly Payment</span>
            <span className="result-value">${monthlyPayment.toFixed(2)}</span>
          </div>
          
          <div className="summary-stats">
            <div className="stat-item">
              <span className="stat-label">Total Principal</span>
              <span className="stat-value">${loanAmount.toLocaleString()}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Total Interest</span>
              <span className="stat-value">${(monthlyPayment * loanTenor - loanAmount).toFixed(2)}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Total Repayment</span>
              <span className="stat-value">${(monthlyPayment * loanTenor).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanCalculator;