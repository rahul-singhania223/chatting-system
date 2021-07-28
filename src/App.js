import { useState } from 'react';
import './App.css';
import ChatSystem from './components/ChatSystem';
import SignupForm from './components/SignupForm';


function App() {

  const [isActive, setActive] = useState(false);
  const [email, setEmail] = useState('');

  const setActivity = (email) => {
    setActive(true);
    setEmail(email)
  }

  if(isActive) {
    return (
      <div className="App">
        <ChatSystem loginId={email ? email : null} />
      </div>
    );
  } else {
    return (
      <div className='App'>
        <SignupForm setActive={setActivity} />
      </div>
    )
  }

  
}

export default App;
