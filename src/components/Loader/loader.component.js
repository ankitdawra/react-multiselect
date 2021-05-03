import ReactDOM from 'react-dom';
import logo from '../../logo.svg'

function LoaderElement() {
  return (
    <div className="text-center">
      <img src={logo} className="App-logo" alt="logo" height="100"/>
    </div>
  )
}

export default function Loader() {
  const ele = document.getElementById('portal-wrapper');
  if (!ele) {
    return null;
  }
  return ReactDOM.createPortal(<LoaderElement/>, document.getElementById('portal-wrapper'))
}