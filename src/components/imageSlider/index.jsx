const images = [
  "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg",
  "https://piktochart.com/wp-content/uploads/2023/04/large-29.jpg",
  "https://i.pinimg.com/originals/2b/66/01/2b66016d5a1e2d230ecce59f8e673382.png",
  "https://i.pinimg.com/736x/5f/09/47/5f0947219a7f446e804e7e0055089fad.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoKMpEfmuwzKmwyl4reX0NW7-Ixgn1DCz6IvxSYpq_CQ&s",
];
import clsx from "clsx";
import { useEffect, useState, useRef } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { FaPlayCircle } from "react-icons/fa";
import { FaPauseCircle } from "react-icons/fa";

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
    <div>
      <h1 className="text-3xl text-center mt-10">Image Slider</h1>
      <div className="w-full mx-auto mt-10 flex justify-center items-center">
        <div
          className="text-3xl cursor-pointer hover:duration-300 hover:scale-125"
          onClick={nextImage}
        >
          <FaAngleLeft />
        </div>
        <div className="w-[400px] h-[250px] overflow-hidden">
          <img
            src={images[index]}
            alt="image"
            className={clsx(
              "w-full object-cover",
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
