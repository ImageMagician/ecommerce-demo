import './App.css'
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from "./screens/HomeScreen";

function App() {

  return (
    <>
        <Header />
        <main className={`p-3`}>
            <div className="max-w-7xl mx-auto">
                <HomeScreen />
            </div>
        </main>
        <Footer />
    </>
  )
}

export default App
