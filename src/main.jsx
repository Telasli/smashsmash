import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import MenuPage from './pages/MenuPage.jsx'
import LocationsPage from './pages/LocationsPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import FranchisePage from './pages/FranchisePage.jsx'
import BlogPage from './pages/BlogPage.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import './App.css'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout><App /></Layout>} />
        <Route path="/menu" element={<Layout><MenuPage /></Layout>} />
        <Route path="/restaurants" element={<Layout><LocationsPage /></Layout>} />
        <Route path="/notre-histoire" element={<Layout><AboutPage /></Layout>} />
        <Route path="/franchise" element={<Layout><FranchisePage /></Layout>} />
        <Route path="/blog" element={<Layout><BlogPage /></Layout>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
