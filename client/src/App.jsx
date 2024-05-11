import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Papa from 'papaparse'

// api endpoint: https://l22jerki3k.execute-api.us-east-2.amazonaws.com/prod/evaluate
// pass csv data encoded in body of request
// query parameters:
// /evaluate?sensitive_column=<column_name>&index_column=<optional_index_col_name>

function App() {

  const [columnOptions, setColumnOptions] = useState([]);
  const [sensitiveColumn, setSensitiveColumn] = useState("");
  const [file, setFile] = useState([]);
  const [indexColumn, setIndexColumn] = useState("");

  const handleSubmit = () => {
    console.log("Submit form!")
  }

  const handleUpload = () => {
    console.log("File uploaded!")
    const selectedFile = document.getElementById("datafile").files[0];
    setFile(selectedFile)

    Papa.parse(selectedFile, {
      complete: function(results) {
        setColumnOptions(results.data[0])
      }
    });

    // encode file
    // updates column Options
  }

  const handleSensitiveColumnSelect = (event) => {
    setSensitiveColumn(event.target.value)
    console.log("Sensitive column updated!")
  }


  const handleIndexColumnSelect = (event) => {
    setIndexColumn(event.target.value)
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
            <option value="">None</option>
          </select>
        </label>
        <input id="datafile" type="file" onChange={handleUpload} />
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default App
