export const Award = ({props}) => {
  const { content } = props;

  return (
    <article className="card-award">
      <div className="card-award-date">{content.date}</div>
      <div className="card-award-title">
        <h3>{content.title}</h3>
      </div>
      <div className="card-award-category">{content.category}</div>
      <div className="card-award-film">{content.film}</div>
    </article>
  );
};
