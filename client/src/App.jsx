import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [columnOptions, setColumnOptions] = useState([]);
  const [sensitiveColumn, setSensitiveColumn] = useState("");
  const [indexColumn, setIndexColumn] = useState("");

  const handleSubmit = () => {
    console.log("Submit form!")
  }

  const handleUpload = () => {
    console.log("File uploaded!")
    // encode file
    // updates column Options
  }

  const handleSensitiveColumnSelect = () => {
    console.log("Sensitive column updated!")
  }


  const handleIndexColumnSelect = () => {
    console.log("Index column updated!")
  }

  return (
    <div>
      <form className="tool-form" onSubmit={handleSubmit}>
        <label>
          Sensitive Column
          <select value={sensitiveColumn} onChange={handleSensitiveColumnSelect}>
            {columnOptions.map(option => <option value={option}>{option}</option>)}
          </select>
        </label>
        <label>
          Index Column
          <select value={indexColumn} onChange={handleIndexColumnSelect}>
            {columnOptions.filter(option => option != sensitiveColumn).map(option => <option value={option}>{option}</option>)}
          </select>
        </label>
        <input type="file" onChange={handleUpload} />
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default App
