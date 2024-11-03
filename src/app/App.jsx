import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import Checkbox from "../components/checkbox/index.jsx";
import Header from "../components/header/Header.jsx";
import Select from "../components/select/index.jsx";
import { cities, directions, englishCities, skills } from "../mocks/data.js";
import classes from "./app.module.scss";
function App() {
  const [candidates, setCandidates] = useState([]);
  const [cityApi, setCity] = useState([]);
  const [jobApi, setJobApi] = useState([]);
  const [skillApi, setSkillApi] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [openId, setId] = useState(null);

  const checkCityApi =
    cityApi &&
    cityApi
      .map((item) => `&city=${englishCities[item]}`)
      .join("")
      .slice(1);
  const checkJobApi = jobApi && jobApi.map((item) => `&job=${item}`).join("");
  const checkSkillApi =
    skillApi && skillApi.map((item) => `&language=${item}`).join("");

  const filterVoid =
    cityApi.length === 0 && jobApi.length === 0 && checkSkillApi.length === 0;

  const scrollHandler = (e) => {
    if (
      e.target.scrollHeight - (window.innerHeight + e.target.scrollTop) <
      200
    ) {
      setFetching(true);
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler, true);
    return function () {
      document.removeEventListener("scroll", scrollHandler, true);
    };
  }, []);

  const fetch = async function () {
    try {
      const result = await axios.get(
        `https://startrixapi.ru/api/v1/userdata/?${checkCityApi}${checkJobApi}${checkSkillApi}&page=${
          pageCount > 1 ? pageCount : 1
        }`
      );
      const data = result.data;
      const count = data.count;
      setTotalCount(count);
      if (!fetching && !filterVoid) {
        setCandidates([...data.results]);
      } else if (fetching && !filterVoid) {
        setCandidates([...candidates, ...data.results]);
        setFetching(false);
      } else if (!fetching && !filterVoid) {
        setCandidates([...candidates]);
      } else {
        setCandidates([]);
      }
    } catch {
      return console.log("mistake");
    }
  };
  const [access, setAccess] = useState(true);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    if (fetching && access) {
      setPageCount(pageCount + 1);
    }
  }, [fetching]);

  useEffect(() => {
    setAccess(totalCount > candidates.length);
  }, [candidates]);

  useEffect(() => {
    fetch();
  }, [pageCount]);

  useEffect(() => {
    setCandidates([]);
    if (pageCount > 1) {
      setPageCount(1);
    } else {
      fetch();
    }
  }, [cityApi, jobApi, skillApi]);

  const pressedMaker = () => {
    if (pressed) {
      setPressed(false);
    } else {
      setPressed(true);
    }
  };

  const location = useLocation();

  const useGradientMovement = () => {
    useEffect(() => {
      const elements = document.querySelectorAll(`.${classes.elements}`);
      elements.forEach((el) => {
        const randomX = Math.floor(Math.random() * 100);
        const randomY = Math.floor(Math.random() * 100);
        el.style.left = `${randomX}%`;
        el.style.top = `${randomY}%`;
      });
      const handleMouseMove = (event) => {
        elements.forEach((el) => {
          const speed = el.getAttribute("data-speed");
          const directionX = Math.random() < 0.5 ? -1 : 1;
          const directionY = Math.random() < 0.5 ? -1 : 1;
          const x =
            ((window.innerWidth - event.pageX * speed * 3) / 200) * directionX;
          const y =
            ((window.innerHeight - event.pageY * speed * 3) / 200) * directionY;
          el.style.transform = `translateX(${x}px) translateY(${y}px)`;
          el.style.transition = `transform 0.3s ease`;
        });
      };
      document.addEventListener("mousemove", handleMouseMove);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
      };
    }, [location]);
  };

  useGradientMovement();
  return (
    <div className={classes.root}>
      <div className={classes.adaptive}>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <main className={classes.main}>
                <div className={classes.promoBlock}>
                  <div
                    className={`${classes.gradientElement}  ${classes.elements} ${classes.elements} ${classes.pinkGradient}`}
                    id="element1"
                    data-speed="4"
                  ></div>
                  <div
                    className={`${classes.gradientElement}  ${classes.elements} ${classes.blueGradient}`}
                    id="element2"
                    data-speed="10"
                  ></div>
                  <div
                    className={`${classes.gradientElement}  ${classes.elements} ${classes.pinkGradient}`}
                    id="element5"
                    data-speed="15"
                  ></div>
                  <div
                    className={`${classes.gradientElement}  ${classes.elements} ${classes.pinkGradient}`}
                    id="element7"
                    data-speed="15"
                  ></div>
                  <div
                    className={`${classes.gradientElement}  ${classes.elements} ${classes.blueGradient}`}
                    id="element100"
                   data-speed="2"
                  ></div>
                  <div
                    className={`${classes.cloud}  ${classes.elements} `}
                    id="element41"
                   data-speed="2"
                  >
                    фронтенд
                  </div>
                  <div
                    className={`${classes.cloud}  ${classes.elements}  `}
                    id="element23"
                    data-speed="4"
                  >
                    фулстек
                  </div>
                  <div
                    className={`${classes.cloud}  ${classes.elements} `}
                    id="element9"
                    data-speed="4"
                  >
                    бэкенд
                  </div>
                  <div
                    className={`${classes.cloud}  ${classes.elements}  `}
                    id="element6"
                    data-speed="4"
                  >
                    аналитика
                  </div>
                  <div
                    className={`${classes.cloud}  ${classes.elements} `}
                    id="element9"
                    data-speed="2"
                  >
                    девопс
                  </div>
                  <div
                    className={`${classes.cloud}  ${classes.elements}  `}
                    id="element6"
                    data-speed="2"
                  >
                    дизайн
                  </div>
                  <div
                    className={`${classes.cloud}  ${classes.elements} `}
                    id="element41"
                   data-speed="2"
                  >
                    бэкенд                  </div>
                  <div
                    className={`${classes.cloud}  ${classes.elements}  `}
                    id="element23"
                    data-speed="4"
                  >
                    тестирование
                  </div>
                  <div className={classes.promoContainer}>
                    <h1 className={classes.promoTitle}>
                      Мы нашли вам <br></br>идеальных кандидатов <br></br> в IT
                    </h1>
                    <Link to={"./candidates"}>
                      <button className={classes.promoButton}>
                        <span> Нанять специалиста</span>
                      </button>
                    </Link>
                  </div>
                  {/* Add more elements as needed */}
                </div>
              </main>
            }
          />
          <Route
            path="/candidates"
            element={
              <main className={classes.main}>
                {openId !== null && (
                  <div
                    className={classes.propagation}
                    onClick={() => setId(null)}
                  ></div>
                )}
                <div className={classes.wrapper}>
                  <div className={classes.first}>
                    <Select
                      mainTitle={"Города"}
                      fieldTitle={"Выбрать город"}
                      items={cities}
                      isOpen={openId === 1}
                      opener={() => (1 === openId ? setId(null) : setId(1))}
                      citiesList={cityApi}
                      setCity={(e) => setCity([...e])}
                    />
                    <Select
                      mainTitle={"Сфера"}
                      fieldTitle={"Выбрать направление"}
                      items={directions}
                      isOpen={openId === 2}
                      opener={() => (2 === openId ? setId(null) : setId(2))}
                      setCity={(e) => setJobApi([...e])}
                    />
                    <Checkbox />
                    <Select
                      mainTitle={"Навыки"}
                      fieldTitle={"Выбрать навыки"}
                      items={skills}
                      isOpen={openId === 3}
                      opener={() => (3 === openId ? setId(null) : setId(3))}
                      setCity={(e) => setSkillApi([...e])}
                    />
                    {/* <Button onClick={() => pressedMaker()} variant={buttonVariants.PRIMARY} text={"Подобрать кандидатов"}/> */}
                  </div>
                  <div className={classes.second}>
                    {(candidates.length > 0 &&
                      candidates.map((post) => {
                        return (
                          <div className={classes.secondPost}>
                            <img
                              className={classes.secondPhoto}
                              width="68"
                              height="68"
                              src={post.image_url}
                            ></img>
                            <div className={classes.secondList}>
                              <p className={classes.secondTitle}>
                                {post.first_name} {post.last_name}
                              </p>
                              <div className={classes.secondPlace}>
                                {post.country} {post.city}
                              </div>
                              <div>{post.jobtitle}</div>
                              <div className={classes.secondSkills}>
                                {post.programming_languages.map((item) => {
                                  return (
                                    <span className={classes.secondSkill}>
                                      {item}
                                    </span>
                                  );
                                })}
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                From: {post.source} <br></br>
                                Contacts:
                                {post.contacts.length > 0 &&
                                  post.contacts.map((item, index) => {
                                    return (
                                      <a
                                        href={item}
                                        key={index}
                                        style={{ wordWrap: "break-word" }}
                                        target="_blank"
                                        rel="noreferrer"
                                      >
                                        {item.split(",").join(" ")}
                                      </a>
                                    );
                                  })}
                              </div>
                              <div>{post.experience_month}</div>
                            </div>
                          </div>
                        );
                      })) ||
                      (filterVoid && (
                        <p
                          style={{ textAlign: "center", padding: "20px" }}
                          className={classes.secondTitle}
                        >
                          Выберите фильтры, чтобы подобрать нужных кандидатов
                        </p>
                      ))}
                  </div>
                </div>
              </main>
            }
          />
          {/* <Route path="/contact" element={<Contact />} /> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
