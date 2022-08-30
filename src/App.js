import { useEffect, useState } from "react";
import { useI18n } from "./utils/hooks/i18n.js";
import { Cursor } from "./components/Cursor";
import { ResizeDevice } from "./utils/devices";
import { Background } from "./components/Background";

function App() {
  const [language, setLanguage] = useState("en");
  const [content] = useI18n(language);
  const [waiting, setWaiting] = useState(false);
  const [waitingLanguage, setWaitingLanguage] = useState(false);

  const root = document.querySelector(":root");

  const section = document.querySelector("section");
  const pagination = document.querySelector(".pagination");
  const activeLanguage = document.querySelector(".active-language");

  ResizeDevice();

  useEffect(() => {
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
        let page = pageHeight - Math.sign(event.deltaY) * (pagination.getBoundingClientRect().height / 5);

        if (position >= -400 && position <= 0) {
          root.style.setProperty("--current-position-y", height + "vh");
          root.style.setProperty("--position-y", position + "vh");
          root.style.setProperty("--current-page-position-y", pageHeight + "px");
          root.style.setProperty("--page-position-y", page + "px");
          console.log(page);
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
      }
      else if (waitingLanguage) {
        setWaitingLanguage(false);
        activeLanguage.classList.remove("scroll-language");
      }
    }, 1000);

    return () => {
      document.removeEventListener("wheel", wheelMove);
      clearInterval(interval);
    };
  }, [waiting, root, waitingLanguage, activeLanguage, pagination, section]);

  const changeLanguage = () => {
    const activeLanguage = document.querySelector(".active-language");

    if(!waitingLanguage){
      const style = getComputedStyle(document.body);
      let languageHeight = Number(
        style.getPropertyValue("--languages-position-y").split("px")[0]
      );
      let language = languageHeight === 0 ? -(activeLanguage.getBoundingClientRect().height / 2) : 0; 
      console.log(languageHeight, language)
      root.style.setProperty("--current-languages-position-y", languageHeight + "px");
      root.style.setProperty("--languages-position-y", language + "px");
      activeLanguage.classList.add("scroll-language");
      setLanguage(language === "en" ? "fr" : "en");
      setWaitingLanguage(true);      
    }

/*     let interval = setInterval(() => {
      if (waitingLanguage) {
        setWaitingLanguage(false);
        activeLanguage.classList.remove("scroll-language");
      }
    }, 1000); 

    return () => {
      clearInterval(interval);
    };*/
  };

  return (
    <div className="App">
      <Cursor />
      <header>
        <div></div>
        <div className="title">{content.title}</div>
        <div className="languages" onClick={changeLanguage}>
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
        <section>
          <article>Biography</article>
          <article>Awards</article>
          <article>Films</article>
          <article>Videos</article>
          <article>Networks</article>
        </section>
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
