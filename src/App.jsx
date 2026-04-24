import { useState } from 'react'
import Home from './Pages/Home/Home'
import NotFound from "./Components/NotFound/NotFound";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Miembros from './Pages/Miembros/Miembros';
import Admin from './Pages/Admin/Admin';
import { SiteProvider } from './Context/SiteContext';

function App() {

  return (
    <>
    <SiteProvider>
 <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/miembros" element={<Miembros />} />
                <Route path="/admin" element={<Admin /> } />
                <Route path="*" element={<NotFound />} />

            </Routes>
            <Footer />
        </Router>
        </SiteProvider>
    </>
  )
}

export default App
