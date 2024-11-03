import React from 'react'
import styles from './Logo.module.scss'
import { useWindowWidth } from '../../hooks/useWindowWidth'
const Logo = () => {
  const width = useWindowWidth()
  const middle = width > 1100;
  return (
    <div className={styles.logo} onClick={() => console.log(width)}>
      <a href="#" className={styles.logoLink}>
        <svg  className={styles.iconContainer} width="79" height="77">
          <use xlinkHref="/logo.svg#logo-icon"></use>
        </svg>
        {middle && 
          <div className={styles.logoTextContainer}>
          <svg className={styles.logoText} width="265" height="40">
            <use xlinkHref="/logo.svg#logo-text"></use>
          </svg>
          <svg  className={styles.logoSubText}width="265" height="13">
            <use xlinkHref="/logo.svg#logo-sub-text"></use>
          </svg>
          </div>
        }
      </a>
    </div>
  )
}

export default Logo
