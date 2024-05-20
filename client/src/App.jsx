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
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      fetchData(token);
    }
  }, [isLoggedIn]);

  const fetchData = async (token) => {
    try {
      const response = await fetch('http://localhost:3000/getting', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setData(data);

      const uniqueUsers = [...new Set(data.map(entity => entity.createdBy))];
      setUsers(uniqueUsers);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:3000/deleting/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
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
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        console.log(data.message);
      } else {
        console.error('Logout failed:', data.message);
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
  };

  const filteredData = selectedUser ? data.filter(entity => entity.createdBy === selectedUser) : data;

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <>
      <div className="Intro">
        <h1>S47 Special Maggie Recipe</h1>
        <p>Hark, gentlefolk! Within this digital tome, amidst the swirling chaos of our world, doth lie a culinary odyssey unlike any other – the creation of a Maggie recipe, by none other than the esteemed Squad 47. Here, each noble member shall bestow an ingredient, weaving a tapestry of flavors fit for kings and queens. Join us, fair comrades, as we embark upon this epicurean journey, where each spice and herb shall dance upon the palate like Shakespearean verse.</p>
      </div>
      <div className="filter-container">
        <label htmlFor="userFilter">Filter by User:</label>
        <select id="userFilter" value={selectedUser} onChange={handleUserChange}>
          <option value="">All Users</option>
          {users.map(user => (
            <option key={user} value={user}>{user}</option>
          ))}
        </select>
      </div>
      <div className="entities-container">
        {filteredData.map((entity) => (
          <Entity key={entity._id} data={entity} handleDelete={handleDelete} handleUpdate={handleUpdate} />
        ))}
      </div>
      <div className="Add">
        <button onClick={toggleFormVisibility}>{formVisible ? 'Cancel Form' : 'Add Entity'}</button>
        {formVisible && <Form setData={setData} formType={formType} formData={formData} setFormData={setFormData} setFormType={setFormType} setUsers={setUsers} />}
      </div>
      <button className="Logout" onClick={handleLogout}>Logout</button>
    </>
  );
}

export default App;