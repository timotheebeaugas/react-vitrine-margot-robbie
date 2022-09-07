export const Video = (video) => {
  const src = video.props;

  return (
    <div className="card-video">
        <iframe
        width="533"
        height="300"
        src={src}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        ></iframe>
    </div>
  );
};
