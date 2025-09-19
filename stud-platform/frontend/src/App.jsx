// frontend/src/App.jsx
import { useState } from 'react'
import Header from './components/Layout/Header'
import Sidebar from './components/Layout/Sidebar'
import MainContent from './components/Layout/MainContent'
import './App.css'

function App() {
  const [activePage, setActivePage] = useState('home')

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <div className="flex-1 flex flex-col ml-10">
        <Header />
        <MainContent activePage={activePage} />
      </div>
    </div>
  )
}

export default App