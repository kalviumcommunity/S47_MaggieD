import React, { useState, useEffect } from 'react';

function Form({ setData, formType, formData, setFormData, setFormType }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = formType === 'Add' ? 'http://localhost:3000/posting' : `http://localhost:3000/updating/${formData._id}`;
    const method = formType === 'Add' ? 'POST' : 'PUT';

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const newEntity = await response.json();
        setData(prevData => {
          if (formType === 'Add') {
            return [...prevData, newEntity];
          } else {
            return prevData.map(entity => entity._id === newEntity._id ? newEntity : entity);
          }
        });
        setFormData({
          act: '',
          title: '',
          description: '',
          createdBy: ''
        });
        setFormType('Add');
      } else {
        console.error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="act">Act:</label>
        <input
          type="text"
          id="act"
          name="act"
          value={formData.act}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="createdBy">Created By:</label>
        <input
          type="text"
          id="createdBy"
          name="createdBy"
          value={formData.createdBy}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">{formType} Entity</button>
    </form>
  );
}

export default Form;