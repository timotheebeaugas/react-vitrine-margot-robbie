import { useEffect, useState } from "react";
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

function App() {
  const [content, currentLanguage, setCurrentLanguage] = useI18n("en");
  const [waiting, setWaiting] = useState(false);
  const [waitingLanguage, setWaitingLanguage] = useState(false);
  const [isMobile] = useIsMobile();
  const [swipe, setSwipe] = useState();
  const [mobileTouchPosition, setMobileTouchPosition] = useState();

  ResizeDevice();

  useEffect(() => {
    const root = document.querySelector(":root");
    const section = document.querySelector(".content");
    const categories = document.querySelector(".categories-content");
    const pagination = document.querySelector(".pagination");
    const activeLanguage = document.querySelector(".languages-content");

    const wheelMove = (event) => {
      if (!waiting && (isMobile ? mobileTouchPosition : true)) {
        const sign = isMobile
          ? Math.sign(
              mobileTouchPosition -
                event.changedTouches[event.changedTouches.length - 1].clientY
            )
          : Math.sign(event.deltaY);
        let style = getComputedStyle(document.body);
        let height = Number(
          style.getPropertyValue("--position-y").split("vh")[0]
        );
        let width = Number(
          style.getPropertyValue("--position-x").split("%")[0]
        );
        let pageHeight = Number(
          style.getPropertyValue("--page-position-y").split("px")[0]
        );
        let positionY = height - sign * 100;
        let positionX = width - sign * 100;

        let page =
          pageHeight - sign * (pagination.getBoundingClientRect().height / 5);

        if (positionY >= -400 && positionY <= 0) {
          root.style.setProperty("--current-position-y", height + "vh");
          root.style.setProperty("--position-y", positionY + "vh");
          root.style.setProperty("--current-position-x", width + "%");
          root.style.setProperty("--position-x", positionX + "%");
          root.style.setProperty(
            "--current-page-position-y",
            pageHeight + "px"
          );
          root.style.setProperty("--page-position-y", page + "px");

          section.classList.add("scroll");
          categories.classList.add("scroll-category");
          pagination.classList.add("scroll-page");
          setWaiting(true);
        }
      }
    };

    const touchPosition = (event) => {
      setMobileTouchPosition(
        event.changedTouches[event.changedTouches.length - 1].clientY
      );
    };

    if (isMobile) {
      document.addEventListener("touchstart", touchPosition);
      document.addEventListener("touchend", wheelMove);
    } else {
      document.addEventListener("wheel", wheelMove);
    }

    let interval = setInterval(() => {
      if (waiting) {
        setWaiting(false);
        section.classList.remove("scroll");
        categories.classList.remove("scroll-category");
        pagination.classList.remove("scroll-page");
      } else if (waitingLanguage) {
        setWaitingLanguage(false);
        activeLanguage.classList.remove("scroll-language");
      }
    }, 1000);

    return () => {
      if (isMobile) {
        document.removeEventListener("touchstart", touchPosition);
        document.removeEventListener("touchend", wheelMove);
      } else {
        document.removeEventListener("wheel", wheelMove);
      }
      clearInterval(interval);
    };
  }, [waiting, waitingLanguage, content, isMobile, mobileTouchPosition, swipe]);

  const changeLanguage = () => {
    const activeLanguage = document.querySelector(".languages-content");
    const root = document.querySelector(":root");

    if (!waitingLanguage) {
      const style = getComputedStyle(document.body);
      let languageHeight = Number(
        style.getPropertyValue("--languages-position-y").split("px")[0]
      );
      let language =
        languageHeight === 0
          ? -(activeLanguage.getBoundingClientRect().height / 2)
          : 0;

      root.style.setProperty(
        "--current-languages-position-y",
        languageHeight + "px"
      );
      root.style.setProperty("--languages-position-y", language + "px");
      activeLanguage.classList.add("scroll-language");
      setCurrentLanguage(currentLanguage === "en" ? "fr" : "en");
      setWaitingLanguage(true);
    }
  };

  const swipeOff = () => {
    if (swipe) {
      setSwipe(false);
    }
  }

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
    swipeOff()
  };

  useEffect(() => {
    const mousePosition = (event) => {
      if (swipe) {
        const element = document.querySelector("." + swipe.class);
        let position = event.clientX - swipe.event.clientX + swipe.rect.left;

        if (
          position < 0 &&
          position > window.innerWidth - element.scrollWidth
        ) {
          element.style.transform = "translateX(" + position + "px)";
        }
      }
    };

    const touchPosition = (event) => {
      if (swipe) {
        setMobileTouchPosition(null);
        const element = document.querySelector("." + swipe.class);
        let position =
          event.changedTouches[0].clientX -
          swipe.event.clientX +
          swipe.rect.left;

        if (
          position < 0 &&
          position > window.innerWidth - element.scrollWidth
        ) {
          element.style.transform = "translateX(" + position + "px)";
        }
      }
    };

    if (isMobile) {
      document.addEventListener("touchmove", touchPosition);
    } else {
      document.addEventListener("mousemove", mousePosition);
    }

    return () => {
      if (isMobile) {
        document.removeEventListener("touchmove", touchPosition);
      } else {
        document.removeEventListener("mousemove", mousePosition);
      }
    };
  }, [swipe, isMobile]);

  return (
    <div
      className="App"
      {...(!isMobile
        ? {
            onMouseDown: activeCursor,
            onMouseUp: unactiveCursor,
          }
        : { onTouchEnd: swipeOff })}
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
              <div
                className="cards-content film"
                {...(!isMobile
                  ? {
                      onMouseDown: (event) =>
                        setSwipe({
                          class: "film",
                          event: event,
                          rect: document
                            .querySelector(".film")
                            .getBoundingClientRect(),
                        }),
                    }
                  : {
                      onPointerDown: (event) =>
                        setSwipe({
                          class: "film",
                          event: event,
                          rect: document
                            .querySelector(".film")
                            .getBoundingClientRect(),
                        }),
                    })}
              >
                {content.films.content.map((content, i) => (
                  <Film
                    props={{ content, cursorHover, cursorNotHover, isMobile }}
                    key={i}
                  />
                ))}
              </div>
            </div>
          </section>
          <section className="section">
            <div className="section-content">
              <div
                className="cards-content award"
                {...(!isMobile
                  ? {
                      onMouseDown: (event) =>
                        setSwipe({
                          class: "award",
                          event: event,
                          rect: document
                            .querySelector(".award")
                            .getBoundingClientRect(),
                        }),
                    }
                  : {
                      onPointerDown: (event) =>
                        setSwipe({
                          class: "award",
                          event: event,
                          rect: document
                            .querySelector(".award")
                            .getBoundingClientRect(),
                        }),
                    })}
              >
                {content.awards.content.map((content, i) => (
                  <Award props={{ content }} key={i} />
                ))}
              </div>
            </div>
          </section>
          <section className="section">
            <div className="section-content">
              <div
                className="cards-content video"
                {...(!isMobile
                  ? {
                      onMouseDown: (event) =>
                        setSwipe({
                          class: "video",
                          event: event,
                          rect: document
                            .querySelector(".video")
                            .getBoundingClientRect(),
                        }),
                    }
                  : {
                      onPointerDown: (event) =>
                        setSwipe({
                          class: "video",
                          event: event,
                          rect: document
                            .querySelector(".video")
                            .getBoundingClientRect(),
                        }),
                    })}
              >
                {content.videos.content.map((content, i) => (
                  <Video props={content} key={i} />
                ))}
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
