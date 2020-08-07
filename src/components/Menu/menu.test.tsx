import React from 'react';
import {render, RenderResult} from '@testing-library/react';

import Menu, {MenuProps} from '../Menu/menu';
import MenuItem, { MenuItemProps} from '../Menu/menuItem';

const testProps: MenuProps = {
  defaultIndex: 0, 
  onSelect: jest.fn(),
  className: 'test'
}

const generateMenu = (props) => {
  return (
    <Menu {...props}>
      <MenuItem index={111}>Menu0</MenuItem>
      <MenuItem disabled index={1222}>Menu1</MenuItem>
      <MenuItem index={2333}>Menu2</MenuItem>
    </Menu>
  )
}

let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement;
describe('test Menu', () => {
  beforeEach(() => {
    beforeEach(() => {
      wrapper = render(generateMenu(testProps))
      menuElement= wrapper.getByTestId('test-menu')
      activeElement = wrapper.getByText('active')
      disabledElement = wrapper.getByText('disabled')
    })
  })
  it('should render menu based on default props', () => {
    // expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('viking-menu test')
    expect(menuElement.querySelectorAll(':scope > li').length).toEqual(3)
    expect(activeElement).toHaveClass('menu-item is-active')
    expect(disabledElement).toHaveClass('menu-item is-disabled')
  })

})
