export const Network = ({ props }) => {
  const { content, cursorHover, cursorNotHover } = props;

  return (
    <article>
      <h3>{content.website}</h3>
      <a
        href={content.link}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={cursorHover}
        onMouseLeave={cursorNotHover}
      >
        {content.link}
      </a>
      <i>{content.official}</i>
    </article>
  );
};
