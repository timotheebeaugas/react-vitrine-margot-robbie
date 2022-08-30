import { useEffect, useState } from "react";

export const Cursor = () => {
  const [position, setPosition] = useState();
  const [displayMouse, setDisplayMouse] = useState(false);

  useEffect(() => {
    const mousePosition = (event) => {
      setPosition({ left: event.clientX - 9, top: event.clientY - 9 });

      if (
        (window.innerWidth - event.clientX) < 5 ||
        (window.innerHeight - event.clientY) < 5 ||
        event.clientX < 5 ||
        event.clientY < 5
      ) {
        setDisplayMouse(false);
      } else {
        setDisplayMouse(true);
      }
    };

    document.addEventListener("mousemove", mousePosition);

    return () => {
      document.removeEventListener("mousemove", mousePosition);

    };
  }, [position, displayMouse]);

  return displayMouse ? <div className="cursor" style={position}></div> : null;
};
