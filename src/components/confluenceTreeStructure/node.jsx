/* eslint-disable react/prop-types */
import { BsChevronDown } from "react-icons/bs";
import { FaCircle } from "react-icons/fa";
import { useState } from "react";
import clsx from "clsx";


export const Node = (props) => {
  const { data } = props;
  const { label, link, children } = data;

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(open => !open);
  const icon = children && children.length ? (
      <BsChevronDown onClick={toggle} className={clsx('cursor-pointer', isOpen && 'rotate-[-90deg]' )} />
    ) : <FaCircle size={6} />;

  return (
    <li className="flex flex-col">
      <div className="flex items-center">
        <div className="icon w-4 h-4 flex justify-center items-center">
          {icon}
        </div>
        <a href={link} className="text pl-2 text-blue-500">{label}</a>
      </div>
      {children && children.length && isOpen && (
        // add animation here
        <ul className="pl-3">
          {children.map((item) => {
            return <Node key={item.id} data={item} />;
          })}
        </ul>
      )}
    </li>
  )
}