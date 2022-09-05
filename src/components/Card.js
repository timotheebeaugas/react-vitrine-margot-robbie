export const Card = ({ props }) => {
  const { content, cursorHover, cursorNotHover } = props;

  return (
    <article className="card">
      <div className="card-date">{content.date}</div>
      <div className="card-informations">
        <h3>{content.title}</h3>
        <p className="card-category">{content.category}</p>
        <p className="card-description">{content.desc}</p>
        <div className="card-trailer">
          {content.trailer ? (
            <a
              href={content.trailer}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={cursorHover}
              onMouseLeave={cursorNotHover}
            >
            Play trailer
            </a>
          ) : null}
        </div>
      </div>
    </article> 
  );
};

//play trailer
