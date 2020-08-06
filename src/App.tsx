import React from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button/button';

function App() {
  return (
    <div className="App">
      <header className="App- header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large} onClick={(e)=>{e.preventDefault(); alert(123)}}>Hello</Button>
        <Button btnType={ButtonType.Danger} size={ButtonSize.Small} disabled>Hello</Button>
        <Button btnType={ButtonType.Link} size={ButtonSize.Small} href="http://baidu.com" disabled>Hello</Button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
