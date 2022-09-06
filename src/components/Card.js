export const Card = ({ props }) => {
  const { content, cursorHover, cursorNotHover } = props;

  return (
    <article className="card">
      <div className="card-date">{content.date}</div>
      <div className="card-informations">
        <h3>{content.title}</h3>
          <div className="card-category">{content.category}</div>
          <div className="card-description">{content.desc}</div>
          <div className="card-trailer">
            {content.trailer ? (
              <a
                href={content.trailer}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={cursorHover}
                onMouseLeave={cursorNotHover}
              >
                {content.text}
              </a> 
            ) : null}
          </div>
      </div>
    </article>
  );
};


