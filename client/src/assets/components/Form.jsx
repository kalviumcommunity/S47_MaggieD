import React, { useState } from 'react';
import Joi from 'joi';

function Form({ setData, formType, formData, setFormData, setFormType }) {
  const [errors, setErrors] = useState({});

  // Function to validate Roman numerals up to 16 or 17
  const validateRomanNumeral = (value, helpers) => {
    const romanRegex = /^(XVI|XV|XIV|XIII|XII|XI|X|IX|VIII|VII|VI|V|IV|III|II|I)$/;
    if (!romanRegex.test(value)) {
      return helpers.error('any.invalid');
    }
    return value;
  };

  const schema = Joi.object({
    act: Joi.string().custom(validateRomanNumeral, 'Roman numeral validation').required().label('Act'),
    title: Joi.string().min(4).required().label('Title'),
    description: Joi.string().required().label('Description'),
    createdBy: Joi.string().required().label('Created By')
  });

  const validate = () => {
    const result = schema.validate(formData, { abortEarly: false, allowUnknown: true });
    if (!result.error) return null;

    const newErrors = {};
    for (let item of result.error.details) {
      newErrors[item.path[0]] = item.message;
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (validationErrors) {
      setErrors(validationErrors);
      return;
    }

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
        setErrors({});
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
        {errors.act && <div className="alert alert-danger">{errors.act}</div>}
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
        {errors.title && <div className="alert alert-danger">{errors.title}</div>}
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
        {errors.description && <div className="alert alert-danger">{errors.description}</div>}
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
        {errors.createdBy && <div className="alert alert-danger">{errors.createdBy}</div>}
      </div>
      <button type="submit">{formType} Entity</button>
    </form>
  );
}

export default Form;