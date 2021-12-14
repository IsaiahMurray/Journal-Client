import React, { useState, useEffect } from 'react';
import './App.css';
import Auth from './components/Auth/Auth';
import Display from './components/Display';

function App() {
  const [sessionToken, setSessionToken] = useState(null); 
  const [loading, setLoading] = useState(false);
  useEffect(() => { 
    if(localStorage.getItem('token')){
      setSessionToken(localStorage.getItem('token'));
    }
    clearToken();
  }, [])

  const updateToken = (newToken) => { 
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
  }

  const clearToken = () => {
    localStorage.clear();
    setSessionToken(null);
  }

  const protectedViews = () => {

    return (sessionToken ? <Display updateToken={updateToken} clickLogout={clearToken} token={sessionToken}/>
    : <Auth updateToken={updateToken}/>)
  }
  return (
    <div className="App">
      <h1>Welcome to your Journal!</h1>
     {protectedViews()}
    </div>
  );
}

export default App;
