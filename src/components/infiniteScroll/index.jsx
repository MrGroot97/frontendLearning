import { ShimmerUi } from "./shimmerUi"
import { useState, useEffect } from "react";

export const InfiniteScroll = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    const response = await fetch("https://meme-api.com/gimme/20");
    const data = await response.json();
    setData(prev => [...prev, ...data.memes]);
    setIsLoading(false);
  }

  useEffect(() => {

    fetchData();
    window.addEventListener("scroll", onScroll);
    
    return () => {
      window.removeEventListener("scroll", onScroll);
    }
  }, [])

  const onScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight && !isLoading) {
      fetchData();
    }
  }
  

  return (
    <div className="flex flex-wrap gap-x-2 gap-y-5 justify-center pt-[10px]">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col w-fit rounded-lg justify-center border border-solid border-slate-300">
            <img src={item.url} alt={item.title} className="w-64 h-64 rounded-lg m-2" />
            <div className="w-64 px-1 py-0.5 bg-white text-black rounded-lg m-2">
              <p>{item.author}</p>
            </div>
          </div>
        ))}
        {isLoading && <ShimmerUi />}
    </div>
  )
}