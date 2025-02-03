import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { PostService } from '../api/api.js';
import AuthorisationPage from '../components/authorisation';
import Header from '../components/header/Header.jsx';
import Landing from '../components/landing/landing.jsx';
import LoginPage from '../components/login';
import Select from '../components/select/index.jsx';
import { AuthProvider, useAuth } from '../context/AuthContext.js';
import { skills } from '../mocks/data.js';
import classes from './app.module.scss';

const postService = new PostService();

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

function App() {
  const [candidates, setCandidates] = useState([]);
  const [cityApi, setCity] = useState([]);
  const [jobApi, setJobApi] = useState([]);
  const [skillApi, setSkillApi] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [openId, setId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // const checkCityApi =
  //   cityApi &&
  //   cityApi
  //     .map((item) => `&city=${englishCities[item]}`)
  //     .join('')
  //     .slice(1);
  // const checkJobApi = jobApi && jobApi.map((item) => `&job=${item}`).join('');
  // const checkSkillApi = skillApi && skillApi.map((item) => `&language=${item}`).join('');

  // const filterVoid = cityApi.length === 0 && jobApi.length === 0 && checkSkillApi.length === 0;

  const scrollHandler = (e) => {
    if (e.target.scrollHeight - (window.innerHeight + e.target.scrollTop) < 200) {
      setFetching(true);
    }
  };

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler, true);
    return function () {
      document.removeEventListener('scroll', scrollHandler, true);
    };
  }, []);

  const fetch = async function () {
    // try {
    //   const result = await axios.get(`https://startrixapi.ru/api/v1/userdata/?${checkCityApi}${checkJobApi}${checkSkillApi}&page=${pageCount > 1 ? pageCount : 1}`);
    //   const data = result.data;
    //   const count = data.count;
    //   setTotalCount(count);
    //   if (!fetching && !filterVoid) {
    //     setCandidates([...data.results]);
    //   } else if (fetching && !filterVoid) {
    //     setCandidates([...candidates, ...data.results]);
    //     setFetching(false);
    //   } else if (!fetching && !filterVoid) {
    //     setCandidates([...candidates]);
    //   } else {
    //     setCandidates([]);
    //   }
    // } catch {
    //   return console.log('mistake');
    // }
  };

  const fetchData = async function () {
    try {
      const result = await axios.get(`http://localhost:3001/users`);
      const data = result.data;
      setCandidates([...data]);
    } catch {
      return console.log('mistake');
    }
  };

  const [access, setAccess] = useState(true);
  const [pressed, setPressed] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState([]);

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
    fetchData();
  }, [pageCount]);

  useEffect(() => {
    setCandidates([]);
    if (pageCount > 1) {
      setPageCount(1);
    } else {
      fetch();
    }
  }, [cityApi, jobApi, skillApi]);

  const filterCandidatesByLanguages = (candidates, selectedLanguages) => {
    if (selectedLanguages.length === 0) return candidates;
    return candidates.filter((candidate) => selectedLanguages.every((lang) => candidate.languages.hasOwnProperty(lang)));
  };

  const pressedMaker = () => {
    if (pressed) {
      setPressed(false);
    } else {
      setPressed(true);
    }
  };

  const location = useLocation();

  const useGradientMovement = () => {
    const location = useLocation();

    useEffect(() => {
      if (location.pathname !== '/') return;

      const elements = document.querySelectorAll(`.${classes.gradientElement}`);
      const elements2 = document.querySelectorAll(`.${classes.element}`);
      elements2.forEach((el) => {
        const randomX = Math.floor(Math.random() * 100);
        const randomY = Math.floor(Math.random() * 100);
        el.style.left = `${randomX}%`;
        el.style.top = `${randomY}%`;
      });

      const handleMouseMove = (event) => {
        elements2.forEach((el) => {
          const speed = el.getAttribute('data-speed');
          const x = (window.innerWidth / 2 - event.pageX) / speed;
          const y = (window.innerHeight / 2 - event.pageY) / speed;
          el.style.transform = `translate(${x}px, ${y}px)`;
          el.style.transition = `transform 0.3s ease`;
        });
      };

      document.addEventListener('mousemove', handleMouseMove);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
      };
    }, [location]);
  };

  useGradientMovement();
  // http://http://localhost:3001/users
  const fetchCandidates = async () => {
    setIsLoading(true);
    try {
      const queryParams = selectedLanguages.length > 0 ? `?languages=${selectedLanguages.join(',')}` : '';
      const response = await axios.get(`http://79.174.95.157:3001/users${queryParams}`);
      setCandidates(response.data);
    } catch (error) {
      console.error('Error fetching candidates:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, [selectedLanguages]);

  return (
    <AuthProvider>
      <div className={classes.root}>
        <div className={classes.adaptive}>
          <Header />
          <main className={classes.main}>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<AuthorisationPage />} />
              <Route
                path="/candidates"
                element={
                  <ProtectedRoute>
                    <>
                      {/* {openId !== null && <div className={classes.propagation} onClick={() => setId(null)}></div>} */}
                      <div style={{padding: '10px'}} className={classes.wrapper}>
                        <div className={classes.first}>
                          {/* <Select
                      mainTitle={'Города'}
                      fieldTitle={'Выбрать город'}
                      items={cities}
                      isOpen={openId === 1}
                      opener={() => (1 === openId ? setId(null) : setId(1))}
                      citiesList={cityApi}
                      setCity={(e) => setCity([...e])}
                    />
                    <Select
                      mainTitle={'Сфера'}
                      fieldTitle={'Выбрать направление'}
                      items={directions}
                      isOpen={openId === 2}
                      opener={() => (2 === openId ? setId(null) : setId(2))}
                      setCity={(e) => setJobApi([...e])}
                    />
                    <Checkbox /> */}
                          <Select
                            mainTitle={'Навыки'}
                            fieldTitle={'Выбрать навыки'}
                            items={skills}
                            isOpen={openId === 3}
                            opener={() => (3 === openId ? setId(null) : setId(3))}
                            setCity={(e) => {
                              setSkillApi([...e]);
                              setSelectedLanguages([...e]);
                            }}
                          />
                          {/* <Button onClick={() => pressedMaker()} variant={buttonVariants.PRIMARY} text={"Подобрать кандидатов"}/> */}
                        </div>
                        <div className={classes.second}>
                          {isLoading ? (
                            <div className={classes.loaderContainer}>
                              <div className={classes.circleLoader}></div>
                            </div>
                          ) : (
                            (() => {
                              const filteredCandidates = candidates;
                              if (filteredCandidates.length === 0) {
                                return <div className={classes.noCandidatesMessage}>Подходящие кандидаты по выбранным параметрам не найдены</div>;
                              }
                              return filteredCandidates.map((post) => (
                                <div className={classes.secondPost} key={post.login}>
                                  <img className={classes.secondPhoto} width="68" height="68" src={post.image_url} alt={post.name} />
                                  <div className={classes.secondList}>
                                    <p className={classes.secondTitle}>{post.name}</p>
                                    <div className={classes.secondPlace}>
                                      {post.login} • {new Date(post.created_at).getFullYear()}
                                    </div>
                                    <div className={classes.secondBio}>{post.bio}</div>
                                    <div className={classes.secondStats}>
                                      <span>Followers: {post.followers}</span>
                                      <span>Following: {post.following}</span>
                                      <span>Repos: {post.public_repos}</span>
                                      <span>Stars: {post.stars}</span>
                                    </div>
                                    <div className={classes.secondSkills}>
                                      {Object.entries(post.languages).map(([lang, value]) => (
                                        <span key={lang} className={classes.secondSkill}>
                                          {lang}: {value}
                                        </span>
                                      ))}
                                    </div>
                                    <div className={classes.secondContributions}>{post.contributions}</div>
                                    <div className={classes.secondContacts}>
                                      {post.email !== 'No public email' && (
                                        <a href={`mailto:${post.email}`} target="_blank" rel="noreferrer">
                                          Email: {post.email}
                                        </a>
                                      )}
                                      {post.website && (
                                        <a href={post.website} target="_blank" rel="noreferrer">
                                          Website
                                        </a>
                                      )}
                                      {post.linkedin_url && (
                                        <a href={post.linkedin_url} target="_blank" rel="noreferrer">
                                          LinkedIn
                                        </a>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ));
                            })()
                          )}
                        </div>
                      </div>
                    </>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
