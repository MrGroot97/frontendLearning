import { RiJavascriptFill, RiNextjsFill } from "react-icons/ri";
import { FaJava, FaNode, FaUbuntu } from "react-icons/fa";
import { TiHtml5 } from "react-icons/ti";
import { IoLogoFigma } from "react-icons/io5";
import { FaReact, FaPython, FaDocker } from "react-icons/fa6";
import {
    SiMysql,
    SiCsswizardry,
    SiTypescript,
    SiMongodb,
    SiOpencv,
    SiTensorflow,
    SiApachekafka,
    SiKubernetes,
    SiJenkins
} from "react-icons/si";
import { DiRedis } from "react-icons/di";
import clsx from "clsx";

const skillsList = [
    { Icon: TiHtml5, name: "HTML5", className: "hover:text-red-500" },
    { Icon: SiCsswizardry, name: "CSS3", className: "hover:text-blue-500" },
    { Icon: RiJavascriptFill, name: "JavaScript", className: "hover:text-yellow-400" },
    { Icon: FaReact, name: "React", className: "hover:text-blue-400" },
    { Icon: SiTypescript, name: "TypeScript", className: "hover:text-blue-500" },
    { Icon: RiNextjsFill, name: "Next.js", className: "hover:text-black" },
    { Icon: FaPython, name: "Python", className: "hover:text-blue-500" },
    { Icon: SiOpencv, name: "OpenCV", className: "hover:text-yellow-500" },
    { Icon: SiTensorflow, name: "Tensorflow", className: "hover:text-yellow-500" },
    { Icon: IoLogoFigma, name: "Figma", className: "hover:text-blue-400" },
    { Icon: SiMysql, name: "MySQL", className: "hover:text-blue-500" },
    { Icon: SiMongodb, name: "MongoDB", className: "hover:text-green-500" },
    { Icon: FaNode, name: "Node.js", className: "hover:text-green-500" },
    { Icon: FaJava, name: "Java", className: "hover:text-red-500" },
    { Icon: FaDocker, name: "Docker", className: "hover:text-blue-400" },
    { Icon: SiApachekafka, name: "Apache Kafka", className: "hover:text-black" },
    { Icon: DiRedis, name: "Redis", className: "hover:text-red-500" },
    { Icon: FaUbuntu, name: "Ubuntu", className: "hover:text-orange-500" },
    { Icon: SiKubernetes, name: "Kubernetes", className: "hover:text-blue-500" },
    { Icon: SiJenkins, name: "Jenkins", className: "hover:text-red-500" },
];

const Logo = ({ Icon, name, className }) => {
    const iconClass = clsx(
        "w-12 h-12 border rounded-lg bg-slate-50 text-slate-800 shrink-0",
        "hover:scale-110 duration-300 p-0.5 rounded-md",
        className
    );
    return (
        <div className={iconClass}>
            <Icon className="w-full h-full" />
            <p className="text-center text-xs hidden">{name}</p>
        </div>
    );
};

const Skills = () => {

    return <div className="skills">
        <div className="skills-list-1">
            {skillsList.slice(0, Math.floor(skillsList.length /2)).map((skill, index) => (
                <Logo key={`${index}_${skill.name}`} {...skill} />
            ))}
        </div>
        <div className="skills-list-2">
            {skillsList.slice(Math.floor(skillsList.length /2)).map((skill, index) => (
                <Logo key={`${index}_${skill.name}`} {...skill} />
            ))}
        </div>
    </div>;
};

export default Skills;
