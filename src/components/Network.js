export const Network = (network) => {
    const text = network.props;

    return (
        <article>
            <h3>{text.website}</h3>
            <a href={text.link}>{text.link}</a>
            <i>{text.official}</i>
        </article>
    )
};