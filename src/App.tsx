import logo from '/logo.svg'
import './App.css'

function App() {

  return (
    <>
      <div>
        <a style={{display: "none"}}  href="https://vitejs.dev" target="_blank">
          <img src={logo} className="logo" alt="Vite logo" />
        </a>
        <a target="_blank">
          <img src={logo} style={{width: "210px"}} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vuia Loft Apartments</h1>
      <div className="card">
        <p>
          The website is under construction <br />
          If you are eager to find out more about the appartments please contact us
        </p>
      </div>
      <p className="read-the-docs">
        Email: <a href="mailto:orsobrunoradauti@gmail.com?subject=Vuia%20Loft%20Apartments">orsobrunoradauti@gmail.com</a> <br />
        Phone: <a href="tel:+40749212221">+40 749 212 221</a>
      </p>
    </>
  )
}

export default App
