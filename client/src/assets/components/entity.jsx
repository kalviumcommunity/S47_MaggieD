import React from 'react';

function Entity({data}){
  return(
  <div className ="entity">
    <h2>Act {data.act} : {data.title}</h2>
    <p> {data.description} </p>
  </div>
  );

}

export default Entity;