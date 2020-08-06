import React from 'react';
import classNames from 'classnames';

export enum ButtonSize {
  Large = 'lg',
  Small = 'sm'
}

export enum ButtonType {
  Primary = 'primary',
  Default = 'default',
  Danger = 'danger',
  Link = 'link'
}

interface BaseButtonProps {
   className?: string;
   disabled?: boolean;
   size?: ButtonSize;
   btnType?: ButtonType;
   children: React.ReactNode;
   href?: string;
}

// type: 类型别名，ts通过type关键字对比较长得类型重命名
// AnchorHTMLAttributes: a链接属性
// & ： 交叉类型，A & B具备 A和B的所有属性
// Partial：所有属性都是可选项
// ButtonProps 为的是用户可以自由给Button添加属性
type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>;
type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

const Button: React.FunctionComponent<ButtonProps> = (props) => {
  const {btnType, className, disabled, size, children, href, ...restProps} = props;
  // btn, btn-lg, btn-primary
  const classes = classNames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    'disabled': (btnType === ButtonType.Link && href) && disabled
  })

  if (btnType === ButtonType.Link && href) {
    return (
    <a href={href} className={classes} {...restProps}>{children}</a>
    )
  } else {
    return (
    <button className={classes} disabled={disabled} {...restProps}>{children}</button>
    )
  }
}

Button.defaultProps = {
  disabled: false,
  btnType: ButtonType.Default
}

export default Button;