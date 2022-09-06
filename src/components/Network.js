export const Network = ({ props }) => {
  const { content, cursorHover, cursorNotHover } = props;

  return (
    <article className="card">
      <div className="card-date">{content.background}</div>
      <div className="card-informations">
        <h3>{content.website}</h3>
          <div className="card-category">{content.category}</div>
          <div className="card-description">{content.desc}</div>
          <div className="card-trailer">
            {content.link ? (
              <a
                href={content.link}
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
