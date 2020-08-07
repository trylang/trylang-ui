
// createContext 父子组件透传属性值
import React, {createContext, useState} from 'react';
import classNames from 'classnames';

// 字面量定义
type MenuMode = 'horizontal' | 'vertical';
type SelectCallback =  (selectedIndex: number) => void;

// 定义context IMenuContext
interface IMenuContext {
  index: number;
  onSelect?: SelectCallback;
}

// 定义传入Menu字段
export interface MenuProps {
  defaultIndex?: number;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: SelectCallback;
}

// {index: 0} 初始值
export const MenuContext = createContext<IMenuContext>({index: 0});

// 组件：返回组件类型《传入参数类型 》 
const Menu: React.FC<MenuProps> = (props) => {
  const { className, mode, style, children, defaultIndex, onSelect } = props;
  const [currentActive, setActive] = useState(defaultIndex);
  const classes = classNames('viking-munu', className, {
    'menu-vertical': mode === 'vertical'
  })
  const handleClick = (index: number) => {
    setActive(index); // 为了子组件中is-active属性的变更
    if (onSelect) {
      onSelect(index)
    }
  }
  const passedContext: IMenuContext = {
    index: currentActive || 0,
    onSelect: handleClick
  }
  return (
    <ul className={classes} style={style}>
      <MenuContext.Provider value={passedContext}>
        {children}
      </MenuContext.Provider>
    </ul>
  )
}

 

export default Menu;