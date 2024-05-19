import React from 'react';

function Entity({ data, handleDelete, handleUpdate }) {
  return (
    <div className="entity">
      <h2>Act {data.act} : {data.title}</h2>
      <p>{data.description}</p>
     <h3>~ {data.createdBy} </h3>
      <br />
      <button onClick={() => handleUpdate(data)}>Update</button>
      <button onClick={() => handleDelete(data._id)}>Delete</button>
    </div>
  );
}

export default Entity;
