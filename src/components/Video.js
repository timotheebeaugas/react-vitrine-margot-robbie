export const Video = (video) => {
  const text = video.props;

  return (
    <iframe
      width="230"
      height="162"
      src={text}
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  );
};
