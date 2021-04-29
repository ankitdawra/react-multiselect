import ReactDOM from 'react-dom';
import logo from '../../logo.svg'

function LoaderElement() {
  return (
    <img src={logo} className="App-logo" alt="logo" />
  )
}

export default function Loader() {
  return ReactDOM.createPortal(<LoaderElement/>, document.getElementById('portal-wrapper'))
}