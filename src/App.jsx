import './App.css'
import Header from './components/Header/Header'
import mainScreenImg from '/main screen img.png'
function App() {

  return (
    <>
    <div className="wrap">
    <Header />
    <div className="mainScreen">
       <div className="mainScreenDecoration"></div>
       <img src={mainScreenImg} alt="mainScreenImg" className='mainScreenImg' />
    </div>
    </div>
    </>
  )
}

export default App
