export const Award = (award) => {
  const text = award.props;
  return (
    <article>
      <h3>{text.award}</h3>
      <h4>{text.category}</h4>
      <p>{text.date}</p>
      <p>{text.work}</p>
    </article>
  );
};
