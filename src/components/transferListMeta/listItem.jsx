/* eslint-disable react/prop-types */


export const ListItem = ({id,title,onChange, checked}) => {
  return (
    <div className="flex items-center">
        <input type="checkbox" id={id} name={`list-checkbox-${id}`} value={checked} onChange={onChange}></input>
        <label htmlFor={`list-checkbox-${id}`} className="pl-1">{title}</label>
    </div>
  )
}