import React, { useState, useEffect } from 'react';
import './App.css';
import Entity from './assets/components/entity.jsx';
import Form from './assets/components/Form.jsx';

function App() {
  const [data, setData] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [formType, setFormType] = useState('Add');
  const [formData, setFormData] = useState({
    act: '',
    title: '',
    description: '',
    createdBy: ''
  });

  useEffect(() => {
    fetch('http://localhost:3000/getting')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/deleting/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setData(prevData => prevData.filter(entity => entity._id !== id));
        console.log('Entity deleted successfully');
      } else {
        console.error('Failed to delete entity');
      }
    } catch (error) {
      console.error('Error deleting entity:', error);
    }
  };

  const handleUpdate = (entity) => {
    setFormData(entity);
    setFormType('Update');
    setFormVisible(true);
  };

  const toggleFormVisibility = () => {
    setFormVisible(!formVisible);
    setFormType('Add');
    setFormData({
      act: '',
      title: '',
      description: '',
      createdBy: ''
    });
  };

  return (
    <>
      <div className="Intro">
        <h1>S47 Special Maggie Recipe</h1>
        <p>Hark, gentlefolk! Within this digital tome, amidst the swirling chaos of our world, doth lie a culinary odyssey unlike any other – the creation of a Maggie recipe, by none other than the esteemed Squad 47. Here, each noble member shall bestow an ingredient, weaving a tapestry of flavors fit for kings and queens. Join us, fair comrades, as we embark upon this epicurean journey, where each spice and herb shall dance upon the palate like Shakespearean verse.</p>
      </div>
      <div className="entities-container">
        {data.map((entity) => (
          <Entity key={entity._id} data={entity} handleDelete={handleDelete} handleUpdate={handleUpdate} />
        ))}
      </div>
      <div className="Add">
        <button onClick={toggleFormVisibility}>{formVisible ? 'Cancel Form' : 'Add Entity'}</button>
        {formVisible && <Form setData={setData} formType={formType} formData={formData} setFormData={setFormData} setFormType={setFormType} />}
      </div>
    </>
  );
}

export default App;