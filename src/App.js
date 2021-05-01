import logo from './logo.svg';

import MultiSelect from './components/Multiselect/multiselect.component';

import './App.scss';

function App() {
  return (
    <div className="App">
      <div id="portal-wrapper"></div>
      <MultiSelect
        canSelectMultiple={true}
        displayKey="title"
      />
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
