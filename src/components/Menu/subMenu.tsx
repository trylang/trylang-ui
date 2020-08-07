import React, { useState, useContext, FunctionComponentElement } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';
import { MenuItemProps } from './menuItem';

export interface SubMenuProps {
  index?: string;
  title: string;
  className?: string;
}

const SubMenu: React.FC<SubMenuProps> = ({index, title, className, children}) => {
  const context = useContext(MenuContext);
  // 因为context.defaultOpenSubMenus 是可选，默认类型为字符串数组+undefined。
  // 我们不需要undefined，所以用到类型断言，指定为字符串数组类型
  index = index as string;
  const defaultOpenSubMenus = context.defaultOpenSubMenus as Array<string>;
  console.log(defaultOpenSubMenus)
  console.log(index, defaultOpenSubMenus.includes(index) );
  let isOpened = (index && context.mode === 'vertical') ? defaultOpenSubMenus.includes(index) : false;
  const [menuOpen, setOpen] = useState(isOpened);

  const classes = classNames('menu-item submenu-item', className, {
    'is-active': context.index === index
  })
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(!menuOpen);
  }

  // 在水平方向可以hover显示下拉框，设置定时器为了滑动体验平滑
  let timer: any;
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer);
    e.preventDefault();
    timer = setTimeout(() => {
      setOpen(toggle);
    }, 300)
  }

  const clickEvents = context.mode === 'vertical' ? {
    onClick: handleClick
  } : {};

  const hoverEvents = context.mode !== 'vertical' ? {
    onMouseEnter: (e: React.MouseEvent) => {handleMouse(e, true)},
    onMouseLeave: (e: React.MouseEvent) => {handleMouse(e, false)}
  }: {}

  // 为了更好监控menuItem里的节点，避免不是menuitem的节点混入，所以需要遍历children 
  const renderChildren = () => {
    const subMenuClasses = classNames('viking-submenu', {
      'menu-opened': menuOpen
    });
    const childrenCompoent = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>;
      if (childElement.type.displayName === 'MenuItem') {
        return React.cloneElement(childElement, {
          index: `${index}-${i}`
        })
      } else {
        console.error('warning: SubNemu has a child which is not a MenuItem compenent');
      }
    })

    return (
      <ul className={subMenuClasses}>
        {childrenCompoent}
      </ul>
    )
  }
  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className="submenu-title" {...clickEvents}>{title}</div>
      {renderChildren()}
    </li>
  )
  
}

SubMenu.displayName = 'SubMenu';
export default SubMenu;