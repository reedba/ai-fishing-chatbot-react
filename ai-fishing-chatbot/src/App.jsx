import { useState } from 'react'
import './App.css'
import ChatBotInterface from './components/ChatBotInterface';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <h1>Welcome to AI Fishing Chatbot</h1>
      <ChatBotInterface />
    </>
  )
}

export default App
