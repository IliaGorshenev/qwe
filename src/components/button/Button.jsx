import React from 'react'
import cn from 'classnames'
import styles from './Button.module.scss'

export const buttonVariants = {
  PRIMARY: "primary",
  SECONDARY: "secondary"
}

const Button = (
  {
    variant, 
    text,
    className,
    onClick
  }
  ) => {
  const buttonClassName = cn(
    styles.button,
    {
      [styles.primary]: variant === buttonVariants.PRIMARY,
      [styles.secondary]: variant === buttonVariants.SECONDARY,
    },
    className
  )

  return (
    <button onClick={onClick} className={buttonClassName}>
      <span className={styles.text}>{text}</span>
    </button>
  )
}

export default Button
