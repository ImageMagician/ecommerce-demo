import './App.css'
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {

  return (
    <>
        <Header />
        <main className={`py-6 sm:py-16 px-6`}>
            <div className="max-w-7xl mx-auto">
                <Outlet />
            </div>
        </main>
        <Footer />
    </>
  )
}

export default App
