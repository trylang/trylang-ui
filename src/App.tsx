import React from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';

function App() {
  return (
    <div className="App">
      <header className="App- header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>

        <Menu defaultIndex={'0'} onSelect={(index) => {console.log(index)}} mode="vertical" defaultOpenSubMenus={['2']} data-testid="test-menu">
          <MenuItem>Menu0</MenuItem>
          <MenuItem>Menu1</MenuItem>
          <SubMenu title="dropdown">
            <MenuItem>Menu2</MenuItem>
            <MenuItem>Menu3</MenuItem>
          </SubMenu>
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
