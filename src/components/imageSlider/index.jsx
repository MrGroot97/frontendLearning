import clsx from "clsx";
import slide1 from "../../assets/pexels_slide1.jpg";
import slide2 from "../../assets/pexels_slide2.jpg";
import slide3 from "../../assets/pexels_slide3.jpg";
import slide4 from "../../assets/pexels_slide4.jpg";
import slide5 from "../../assets/pexels_slide5.jpg";
import slide6 from "../../assets/pexels_slide6.jpg";
import { useEffect, useState, useRef } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { FaPlayCircle } from "react-icons/fa";
import { FaPauseCircle } from "react-icons/fa";

const images = [slide1, slide2, slide3, slide4, slide5, slide6];

export const ImageSlider = () => {
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [play, setPlay] = useState(false);
  const playPauseRef = useRef(null);

  const nextImage = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const onPlay = () => {
    playPauseRef.current = setInterval(() => {
      nextImage();
    }, 1000);
    setPlay(true);
  }

  const onPause = () => {
    clearInterval(playPauseRef.current);
    setPlay(false);
  }

//   useEffect(() => {
//     playPauseRef.current = setInterval(() => {
//       nextImage();
//     }, 1000);
//     return () => {
//       clearInterval(playPauseRef.current);
//     };
//   }, []);

  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => setAnimate(false), 500); // Match animation duration
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div className="max-h-[calc(100vh-100px)]">
      <h1 className="text-3xl text-center mt-10">Image Slider</h1>
      <div className="w-full mx-auto mt-5 flex justify-center items-center">
        <div
          className="text-3xl cursor-pointer hover:duration-300 hover:scale-125"
          onClick={nextImage}
        >
          <FaAngleLeft />
        </div>
        <div className="w-auto h-[550px] overflow-hidden">
          <img
            src={images[index]}
            alt="image"
            className={clsx(
              "object-cover w-full h-full transition-transform duration-500 ease-in-out transform", 
              animate && "animate-slide-in"
            )}
          />
        </div>
        <div
          className="text-3xl cursor-pointer hover:duration-300 hover:scale-125"
          onClick={prevImage}
        >
          <FaAngleRight />
        </div>
      </div>
      <div className="text-center mt-5">
        <button onClick={play ? onPause : onPlay} className={clsx("bg-white text-black rounded-xl px-2 py-0.5 text-lg", play ? 'text-red-700' : 'text-green-700')}>
            <span className="flex justify-center items-center">
                {play ? "Pause " : "Play "}
                {play ? <FaPauseCircle className="pl-1" /> : <FaPlayCircle className="pl-1" />}
            </span>
        </button>
      </div>
    </div>
  );
};
