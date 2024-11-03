import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import styles from './Select.module.scss'


const Select = (
  {
    mainTitle,
    fieldTitle,
    items,
    isOpen,
    opener,
    setCity
  }
) => {
  const [used, setUsed] = useState([])
  let styleList = styles.list;
  if (!isOpen) {
    styleList = styles.closed
  }
  const filter = (array, element) => {
    const sorted = array.filter(item => item !== element)
    return sorted
  }

  const itemHandler = (itemText) => {
    if (!used.length > 0) {
      setCity && setCity([itemText])
      return setUsed([itemText])
    }

    if (used.includes(itemText)) {
      setCity && setCity(filter(used, itemText))
      return setUsed(filter(used, itemText))
    }
    setCity && setCity([...used, itemText])
    return setUsed([...used, itemText])
  }

  const findText = function (e) {
    const li = e.currentTarget
    const span = li.querySelector('span')
    itemHandler(span.innerText)
  }

  const arrowDir = isOpen ? styles.arrowUp : styles.arrow;
  return (
    <div className={styles.wrapper}>
      <h4 className={styles.title}>{mainTitle}</h4>
      <div onClick={() => {opener()}} className={styles.field}>
        <span className={styles.fieldTitle}>{fieldTitle}</span>
        <div className={arrowDir}>
          <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 1L7 7L1 1" stroke="#BFBFBF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div className={styleList}>
        {
          items && items.map((item) => (
            <div onClick={(e) => {itemHandler(e.target.innerText)}} className={styles.listItem}>
              {item}
            </div>
          ))
        }
      </div>
      </div>
      {used.length > 0 && 
        <div className={styles.chosenList}>
          {used.map((item) => (
            <div onClick={(e) => {findText(e)}} className={styles.chosenItem}>
              <span className={styles.chosenItemText}>{item}</span>
            </div>
          ))}
        </div>
      }
    </div>
  )
}

export default Select
