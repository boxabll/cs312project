import { useState } from 'react';
import Papa from 'papaparse';
import './App.css'; 
import PlanesBackground from './components/PlanesBackground';     

// api endpoint: https://l22jerki3k.execute-api.us-east-2.amazonaws.com/prod/evaluate
// pass csv data encoded in body of request
// query parameters:
// /evaluate?sensitive_column=<column_name>&index_column=<optional_index_col_name>

function App() {
  const [columnOptions, setColumnOptions] = useState([]);
  const [sensitiveColumn, setSensitiveColumn] = useState('');
  const [file, setFile] = useState([]);
  const [indexColumn, setIndexColumn] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submit form!');
    // Add form submission logic here
  };

  const handleUpload = () => {
    console.log('File uploaded!');
    const selectedFile = document.getElementById('datafile').files[0];
    setFile(selectedFile);

    Papa.parse(selectedFile, {
      complete: function (results) {
        setColumnOptions(results.data[0]);
      },
    });
  };

  const handleSensitiveColumnSelect = (event) => {
    setSensitiveColumn(event.target.value);
    console.log('Sensitive column updated!');
  };

  const handleIndexColumnSelect = (event) => {
    setIndexColumn(event.target.value);
    console.log('Index column updated!');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`app-container ${darkMode ? 'dark' : ''}`}>
      <PlanesBackground darkMode={darkMode} />
      <nav className="navbar">
        <h1 className="nav-title">Data Tool</h1>
        <div className="nav-links">
          <a className="nav-link" href="#home">Home</a>
          <a className="nav-link" href="#about">About</a>
          <button className="nav-link toggle-button" onClick={toggleDarkMode}>
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </nav>
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          <label className="label">
            Sensitive Column
            <select className="select" value={sensitiveColumn} onChange={handleSensitiveColumnSelect}>
              {columnOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label className="label">
            Index Column
            <select className="select" value={indexColumn} onChange={handleIndexColumnSelect}>
              {columnOptions
                .filter((option) => option !== sensitiveColumn)
                .map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              <option value="">None</option>
            </select>
          </label>
          <input className="file-input" id="datafile" type="file" onChange={handleUpload} />
          <input className="submit-button" type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
}

export default App;
