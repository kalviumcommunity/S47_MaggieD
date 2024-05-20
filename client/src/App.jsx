import React, { useState, useEffect } from 'react';
import './App.css';
import Entity from './assets/components/entity.jsx';
import Form from './assets/components/Form.jsx';
import Login from './assets/components/Login.jsx';

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const cookies = document.cookie.split(';').reduce((acc, cookie) => {
      const [name, value] = cookie.trim().split('=');
      acc[name] = value;
      return acc;
    }, {});
    if (cookies.username && cookies.password) {
      setIsLoggedIn(true);
    }

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

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3000/logout', {
        method: 'POST'
      });
      const data = await response.json();
      if (response.ok) {
        document.cookie = 'username=; Max-Age=0';
        document.cookie = 'password=; Max-Age=0';
        setIsLoggedIn(false);
        console.log(data.message);
      } else {
        console.error('Logout failed:', data.message);
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

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
      <button className="Logout" onClick={handleLogout}>Logout</button>
    </>
  );
}

export default App;