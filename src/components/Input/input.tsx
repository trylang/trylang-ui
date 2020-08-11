import React, { ReactElement, InputHTMLAttributes } from 'react';
import classNames from 'classnames';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import Icon from '../Icon/icon'


type InputSize = 'lg' | 'sm';

// 因为InputHTMLAttributes也有size属性且是number类型，与以下定义得size属性重合，且类型不同。
// 这时就需要使用Omit这个ts方法，忽略InputHTMLAttributes中size属性得影响。
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
  disabled?: boolean;
  size?: InputSize;
  icon?: IconProp;
  prepend?: string | ReactElement;
  append?: string | ReactElement;
}

export const Input:FC<InputProps> = (props) => {
  // 取出各种属性
  const { disabled, size, style, icon, prepend, append, ...restProps } = props;
  // 计算classNames
  const classnames = classNames('viking-input-wrapper', {
    [`input-size-${size}`]: size,
    'is-disabled': disabled,
    'input-group': prepend || append,
    'input-group-append': !!append,
    'input-group-preend': !!prepend,
  })


  // 根据属性判断需要添加什么样得节点
  return (
    <div className={classnames} style={style}>
      {prepend && <div className="viking-input-group-prepend">{prepend}</div>}
      {icon && <div className="icon-wrapper"><Icon icon={icon} title={`title-${icon}`}/></div>}
      <input 
        className="viking-input-inner"
        disabled={disabled}
        {...restProps}
      />
      {append && <div className="viking-input-group-append">{append}</div>}
    </div>
  )
}

