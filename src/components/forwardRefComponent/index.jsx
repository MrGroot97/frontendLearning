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
        <div className='flex w-[400px]'>
            <ForwardRefInput ref={inputRef}/>
            <button className="bg-blue-300 rounded-lg px-3 ml-5" onClick={handleClick}>Focus input</button>
        </div>
    )
}