export const Card = ({props}) => {
  const {content, cursorHover, cursorNotHover} = props;

  return (
    <article className="card">
      <div className="date">{content.date}</div>
      <div>
        <h3>{content.title}</h3>
        <p className="subtitle">{content.category}</p>
        <a
          href={content.trailer}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={cursorHover}
          onMouseLeave={cursorNotHover}
        >
          <p className="detail">{content.desc}</p>
        </a>
      </div>
    </article>
  );
};
