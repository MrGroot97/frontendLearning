import { ShimmerUi } from "./shimmerUi";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "../../contexts/ThemeContext";

export const InfiniteScroll = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const scrollContainerRef = useRef(null);
  const { effectiveTheme } = useTheme();
  const isDarkMode = effectiveTheme === "dark";

  const fetchData = async () => {
    if (isLoading || !hasMore) return;

    try {
      setIsLoading(true);
      console.log("Fetching data...");
      const response = await fetch("https://meme-api.com/gimme/20");

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const jsonData = await response.json();

      if (jsonData.memes && jsonData.memes.length > 0) {
        setData((prev) => [...prev, ...jsonData.memes]);
      } else {
        // No more data
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Initial data fetch
    fetchData();

    // Cleanup function
    return () => {
      // Any cleanup if needed
    };
  }, []);

  // Handle scroll event
  const handleScroll = () => {
    if (!scrollContainerRef.current || isLoading || !hasMore) return;

    const { scrollTop, scrollHeight, clientHeight } =
      scrollContainerRef.current;

    // Check if we're near the bottom
    if (scrollHeight - scrollTop - clientHeight < 200) {
      fetchData();
    }
  };

  return (
    <div
      className={`${
        isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
      } w-full`}
    >
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="h-[600px] overflow-y-auto p-4"
        style={{ scrollBehavior: "smooth" }}
      >
        <div className="flex flex-wrap gap-x-4 gap-y-6 justify-center">
          {data.map((item, index) => (
            <div
              key={`${item.postLink}-${index}`}
              className={`flex flex-col w-fit rounded-lg justify-center border border-solid ${
                isDarkMode ? "border-gray-600" : "border-slate-300"
              }`}
            >
              <img
                src={item.url}
                alt={item.title}
                className="w-56 h-56 object-cover rounded-lg m-2"
                loading="lazy"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/240?text=Image+Error";
                }}
              />
              <div
                className={`w-56 px-3 py-2 ${
                  isDarkMode ? "bg-gray-700" : "bg-white"
                } rounded-lg m-2`}
              >
                <p className="truncate">{item.author}</p>
              </div>
            </div>
          ))}
        </div>

        {isLoading && <ShimmerUi />}

        {!isLoading && !hasMore && data.length > 0 && (
          <p className="text-center my-8">No more content to load</p>
        )}

        {!isLoading && data.length === 0 && (
          <div className="text-center my-8">
            <p>No data available. Please try again later.</p>
          </div>
        )}
      </div>
    </div>
  );
};
