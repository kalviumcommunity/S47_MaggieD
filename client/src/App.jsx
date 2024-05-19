import React from 'react'
import { useState, useEffect } from 'react';
import './App.css';
import Entity from './assets/components/entity.jsx'

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/getting') // Add http:// prefix to the URL
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error(`Error fetching data:`, error)); // Corrected error message
  }, []);
  
    return (
    <>
      <div className="Intro">
      <h1>S47 Special Maggie Recipe</h1>
      <p>Hark, gentlefolk! Within this digital tome, amidst the swirling chaos of our world, doth lie a culinary odyssey unlike any other – the creation of a Maggie recipe, by none other than the esteemed Squad 47. Here, each noble member shall bestow an ingredient, weaving a tapestry of flavors fit for kings and queens. Join us, fair comrades, as we embark upon this epicurean journey, where each spice and herb shall dance upon the palate like Shakespearean verse.</p>
    </div>
      <div className="entities-container"> 
        {data.map((entity) => (
          <Entity  key ={entity._id}  data={entity} />
        ))
        }
      </div>

    </>
  );
}

export default App;