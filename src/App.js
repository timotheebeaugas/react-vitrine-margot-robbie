import { useEffect, useState } from "react";
import { useI18n } from "./utils/hooks/i18n.js";
import { Cursor } from "./components/Cursor";
import { ResizeDevice } from "./utils/devices";
import { Background } from "./components/Background";
import { useIsMobile } from "./utils/hooks/isMobile.js";
import { Card } from "./components/Card.js";
import { Network } from "./components/Network.js";
import { Video } from "./components/Video.js";

function App() {
  //const [language, setLanguage] = useState("en");
  const [content, currentLanguage, setCurrentLanguage] = useI18n("en");
  const [waiting, setWaiting] = useState(false);
  const [waitingLanguage, setWaitingLanguage] = useState(false);
  const [isMobile] = useIsMobile();
  const [swipe, setSwipe] = useState();

  ResizeDevice();

  useEffect(() => {
    const root = document.querySelector(":root");
    const section = document.querySelector(".content");
    const pagination = document.querySelector(".pagination");
    const activeLanguage = document.querySelector(".active-language");

    const wheelMove = (event) => {
      if (!waiting) {
        let style = getComputedStyle(document.body);
        let height = Number(
          style.getPropertyValue("--position-y").split("vh")[0]
        );
        let pageHeight = Number(
          style.getPropertyValue("--page-position-y").split("px")[0]
        );
        let position = height - event.deltaY;
        let page =
          pageHeight -
          Math.sign(event.deltaY) *
            (pagination.getBoundingClientRect().height / 5);

        if (position >= -400 && position <= 0) {
          root.style.setProperty("--current-position-y", height + "vh");
          root.style.setProperty("--position-y", position + "vh");
          root.style.setProperty(
            "--current-page-position-y",
            pageHeight + "px"
          );
          root.style.setProperty("--page-position-y", page + "px");

          section.classList.add("scroll");
          pagination.classList.add("scroll-page");
          setWaiting(true);
        }
      }
    };

    document.addEventListener("wheel", wheelMove);

    let interval = setInterval(() => {
      if (waiting) {
        setWaiting(false);
        section.classList.remove("scroll");
        pagination.classList.remove("scroll-page");
      } else if (waitingLanguage) {
        setWaitingLanguage(false);
        activeLanguage.classList.remove("scroll-language");
      }
    }, 1000);

    return () => {
      document.removeEventListener("wheel", wheelMove);
      clearInterval(interval);
    };
  }, [waiting, waitingLanguage, content]);

  const changeLanguage = () => {
    const activeLanguage = document.querySelector(".active-language");
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
    if (swipe) {
      setSwipe(false);
    }
  };

  useEffect(() => {
    const mousePosition = (event) => {
      if (swipe) {
        const element = document.querySelector("." + swipe.class);
        let position = event.clientX - swipe.event.clientX + swipe.rect.left;
        console.log( event.clientX, swipe.event.clientX, swipe.rect.left,  window.innerWidth, element.scrollWidth);
        if (
          position < 0 &&
          position > window.innerWidth - element.scrollWidth
        ) {
          element.style.transform = "translateX(" + position + "px)";
        }
      }
    };

    document.addEventListener("mousemove", mousePosition);

    return () => {
      document.removeEventListener("mousemove", mousePosition);
    };
  }, [swipe]);

  return (
    <div className="App" onMouseDown={activeCursor} onMouseUp={unactiveCursor}>
      {isMobile ? "" : <Cursor />}

      <header>
        <div></div>
        <div className="title">
          <h1
            onClick={() => window.location.reload()}
            onMouseEnter={cursorHover}
            onMouseLeave={cursorNotHover}
          >
            {" "}
            {content.title}{" "}
          </h1>
        </div>
        <div
          className="languages"
          onClick={changeLanguage}
          onMouseEnter={cursorHover}
          onMouseLeave={cursorNotHover}
        >
          <div className="item-language">
            <div className="active-language">
              <span>en</span>
              <span>fr</span>
            </div>
          </div>
        </div>
      </header>

      <main className="move">
        <div className="bg-text-container">
          {[1, 2].map((e) => (
            <Background props={content} key={e} />
          ))}
        </div>
        <div className="content">
          <section className="section">
            <h2>{content.biography.title}</h2>
            <p>{content.biography.content}</p>
            <figure>
              <div className="portrait" alt={content.biography.legend} />
            </figure>
          </section>
          <section className="section">
            <h2>{content.films.title}</h2>
            <div
              className="cards-content film"
              onMouseDown={(event) =>
                setSwipe({
                  class: "film",
                  event: event,
                  rect: document.querySelector(".film").getBoundingClientRect(),
                })
              }
            >
              {content.films.content.map((content, i) => (
                <Card
                  props={{ content, cursorHover, cursorNotHover }}
                  key={i}
                />
              ))}
            </div>
          </section>
          <section className="section">
            <h2>{content.awards.title}</h2>
            <div
              className="cards-content award"
              onMouseDown={(event) =>
                setSwipe({
                  class: "award",
                  event: event,
                  rect: document
                    .querySelector(".award")
                    .getBoundingClientRect(),
                })
              }
            >
              {content.awards.content.map((content, i) => (
                <Card
                  props={{ content, cursorHover, cursorNotHover }}
                  key={i}
                />
              ))}
            </div>
          </section>
          <section className="section">
            <h2>{content.videos.title}</h2>
            <div
              className="cards-content video"
              onMouseDown={(event) =>
                setSwipe({
                  class: "video",
                  event: event,
                  rect: document
                    .querySelector(".video")
                    .getBoundingClientRect(),
                })
              }
            >
              {/*             {content.videos.content.map((video, i) => (
              <Video props={video} key={i} />
            ))} */}
            </div>
          </section>
          <section className="section">
            <h2>{content.networks.title}</h2>
            <div
              className="cards-content network"
              onMouseDown={(event) =>
                setSwipe({
                  class: "network",
                  event: event,
                  rect: document
                    .querySelector(".network")
                    .getBoundingClientRect(),
                })
              }
            >
              {content.networks.content.map((content, i) => (
                <Network
                  props={{ content, cursorHover, cursorNotHover }}
                  key={i}
                />
              ))}
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
