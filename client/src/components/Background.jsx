import { useEffect, useState } from "react";
import dayImage from "../images/image4.jpg";
import nightImage from "../images/image3.jpg";

const Background = () => {
  const [currentImage, setCurrentImage] = useState(dayImage);

  const getCurrentImage = () => {
    const currentHour = new Date().getHours();
    return currentHour >= 6 && currentHour < 18 ? dayImage : nightImage;
  };

  useEffect(() => {
    setCurrentImage(getCurrentImage());

    const intervalId = setInterval(() => {
      setCurrentImage(getCurrentImage());
    }, 3600000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      className="background-image"
      style={{
        backgroundImage: `url(${currentImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        width: "100vw",
        position: "fixed",
        zIndex: -1,
      }}
    ></div>
  );
};

export default Background;
