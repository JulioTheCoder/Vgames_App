import React from "react";

export default function SelectOptions({nameOptions}){

  return(
    <>
      {
      nameOptions.map(o => <option value={o.name} key={o.id} >{o.name}</option>)
    }
    </>
    
  );
  
}