import React from 'react'
import { useState } from 'react';
import './App.css';
import Entity from './assets/components/entity.jsx'

function App() {
  const dummyData = [
    {act: "I",
    _id : 1,
    title:"The Boiling of Milk",
    description:`Enter now, fair maidens and valiant squires,
    To witness the first act of this culinary tale..
    Behold, the cauldron of milk, as pure as snow,
    Set upon the hearth, its contents to bestow.

    With gentle flame, the milk doth stir and sway,
    Its surface kissed by the fire's tender ray.
    As bubbles rise, a symphony of sound,
    In this humble pot, a transformation profound.

    Oh, how the milk doth dance, in swirling delight,
    As if the very stars had descended this night.
    A potion of richness, to nourish and bless,
    In this alchemy of cookery, we find our success.

  So let us watch, with keen eyes aglow,
    As the milk boils and froths, in ebb and in flow.
    For in this simple act, we lay the foundation,
    Of a Maggie divine, fit for any occasion.`}
  ]
  return (
    <>
      <div className="Intro">
      <h1>S47 Special Maggie Recipe</h1>
      <p>Hark, gentlefolk! Within this digital tome, amidst the swirling chaos of our world, doth lie a culinary odyssey unlike any other – the creation of a Maggie recipe, by none other than the esteemed Squad 47. Here, each noble member shall bestow an ingredient, weaving a tapestry of flavors fit for kings and queens. Join us, fair comrades, as we embark upon this epicurean journey, where each spice and herb shall dance upon the palate like Shakespearean verse.</p>
    </div>
      <div className="entities-container"> 
        {dummyData.map((entity) => (
          <Entity  key ={entity._id}  data={entity} />
        ))
        }
      </div>

    </>
  );
}

export default App;