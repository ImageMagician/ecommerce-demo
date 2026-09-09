import './App.css'
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {

  return (
    <>
        <Header />
        <main className={`p-6`}>
            <div className="max-w-7xl mx-auto">
                <Outlet />
            </div>
        </main>
        <Footer />
    </>
  )
}

export default App
