import './App.css'
import Header from './components/Header';
import Footer from './components/Footer';

function App() {

  return (
    <>
        <Header />
        <main className={`p-3`}>
            <div className="max-w-7xl mx-auto">
                <h1>Welcome to ProShop.</h1>
            </div>
        </main>
        <Footer />
    </>
  )
}

export default App
