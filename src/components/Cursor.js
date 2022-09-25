import { useEffect, useState } from "react";

export const Cursor = () => {
  const [position, setPosition] = useState();
  const [displayMouse, setDisplayMouse] = useState(false);

  useEffect(() => {
    const mousePosition = (event) => {
      setPosition({ left: event.clientX, top: event.clientY });

      if (
        window.innerWidth - event.clientX < 5 ||
        window.innerHeight - event.clientY < 5 ||
        event.clientX < 5 ||
        event.clientY < 5
      ) {
        setDisplayMouse(false);
      } else {
        setDisplayMouse(true);
        const ring = document.querySelector('.ring')
        ring.style.transform = `translate(calc(${event.clientX}px - 50%), calc(${event.clientY}px - 50%))`
        ring.style.opacity = 1;
      }
    };

    document.addEventListener("mousemove", mousePosition);

    return () => {
      document.removeEventListener("mousemove", mousePosition);
    };
  }, [position, displayMouse]);

  return displayMouse ? (
    <>
      <div className="cursor" style={position}></div>
      <div className="ring"></div>
    </>
  ) : null;
};
