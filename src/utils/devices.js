import { useEffect } from "react";

export const ResizeDevice = () => {
  useEffect(() => {
    window.addEventListener("resize", () => {
      window.location.reload();
    });
    return () => {
      window.removeEventListener("resize", () => {
        window.location.reload();
      });
    };
  }, []);
};
