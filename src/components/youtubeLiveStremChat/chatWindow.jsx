import { ChatMessage } from "./chatMessage";
import { useEffect, useRef, useState } from "react";
import { CHAT_WINDOW_LIMIT, nameList } from "./constants";
import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";
import { BsFillSendFill } from "react-icons/bs";

function generateName() {
    return nameList[Math.floor(Math.random() * nameList.length)];
}

export const ChatWindow = () => {
    const [messages, setMessages] = useState([]);
    const [userMsg, setUserMsg] = useState("");
    const [isChatRunning, setIsChatRunning] = useState(false);
    const chatIntervalRef = useRef(null);

    const fetchMessages = async () => {
        const randName1 = generateName();
        const randName2 = generateName();
        const data = [
            {
                id: 1,
                name: randName1,
                profile_url:
                    "https://yt3.ggpht.com/OG7FMfG_isZdrfTKY10oxi-jh64kmdV2mLeyLvf2whGaqAxqPVYCqcB2cpRL4NQ8i8USGYqH=s88-c-k-c0x00ffffff-no-rj",
                msg: `Hello my name is ${randName1}`,
            },
            {
                id: 2,
                name: randName2,
                profile_url:
                    "https://yt3.ggpht.com/ytc/AIdro_la7HMSdE88q5qhePj85n4PtHkM8DBNk-BlzG10kYu0lTk=s88-c-k-c0x00ffffff-no-rj",
                msg: `Hello my name is ${randName2}`,
            },
        ];
        setMessages((prev) => {
            const newMessages = [...data, ...prev];
            return newMessages.splice(0, CHAT_WINDOW_LIMIT);
        });
    };

    useEffect(() => {
        // const interval = setInterval(() => {
        //     fetchMessages();
        // }, 1000);
        fetchMessages();
        // return () => clearInterval(interval);
    }, []);

    const startChat = () => {
        setIsChatRunning(true);
        chatIntervalRef.current = setInterval(() => {
            fetchMessages();
        }, 1000);
    }
    const stopChat = () => {
        clearInterval(chatIntervalRef.current);
        chatIntervalRef.current = null;
        setIsChatRunning(false)
    }

    const onInputChange = (e) => {
        setUserMsg(e.target.value);
    };

    const onSendClick = () => {
        if (userMsg) {
            setMessages((prev) => {
                const newMessages = [
                    {
                        id: prev.length + 1,
                        name: "You",
                        profile_url:
                            "https://yt3.ggpht.com/92RW86QZ_CnZxH5WeU6C0R2_Sh6z6AxFtXuXWJTILHboGvle3gBcXUJfwYhcVcOOPu79s2tmlA=s68-c-k-c0x00ffffff-no-rj",
                        msg: userMsg,
                    },
                    ...prev
                ];
                return newMessages.splice(0, CHAT_WINDOW_LIMIT);
            });
            setUserMsg("");
        }
    };

    return (
        <div className="bg-gray-200 h-[500px] w-96 flex flex-col justify-between relative border border-slate-600">
            <div className="msgs flex flex-col-reverse overflow-y-scroll p-5 ">
                {messages.map((data, idx) => (
                    <ChatMessage key={idx} {...data} />
                ))}
            </div>
            <div className="sticky bottom-0 flex justify-center items-center h-10 w-full">
                <button
                    className="w-[40px] h-full bg-blue-200 text-black rounded-l-md flex justify-center items-center"
                    onClick={isChatRunning ? stopChat : startChat}
                >
                    {isChatRunning ? <FaPauseCircle /> : <FaPlayCircle />}

                </button>
                <input
                    onChange={onInputChange}
                    type="text"
                    placeholder="Type your message here"
                    className=" w-full h-full border border-slate-600 p-2 focus:outline-none"
                    value={userMsg}
                />
                <button
                    className="w-[40px] h-full bg-blue-200 text-black rounded-r-md flex justify-center items-center"
                    onClick={onSendClick}
                >
                    <BsFillSendFill className=" rotate-[45deg]" />
                </button>
            </div>
        </div>
    );
};
