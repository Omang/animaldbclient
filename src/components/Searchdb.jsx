import { useState } from "react";
import { useAsyncDebounce } from "react-table";

const Searchdb = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter
}) => {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);

  const onChange = (value)=>{
    setGlobalFilter(value || undefined);
  }

  return (
    <div>
      <div className="inline-flex mt-4 -mb-5">
            <input className=" mb-8 rounded-2xl border border-green-500 px-4 py-2" value={value || undefined} onChange={(e)=>{
              setValue(e.target.value);
              onChange(e.target.value);
            }}  placeholder={`${count} records...`}  />
            
          </div>
    </div>
  )
}

export default Searchdb
