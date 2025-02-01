import React from 'react';
import classes from '../../app/app.module.scss';
import { Link } from 'react-router-dom';
const Landing = () => {
  return (
    <>
      <div className={classes.promoBlock}>
        <div className={`${classes.gradientElement}  ${classes.elements} ${classes.elements} ${classes.pinkGradient}`} id="element1" data-speed="4"></div>
        <div className={`${classes.gradientElement}  ${classes.elements} ${classes.blueGradient}`} id="element2" data-speed="1"></div>
        <div className={`${classes.gradientElement}  ${classes.elements} ${classes.pinkGradient}`} id="element5" data-speed="1"></div>
        <div className={`${classes.gradientElement}  ${classes.elements} ${classes.pinkGradient}`} id="element7" data-speed="1"></div>
        <div className={`${classes.gradientElement}  ${classes.elements} ${classes.blueGradient}`} id="element100" data-speed="2"></div>
        <div className={`${classes.cloud}  ${classes.elements} `} id="element41" data-speed="20">
          фронтенд
        </div>
        <div className={`${classes.cloud}  ${classes.elements}  `} id="element23" data-speed="20">
          фулстек
        </div>
        <div className={`${classes.cloud}  ${classes.elements} `} id="element9" data-speed="20">
          бэкенд
        </div>
        <div className={`${classes.cloud}  ${classes.elements}  `} id="element6" data-speed="20">
          аналитика
        </div>
        <div className={`${classes.cloud}  ${classes.elements} `} id="element9" data-speed="20">
          девопс
        </div>
        <div className={`${classes.cloud}  ${classes.elements}  `} id="element6" data-speed="20">
          дизайн
        </div>
        <div className={`${classes.cloud}  ${classes.elements} `} id="element41" data-speed="20">
          бэкенд{' '}
        </div>
        <div className={`${classes.cloud}  ${classes.elements}  `} id="element23" data-speed="20">
          тестирование
        </div>
        <div className={classes.promoContainer}>
          <h1 className={classes.promoTitle}>
            Мы нашли вам <br></br>идеальных кандидатов <br></br> в IT
          </h1>
          <Link to={'./candidates'}>
            <button className={classes.promoButton}>
              <span> Нанять специалиста</span>
            </button>
          </Link>
        </div>
        {/* Add more elements as needed */}
      </div>
    </>
  );
};

export default Landing;
