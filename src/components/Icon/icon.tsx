import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'


export interface IconProps extends FontAwesomeIconProps {
  theme?: string;
}

const Icon: React.FC<IconProps> = (props) => {
  const { theme, className, ...restProps } = props;
  const classes = classNames('viking-icon', className, {
    [`icon-${theme}`]: theme
  })

  return (
    <FontAwesomeIcon className={classes} {...restProps}/>
  )
}

export default Icon;
