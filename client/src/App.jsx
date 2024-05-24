import { useState, useEffect } from 'react';
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
  const [file, setFile] = useState(null);
  const [fileEncoded, setFileEncoded] = useState(null);
  const [indexColumn, setIndexColumn] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const [kanon, setKanon] = useState();
  const [ldiverse, setLdiverse] = useState();

  useEffect(() => {
    if (file) {
      console.log(file);

      // Parse CSV to get column headers
      Papa.parse(file, {
        complete: function (results) {
          setColumnOptions(results.data[0]);
        },
      });

      const reader = new FileReader();
      reader.onload = () => {
        const text = reader.result;
        const encoded = btoa(text);
        setFileEncoded(encoded);
      };
      reader.readAsText(file);
    }
  }, [file]);

  useEffect(() => {
    if (fileEncoded) {
      console.log('file encoded:', fileEncoded);
    }
  }, [fileEncoded])

  useEffect(() => {
    if (kanon) {
      console.log("k anonymity: ", kanon)
    }
  }, [kanon])

  useEffect(() => {
    if (ldiverse) {
      console.log("l diversity: ", ldiverse)
    }
  }, [ldiverse])

  useEffect(() => {
    if (columnOptions) {
      setSensitiveColumn(columnOptions[0]);
    }
  }, [columnOptions])

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submit form!');

    const apiUrl = 'https://l22jerki3k.execute-api.us-east-2.amazonaws.com/prod/evaluate';
    console.log('params:', sensitiveColumn)
    const query = new URLSearchParams({
      sensitive_column: sensitiveColumn,
      index_column: indexColumn || 'None'
    }).toString();

    try {
      // Convert CSV data to a string
      // const csvDataString = file.text;
      // const csvDataString = 'hello' // will need to be changed, just placeholder to test whether lambda working  
      const requestBody = {
        csv_data: fileEncoded
      };

      const response = await fetch(`${apiUrl}?${query}`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      console.log('API Response:', responseData);

      setKanon(responseData.min_k_anonymity)
      setLdiverse(responseData.min_l_diversity)
    }
    catch (error) {
      console.error('Error:', error);
    }
  };

  const handleUpload = () => {
    console.log('File uploaded!');
    const selectedFile = document.getElementById('datafile').files[0];
    setFile(selectedFile);
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
      <div
        className="form-container results-wrapper"
      >
        <div className="form">
          <div className="data-row">
            <div className="label data-label">
              k-anonymity
            </div>
            <div className="data-value">
              {kanon ? kanon : "n/a"}
            </div>
          </div>
          <div className="data-row">
            <div className="label data-label">
              l-diversity
            </div>
            <div className="data-value">
              {ldiverse ? ldiverse : "n/a"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
