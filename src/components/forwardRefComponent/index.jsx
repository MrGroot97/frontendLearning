import { useRef, forwardRef } from 'react';

// eslint-disable-next-line react/display-name
const ForwardRefInput = forwardRef((props, ref) => {
    return (
        <input type="text" ref={ref} className='bg-slate-300 rounded-md pl-2' placeholder='input here'/>
    )
})

export const InputComponent = () =>{
    const inputRef = useRef(null);

    const handleClick = () => {
        inputRef.current.focus();
    }

    return (
        <div className='flex flex-col items-center justify-center w-[300px] md:w-[350px] lg:w-[450px] md:flex-row'>
            <ForwardRefInput ref={inputRef}/>
            <button className="bg-blue-300 rounded-lg px-3 my-2 md:ml-5 md:my-0" onClick={handleClick}>Focus input</button>
        </div>
    )
}