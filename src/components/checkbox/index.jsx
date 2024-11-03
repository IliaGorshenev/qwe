import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import styles from './Checkbox.module.scss'


const Checkbox = () => {
  return (
    <div className={styles.wrapper}>
      <h4 className={styles.title}>Уровень</h4>
      <div className={styles.field}>
        <div className={styles.item}>
          <label>
            <input value="Junior" type='checkbox' className={styles.input}></input>
            <div className={styles.itemWrapper}>
              <div className={styles.checkbox}>
                <svg className={styles.icon} width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.5 1.38271L5.49999 12.6173L0.99999 7.13255" stroke="#919191" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <span className={styles.fieldText}>Junior</span>
            </div>
          </label>   
        </div>
        <div className={styles.item}>
          <label>
            <input value="Middle" type='checkbox' className={styles.input}></input>
            <div className={styles.itemWrapper}>
              <div className={styles.checkbox}>
                <svg className={styles.icon} width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.5 1.38271L5.49999 12.6173L0.99999 7.13255" stroke="#919191" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <span className={styles.fieldText}>Middle</span>
            </div>
          </label>
        </div>
        <div className={styles.item}>
          <label>
            <input value="Senior" type='checkbox' className={styles.input}></input>
            <div className={styles.itemWrapper}>
              <div className={styles.checkbox}>
                <svg className={styles.icon} width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.5 1.38271L5.49999 12.6173L0.99999 7.13255" stroke="#919191" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <span className={styles.fieldText}>Senior</span>
            </div>
          </label>
        </div>
      </div>
    </div>
  )
}

export default Checkbox
