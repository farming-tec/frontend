// IMPORTANT -> Do not edit this file, unless for advanced use
import React from 'react';
import ReactDOM from 'react-dom';
import App from '@src/App'

// Import base styles
import './index.css';

// Render main Component
ReactDOM.render(<App />, document.getElementById('root'));

document.addEventListener("DOMContentLoaded", ()=> {
  console.info("Entrypoint Loaded Ok")
});