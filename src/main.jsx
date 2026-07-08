import { StrictMode, useLayoutEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import MenuPage from './pages/MenuPage.jsx'
import LocationsPage from './pages/LocationsPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import FranchisePage from './pages/FranchisePage.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import { EditableProvider } from './editable/EditableContext.jsx'
import AdminBar from './editable/AdminBar.jsx'
import './App.css'

// Le navigateur ne restaure pas le scroll : c'est nous qui le gerons.
if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useLayoutEffect(() => {
    // Reset INSTANTANE en haut a chaque changement de page.
    // On neutralise le `scroll-behavior: smooth` global le temps du saut,
    // sinon la nouvelle page remonte en defilement anime (effet "bug"
    // surtout depuis les liens du footer, cliques depuis le bas de page).
    const html = document.documentElement
    const prev = html.style.scrollBehavior
    html.style.scrollBehavior = 'auto'
    window.scrollTo(0, 0)
    html.style.scrollBehavior = prev
  }, [pathname])
  return null
}

function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <AdminBar />
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <EditableProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout><App /></Layout>} />
          <Route path="/menu" element={<Layout><MenuPage /></Layout>} />
          <Route path="/restaurants" element={<Layout><LocationsPage /></Layout>} />
          <Route path="/notre-histoire" element={<Layout><AboutPage /></Layout>} />
          <Route path="/franchise" element={<Layout><FranchisePage /></Layout>} />
        </Routes>
      </BrowserRouter>
    </EditableProvider>
  </StrictMode>,
)
