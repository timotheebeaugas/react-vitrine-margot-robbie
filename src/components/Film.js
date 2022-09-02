export const Film = (film) => {
    const text = film.props;

    return (
        <article>
            <h3>{text.title}</h3>
            <p>{text.genre}</p>
            <p>{text.release}</p>
            <p>{text.pitch}</p>
        </article>
    )
};