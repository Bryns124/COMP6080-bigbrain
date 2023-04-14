import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';
import Wrapper from './Wrapper'
// import bodyStyle from './/styles/dashboard.css'
function App () {
  return (
    <Router>
      <Wrapper/>
    </Router>
  );
}

export default App;
