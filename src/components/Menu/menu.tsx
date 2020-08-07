
// createContext 父子组件透传属性值
import React, {createContext, useState} from 'react';
import classNames from 'classnames';
import { MenuItemProps } from './menuItem';

// 字面量定义
type MenuMode = 'horizontal' | 'vertical';
type SelectCallback =  (selectedIndex: string) => void;

// 定义context IMenuContext
interface IMenuContext {
  index: string;
  onSelect?: SelectCallback;
  mode?: MenuMode;
  defaultOpenSubMenus?: string[];
}

// 定义传入Menu字段
export interface MenuProps {
  defaultIndex?: string;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: SelectCallback;
  defaultOpenSubMenus?: string[];
}

// {index: 0} 初始值
export const MenuContext = createContext<IMenuContext>({index: '0'});

// 组件：返回组件类型《传入参数类型 》 
const Menu: React.FC<MenuProps> = (props) => {
  const { className, mode, style, children, defaultIndex, onSelect, defaultOpenSubMenus } = props;
  const [currentActive, setActive] = useState(defaultIndex);
  const classes = classNames('viking-menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical'
  })
  const handleClick = (index: string) => {
    setActive(index); // 为了子组件中is-active属性的变更
    if (onSelect) {
      onSelect(index)
    }
  }
  const passedContext: IMenuContext = {
    index: currentActive || '0',
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus
  }

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      // reactnode有一堆类型，想要拿到display类型，需要做类型断言，转成function component实例
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElement.type;
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        // cloneElement 方法用于去除写在menuItem组件上的index属性，cloneElement（第一个是要赋值的属性，第二个是新增属性）
        return React.cloneElement(childElement, {
          index: index.toString()
        });
      } else {
        console.error('warning: Nemu has a child which is not a MenuItem compenent');
      }
    })
  }
  return (
    <ul className={classes} style={style}>
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}

// 默认值一定要加，一为了代码健壮性；
// 二、defaultOpenSubMenus如果不设默认值且在代码中没有使用，直接报undefined，即便后面做了类型断言也无用，还是会报错
Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
  defaultOpenSubMenus: []
}

export default Menu;