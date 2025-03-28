import "./index.css";
import { useRef, useState, useEffect } from "react";

const MAX_HISTORY_LENGTH = 15;
// Tod0: will improve undo and redo functionality
const SignMaker = () => {
  const sketch = useRef(null);
  const [penColor, setPenColor] = useState("#000000");
  const penColorRef = useRef("#000000");
  const isDrawingRef = useRef(false); // Use a ref to track the drawing state
  const history = useRef([]);
  const historyPosition = useRef(0);

  // Adjust canvas size for high DPI displays
  const setCanvasSize = () => {
    const canvas = sketch.current;
    const ctx = canvas.getContext("2d");
    const devicePixelRatio = window.devicePixelRatio || 1;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    // Set canvas size and scale context
    canvas.width = width * devicePixelRatio;
    canvas.height = height * devicePixelRatio;
    ctx.scale(devicePixelRatio, devicePixelRatio);
  };

  const saveHistory = () => {
    const canvas = sketch.current;
    const data = canvas.toDataURL();
    historyPosition.current += 1;
    if (history.current.length >= MAX_HISTORY_LENGTH) {
      history.current.shift();
    }
    history.current.push(data);
  };

  const restoreHistory = (position) => {
    const canvas = sketch.current;
    console.log(history.current[position]);
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      const scale = window.devicePixelRatio || 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width / scale, canvas.height / scale);
    };
    img.src = history.current[position];
    setCanvasSize();
  };

  const undo = () => {
    historyPosition.current -= 1;
    if (historyPosition.current) {
      restoreHistory(historyPosition.current);
    }
  };

  const redo = () => {
    console.log(historyPosition.current, history.current.length);
    if (historyPosition.current < history.current.length - 1) {
      historyPosition.current += 1;
      restoreHistory(historyPosition.current);
    }
  };

  const getMouseOrTouchPosition = (e) => {
    const rect = sketch.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    return { x, y };
  };

  const draw = (e) => {
    if (!isDrawingRef.current) return;
    // Get mouse position relative to the canvas
    const { x, y } = getMouseOrTouchPosition(e);
    const ctx = sketch.current.getContext("2d");

    ctx.strokeStyle = penColorRef.current;
    ctx.lineCap = "round";
    ctx.lineWidth = 2;
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const startDrawing = (e) => {
    saveHistory();
    isDrawingRef.current = true;
    draw(e);
  };

  const stopDrawing = () => {
    isDrawingRef.current = false;
    const ctx = sketch.current.getContext("2d");
    ctx.beginPath();
  };

  const clearCanvas = () => {
    const canvas = sketch.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  useEffect(() => {
    setCanvasSize();
    const canvas = sketch.current;

    const handleMouseDown = (e) => startDrawing(e);
    const handleMouseMove = (e) => draw(e);
    const handleMouseUp = (e) => stopDrawing(e);
    const handleMouseLeave = (e) => stopDrawing(e);

    const handleTouchStart = (e) => startDrawing(e.touches[0]);
    const handleTouchMove = (e) => draw(e.touches[0]);
    const handleTouchEnd = (e) => stopDrawing(e);

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("touchstart", handleTouchStart, { passive: false });
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false });
    canvas.addEventListener("touchend", handleTouchEnd, { passive: false });
    // Handle window resize to adjust canvas size
    window.addEventListener("resize", setCanvasSize);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("resize", setCanvasSize);
    };
  }, []);

  return (
    <div className="w-[inherit] text-center">
      <h3>Save your signature here. Use it any where you want.</h3>
      <h5 className="text-sm text-left pl-1">*Best viewed on desktop</h5>
      <div className="flex gap-[10px] mt-2 items-center justify-center">
        <label htmlFor="name">Choose pen color</label>
        <input
          type="color"
          name="name"
          id="name"
          value={penColor}
          onChange={(e) => {
            setPenColor(e.target.value);
            penColorRef.current = e.target.value;
          }}
          placeholder="Enter your name"
          required
        />
      </div>
      <div className="sketch-container my-[10px] relative">
        <div className="canvas-wrapper w-[60%] m-auto p-3 rounded-md bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 shadow-lg">
          <div className="relative">
            <canvas
              id="sketch"
              className="rounded-md w-full h-[300px] m-auto bg-white"
              ref={sketch}
            ></canvas>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 text-gray-500 italic">
              Draw your signature here
            </div>
          </div>
        </div>
      </div>
      <div className="actions flex flex-col items-center justify-center max-w-[320px] m-auto">
        <div className="basic-actions flex justify-between items-center gap-1 my-2 w-full text-slate-800">
          <button
            className="undo px-2 py-0.5 shadow-md rounded-md"
            onClick={undo}
          >
            Undo
          </button>
          <button
            className="redo px-2 py-0.5 shadow-md rounded-md"
            onClick={redo}
          >
            Redo
          </button>
          <button
            className="clear px-2 py-0.5 shadow-md rounded-md"
            onClick={clearCanvas}
          >
            Clear
          </button>
        </div>
        <div className="dowload-form flex flex-col gap-1 w-full">
          <div className="flex items-center">
            <label htmlFor="fileName" className="min-w-[75px] text-left">
              File Name
            </label>
            <input
              type="text"
              id="fileName"
              value="signature"
              className="ml-2 pl-1 text-slate-800"
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="fileType" className="min-w-[75px] text-left">
              File Type
            </label>
            <select
              name="fileType"
              id="fileType"
              className="ml-2 pl-1 text-slate-800"
            >
              <option value="png">PNG</option>
              <option value="jpeg">JPEG</option>
              <option value="svg">PDF</option>
            </select>
          </div>
          <div className="flex items-center">
            <label htmlFor="quality" className="min-w-[75px] text-left">
              Quality
            </label>
            <select
              name="quality"
              id="quality"
              className="ml-2 pl-1 text-slate-800"
            >
              <option value="0.9">High</option>
              <option value="0.7">Medium</option>
              <option value="0.5">Low</option>
            </select>
          </div>
          <button className="save px-2 py-1 mt-2 shadow-md rounded-md">
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignMaker;
