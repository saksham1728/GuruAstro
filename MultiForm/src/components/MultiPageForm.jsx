import React, { useState, useEffect } from 'react';
// Ensure this path is correct

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  });
  const [showPopup, setShowPopup] = useState(false);
  const [suggestions, setSuggestions] = useState({});

  useEffect(() => {
    // Retrieve previous form data from local storage
    const storedData = JSON.parse(localStorage.getItem('formData'));
    if (storedData) {
      setFormData(storedData);
    }
    
    // Retrieve previous suggestions from local storage
    const storedSuggestions = JSON.parse(localStorage.getItem('suggestions'));
    if (storedSuggestions) {
      setSuggestions(storedSuggestions);
    }
  }, []);

  useEffect(() => {
    // Save form data to local storage
    localStorage.setItem('formData', JSON.stringify(formData));
    
    // Save suggestions to local storage
    localStorage.setItem('suggestions', JSON.stringify(suggestions));
  }, [formData, suggestions]);

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.zip) newErrors.zip = 'ZIP Code is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1) {
      if (validateStep1()) setStep(step + 1);
    } else if (step === 2) {
      if (validateStep2()) setStep(step + 1);
    } else if (step === 3) {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear the error for the field being edited
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const handleSubmit = () => {
    setStep(1);
    // Store suggestions based on current form data
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    // Clear form data from local storage after closing popup
    localStorage.removeItem('formData');
  };

  return (
    <div className="multi-step-container">
      <div className="step-indicators">
        <div className={`indicator ${step === 1 ? 'active' : step > 1 ? 'completed' : ''}`}>1</div>
        <div className={`indicator ${step === 2 ? 'active' : step > 2 ? 'completed' : ''}`}>2</div>
        <div className={`indicator ${step === 3 ? 'active' : step > 3 ? 'completed' : ''}`}>3</div>
      </div>

      <div className={`multi-step-content ${step === 1 ? 'active' : ''}`}>
        <h1>Personal Information</h1>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <p className="error">{errors.name}</p>}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className="error">{errors.email}</p>}
        <div className="button-group">
          <button type="button" disabled={step === 1} onClick={handlePrevious}>Back</button>
          <button type="button" onClick={handleNext}>Next</button>
        </div>
      </div>

      <div className={`multi-step-content ${step === 2 ? 'active' : ''}`}>
        <h1>Address Information</h1>
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
        />
        {errors.address && <p className="error">{errors.address}</p>}
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
        />
        {errors.city && <p className="error">{errors.city}</p>}
        <input
          type="text"
          name="state"
          placeholder="State"
          value={formData.state}
          onChange={handleChange}
        />
        {errors.state && <p className="error">{errors.state}</p>}
        <input
          type="text"
          name="zip"
          placeholder="ZIP Code"
          value={formData.zip}
          onChange={handleChange}
        />
        {errors.zip && <p className="error">{errors.zip}</p>}
        <div className="button-group">
          <button type="button" disabled={step === 1} onClick={handlePrevious}>Back</button>
          <button type="button" onClick={handleNext}>Next</button>
        </div>
      </div>

      <div className={`multi-step-content ${step === 3 ? 'active' : ''}`}>
        <h1>Confirmation</h1>
        <p>Name: {formData.name}</p>
        <p>Email: {formData.email}</p>
        <p>Address: {formData.address}</p>
        <p>City: {formData.city}</p>
        <p>State: {formData.state}</p>
        <p>ZIP Code: {formData.zip}</p>
        <div className="button-group">
          <button type="button" disabled={step === 1} onClick={handlePrevious}>Back</button>
          <button type="button" onClick={handleNext}>Submit</button>
        </div>
      </div>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Form Submitted</h2>
            <p>Your form has been successfully submitted.</p>
            <button onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}

      {step === 1 && suggestions[formData.email] && (
        <div className="suggestions">
          <h2>Suggestions Based on Previous Responses</h2>
          <p><strong>Name:</strong> {suggestions[formData.email].name}</p>
          <p><strong>Address:</strong> {suggestions[formData.email].address}</p>
          <p><strong>City:</strong> {suggestions[formData.email].city}</p>
          <p><strong>State:</strong> {suggestions[formData.email].state}</p>
          <p><strong>ZIP Code:</strong> {suggestions[formData.email].zip}</p>
        </div>
      )}
    </div>
  );
};

export default MultiStepForm;
