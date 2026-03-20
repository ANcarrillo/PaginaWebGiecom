import { useState } from 'react'
import Home from './Pages/Home/Home'
import NotFound from "./Components/NotFound/NotFound";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {

  return (
    <>
      <Router>
          <Routes>  
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />

          </Routes>

      </Router>

    </>
  )
}

export default App
