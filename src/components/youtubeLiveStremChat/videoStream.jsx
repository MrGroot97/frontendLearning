export const VideoStream = () => {
    return (
        <div className="w-full">
            <iframe
                className="w-full h-full md:w-[560px] md:h-[315px]"
                src="https://www.youtube.com/embed/5xf4_Kx7azg?si=Ba5v66TFQIUPUa1z"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
            ></iframe>
        </div>
    );
};
