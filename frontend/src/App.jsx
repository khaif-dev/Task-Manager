import React from 'react';
import MainLayout from '@/components/Layouts/mainLayout';
import AllTasks from './pages/AllTasks';
import Completed from './pages/Completed';
import Starred from './pages/Starred';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <Router>
        <main>
          <Routes>
            <Route path='/' element={<MainLayout/>}>
              <Route index element={<AllTasks/>}/> 
              <Route path='/completed' element={<Completed/>}/> 
              <Route path='/starred' element={<Starred/>}/>       
            </Route>
          </Routes>
        </main>
      </Router>
    </div>
  )
}

export default App
