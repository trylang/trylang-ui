import React from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';

function App() {
  return (
    <div className="App">
      <header className="App- header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>

        <Menu defaultIndex={0} onSelect={(index) => {alert(index)}} data-testid="test-menu">
          <MenuItem index={111}>Menu0</MenuItem>
          <MenuItem index={1222}>Menu1</MenuItem>
          <MenuItem index={2333}>Menu2</MenuItem>
        </Menu>

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
