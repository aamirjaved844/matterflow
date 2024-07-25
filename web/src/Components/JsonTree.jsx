import React from 'react'
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/solid";

const ShowBrackets = ({ data, length }) => {
  const text = length > 1 ? "items" : "item";
  const brackets = Array.isArray(data) ? " [...]" : " {...}";
  return (
    <span className="text-gray-500">
      {`${brackets} // ${length} ${text}`}
    </span>
  );
};

const JsonTree = ({ data, parentName = "JSON Root" }) => {
    const [open, setOpen] = React.useState(false);
    const length = Object.keys(data).length

    const handleClick = () => {
      setOpen(!open);
    };
  
    const handleDragStart = (e) => {
        const target = e.target;
        //console.log(target);
        e.dataTransfer.setData('field_inner_html', target.innerHTML)
    }

    return (
      <>
        {data && (
          <div className="flex items-center cursor-pointer" onClick={handleClick}>
            <div className="flex-shrink-0 text-red-500">
              {open ? <ChevronDownIcon className="w-5 h-5" /> : <ChevronRightIcon className="w-5 h-5" />}
            </div>
            <div className="flex-1 ml-2">
              <b>{parentName} </b>
              {!open && <ShowBrackets data={data} length={length} />}
            </div>
          </div>
        )}
        {open && (
          <div className="pl-8">
            <ul className="list-none p-0">
              {data &&
                Object.keys(data).map((k) => {
                  return data[k] != null && typeof data[k] === "object" ? (
                    <JsonTree
                      key={k}
                      data={data[k]}
                      parentName={Array.isArray(data) ? "" : k}
                      
                    />
                  ) : (
                    <li id={99999} draggable={true} onDragStart={handleDragStart} key={k} className="flex items-center py-1">
                      {!Array.isArray(data) && (
                        <div className="mr-2 font-semibold">{k} :</div>
                      )}
                      <div>{data[k] === null ? "null" : data[k].toString()}</div>
                    </li>
                  );
                })}
            </ul>
          </div>
        )}
      </>
    );
}

export default JsonTree