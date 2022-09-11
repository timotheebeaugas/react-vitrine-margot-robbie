import { ReactComponent as Play } from "../assets/icons/play.svg";

export const Film = ({ props }) => {
  const { content, cursorHover, cursorNotHover, isMobile } = props;

  return (
    <article className="card-film">
      <div className="card-film-image">
        <a
          href={content.trailer}
          target="_blank"
          rel="noopener noreferrer"
          {...(!isMobile && {
            onMouseEnter: cursorHover,
            onMouseLeave: cursorNotHover,
          })}
        >
          <img
            src={require("../assets/images/" + content.poster)}
            alt="Poster"
          />
          <Play />
        </a>
      </div>
      <div className="card-film-title">
        <h3>{content.title}</h3>
      </div>
      <div className="card-film-date">{content.date}</div>
    </article>
  );
};
