import { useEffect, useState, useCallback } from "react";
import { useI18n } from "./utils/hooks/i18n.js";
import { Cursor } from "./components/Cursor";
import { ResizeDevice } from "./utils/devices";
import { Background } from "./components/Background";
import { useIsMobile } from "./utils/hooks/isMobile.js";
import { Award } from "./components/Award.js";
import { Film } from "./components/Film.js";
import { Network } from "./components/Network.js";
import { Video } from "./components/Video.js";
import { Biography } from "./components/Biography.js";
import { Category } from "./components/Category.js";
import { ReactComponent as Forward } from "./assets/icons/arrow_forward.svg";
import { ReactComponent as Back } from "./assets/icons/arrow_back.svg";
import { ReactComponent as LastPageForward } from "./assets/icons/last_page_black.svg";
import { ReactComponent as FirstPageBack } from "./assets/icons/first_page_black.svg";

function App() {
  const [content, currentLanguage, setCurrentLanguage] = useI18n("en");
  const [waiting, setWaiting] = useState(false);
  const [waitingLanguage, setWaitingLanguage] = useState(false);
  const [isMobile] = useIsMobile();
  const [mobileTouchPosition, setMobileTouchPosition] = useState();
  const [mobileTouchMovePosition, setMobileTouchMovePosition] = useState();
  const [isSwipeing, setIsSwiping] = useState();
  const [page, setPage] = useState(0);

  ResizeDevice();

  const scroll = useCallback((diff) => {
    const section = document.querySelector(".content");
    const categories = document.querySelector(".categories-content");
    const pagination = document.querySelector(".pagination");
    const sign = Math.sign(diff);
    const nextPage = page + sign;
    if (!waiting && nextPage < 1 && nextPage > -5) {
      const paginationHeight = pagination.getBoundingClientRect().height / 5;
      section.style.transform = `translateY(${sign * 100 + page * 100}vh)`;
      categories.style.transform = `translateX(${sign * 100 + page * 100}%)`;
      pagination.style.transform = `translateY(${
        sign * paginationHeight + page * paginationHeight
      }px)`;
      setPage(nextPage);
      setWaiting(true);
    }
  }, [page, waiting]);

  useEffect(() => {
    const wheelMove = (event) => {
      scroll(-event.deltaY);
    };

    const touchPosition = (event) => {
      setMobileTouchPosition(
        event.changedTouches[event.changedTouches.length - 1].clientY
      );
    };

    const touchMovePosition = (event) => {
      setMobileTouchMovePosition(
        event.changedTouches[event.changedTouches.length - 1].clientY
      );
    };

    const removeTouchPositions = () => {
      setMobileTouchPosition();
      setMobileTouchMovePosition();
    };

    if (isMobile) {
      document.addEventListener("touchstart", touchPosition);
      document.addEventListener("touchmove", touchMovePosition);
      document.addEventListener("touchend", removeTouchPositions);
    } else {
      document.addEventListener("wheel", wheelMove);
    }

    return () => {
      if (isMobile) {
        document.removeEventListener("touchstart", touchPosition);
        document.removeEventListener("touchmove", touchMovePosition);
        document.removeEventListener("touchend", removeTouchPositions);
      } else {
        document.removeEventListener("wheel", wheelMove);
      }
    };
  }, [waiting, isMobile, page, scroll]);

  useEffect(() => {
    const difference = mobileTouchMovePosition - mobileTouchPosition;

    if (difference > 50 || difference < -50) {
      scroll(difference);
    }
  }, [mobileTouchPosition, mobileTouchMovePosition, waiting, page, scroll]);

  const changeLanguage = () => {
    const activeLanguage = document.querySelector(".languages-content");
    if (!waitingLanguage) {
      if(currentLanguage === "en"){
        activeLanguage.style.transform = `translateY(${-(activeLanguage.getBoundingClientRect().height / 2)}px)`;
        setCurrentLanguage("fr");
      }else{
        activeLanguage.style.transform = `translateY(0px)`;
        setCurrentLanguage("en");
      }
      setWaitingLanguage(true);
    }
  };

  const cursorHover = () => {
    const cursor = document.querySelector(".cursor");
    if (!cursor.classList.value.includes("cursor-hover")) {
      cursor.classList.add("cursor-hover");
    }
  };

  const cursorNotHover = () => {
    const cursor = document.querySelector(".cursor");
    if (cursor.classList.value.includes("cursor-hover")) {
      cursor.classList.remove("cursor-hover");
    }
  };

  const activeCursor = () => {
    const cursor = document.querySelector(".cursor");
    if (!cursor.classList.value.includes("cursor-active")) {
      cursor.classList.add("cursor-active");
    }
  };

  const unactiveCursor = () => {
    const cursor = document.querySelector(".cursor");
    if (cursor.classList.value.includes("cursor-active")) {
      cursor.classList.remove("cursor-active");
    }
  };

  const swipeSection = (container, value) => {
    if (!isSwipeing) {
      setMobileTouchPosition(null);
      const step = window.innerWidth / 2;
      const element = document.querySelector("." + container);
      const currentPosition = element.getBoundingClientRect().left;
      const newPosition = currentPosition + step * Math.sign(value);

      if (typeof value === "string") {
        if (value === "start") {
          element.style.left = `0px`;
        } else {
          element.style.left = `${-(
            element.scrollWidth - window.innerWidth
          )}px`;
        }
      } else {
        if (newPosition < -element.scrollWidth + window.innerWidth) {
          swipeSection(container, "end");
        } else if (newPosition > 0) {
          swipeSection(container, "start");
        } else {
          element.style.left = `${newPosition}px`;
        }
      }
      setIsSwiping(true);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (isSwipeing) setIsSwiping(false);
    }, 500);
    return () => clearInterval(interval);
  }, [isSwipeing]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (waiting) setWaiting(false);
    }, 1000);
    return () => clearInterval(interval);
  }, [waiting]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (waitingLanguage) setWaitingLanguage(false);
    }, 1000);
    return () => clearInterval(interval);
  }, [waitingLanguage]);

  return (
    <div
      className="App"
      {...(!isMobile
        ? {
            onMouseDown: activeCursor,
            onMouseUp: unactiveCursor,
          }
        : null)}
    >
      {isMobile ? null : <Cursor />}

      <header>
        <div className="title">
          <a href="/" className="link">
            <h1
              {...(!isMobile && {
                onMouseEnter: cursorHover,
                onMouseLeave: cursorNotHover,
              })}
            >
              {" "}
              {content.title}{" "}
            </h1>
          </a>
        </div>
        <div
          className="languages"
          onClick={changeLanguage}
          {...(!isMobile && {
            onMouseEnter: cursorHover,
            onMouseLeave: cursorNotHover,
          })}
        >
          <div className="language-mask">
            <div className="languages-content">
              <span>en</span>
              <span>fr</span>
            </div>
          </div>
        </div>
        <nav className="categories">
          <div className="category-mask">
            <div className="categories-content">
              {content.categories.map((content, i) => (
                <Category props={content} key={i} />
              ))}
            </div>
          </div>
        </nav>
      </header>

      <main>
        <div className="bg-text-container">
          {[1, 2, 3].map((e) => (
            <Background props={content} key={e} />
          ))}
        </div>
        <div className="content">
          <section className="section">
            <div className="section-content-flex">
              <aside>
                <figure>
                  <div className="portrait" alt={content.biography.caption} />
                </figure>
                <p>{content.biography.caption}</p>
              </aside>
              <div className="biography-content">
                {content.biography.paragraphs.map((content, i) => (
                  <Biography props={content} key={i} />
                ))}
                <p>
                  <a
                    href={content.biography.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    {...(!isMobile && {
                      onMouseEnter: cursorHover,
                      onMouseLeave: cursorNotHover,
                    })}
                    className="link"
                  >
                    Wikipedia
                  </a>
                </p>
              </div>
            </div>
          </section>
          <section className="section">
            <div className="section-content">
              <div className="cards-content film">
                {content.films.content.map((content, i) => (
                  <Film
                    props={{ content, cursorHover, cursorNotHover, isMobile }}
                    key={i}
                  />
                ))}
              </div>
              <div className="keys">
                <FirstPageBack
                  onClick={() => swipeSection("film", "start")}
                  {...(!isMobile && {
                    onMouseEnter: cursorHover,
                    onMouseLeave: cursorNotHover,
                  })}
                />
                <Back
                  onClick={() => swipeSection("film", +1)}
                  {...(!isMobile && {
                    onMouseEnter: cursorHover,
                    onMouseLeave: cursorNotHover,
                  })}
                />
                <Forward
                  onClick={() => swipeSection("film", -1)}
                  {...(!isMobile && {
                    onMouseEnter: cursorHover,
                    onMouseLeave: cursorNotHover,
                  })}
                />
                <LastPageForward
                  onClick={() => swipeSection("film", "end")}
                  {...(!isMobile && {
                    onMouseEnter: cursorHover,
                    onMouseLeave: cursorNotHover,
                  })}
                />
              </div>
            </div>
          </section>
          <section className="section">
            <div className="section-content">
              <div className="cards-content award">
                {content.awards.content.map((content, i) => (
                  <Award props={{ content }} key={i} />
                ))}
              </div>
              <div className="keys">
                <FirstPageBack
                  onClick={() => swipeSection("award", "start")}
                  {...(!isMobile && {
                    onMouseEnter: cursorHover,
                    onMouseLeave: cursorNotHover,
                  })}
                />
                <Back
                  onClick={() => swipeSection("award", +1)}
                  {...(!isMobile && {
                    onMouseEnter: cursorHover,
                    onMouseLeave: cursorNotHover,
                  })}
                />
                <Forward
                  onClick={() => swipeSection("award", -1)}
                  {...(!isMobile && {
                    onMouseEnter: cursorHover,
                    onMouseLeave: cursorNotHover,
                  })}
                />
                <LastPageForward
                  onClick={() => swipeSection("award", "end")}
                  {...(!isMobile && {
                    onMouseEnter: cursorHover,
                    onMouseLeave: cursorNotHover,
                  })}
                />
              </div>
            </div>
          </section>
          <section className="section">
            <div className="section-content">
              <div className="cards-content video">
                {content.videos.content.map((content, i) => (
                  <Video props={content} key={i} />
                ))}
              </div>
              <div className="keys">
                <FirstPageBack
                  onClick={() => swipeSection("video", "start")}
                  {...(!isMobile && {
                    onMouseEnter: cursorHover,
                    onMouseLeave: cursorNotHover,
                  })}
                />
                <Back
                  onClick={() => swipeSection("video", +1)}
                  {...(!isMobile && {
                    onMouseEnter: cursorHover,
                    onMouseLeave: cursorNotHover,
                  })}
                />
                <Forward
                  onClick={() => swipeSection("video", -1)}
                  {...(!isMobile && {
                    onMouseEnter: cursorHover,
                    onMouseLeave: cursorNotHover,
                  })}
                />
                <LastPageForward
                  onClick={() => swipeSection("video", "end")}
                  {...(!isMobile && {
                    onMouseEnter: cursorHover,
                    onMouseLeave: cursorNotHover,
                  })}
                />
              </div>
            </div>
          </section>
          <section className="section">
            <div className="section-content-flex">
              <div className="networks-content">
                {content.networks.content.map((content, i) => (
                  <Network
                    props={{ content, cursorHover, cursorNotHover, isMobile }}
                    key={i}
                  />
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer>
        <nav>
          <div className="items">
            <div className="pagination">
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
            </div>
          </div>
          <div className="bullet items"></div>
          <div className="items">5</div>
        </nav>
      </footer>
    </div>
  );
}

export default App;
