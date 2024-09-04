import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles/FormInput.css';

function FormInput({ formData, handleChange, handleImageChange, handleSubmit, darkMode, setDarkMode }) {
  const initialFormData = {
    openingSlide: '',
    images: [''],
    chartData: { title: '', labels: [''], values: [''] },
    codeBlock: '',
    pythonCode: '',
    closingSlide: '',
  };

  const [resetForm, setResetForm] = useState(false);

  const chartData = formData.chartData || initialFormData.chartData;

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Data:', formData);
    alert('Form submitted successfully!');
    handleSubmit(e);
    setResetForm(true);
  };

  // Reset form fields when resetForm is true
  useEffect(() => {
    if (resetForm) {
      handleChange({ target: { name: 'openingSlide', value: initialFormData.openingSlide } });
      handleChange({ target: { name: 'images', value: initialFormData.images } });
      handleChange({ target: { name: 'chartData', value: initialFormData.chartData } });
      handleChange({ target: { name: 'codeBlock', value: initialFormData.codeBlock } });
      handleChange({ target: { name: 'pythonCode', value: initialFormData.pythonCode } });
      handleChange({ target: { name: 'closingSlide', value: initialFormData.closingSlide } });
      setResetForm(false);
    }
  }, [resetForm, handleChange]);

  const handleChartChange = (index, field, value) => {
    const newChartData = { ...chartData };

    newChartData.labels = Array.isArray(newChartData.labels) ? newChartData.labels : [];
    newChartData.values = Array.isArray(newChartData.values) ? newChartData.values : [];

    if (field === 'title') {
      newChartData.title = value;
    } else {
      newChartData[field][index] = value;
    }

    handleChange({ target: { name: 'chartData', value: newChartData } });
  };

  const addChartField = () => {
    const newChartData = { ...chartData };

    newChartData.labels = Array.isArray(newChartData.labels) ? newChartData.labels : [];
    newChartData.values = Array.isArray(newChartData.values) ? newChartData.values : [];

    newChartData.labels.push('');
    newChartData.values.push('');
    handleChange({ target: { name: 'chartData', value: newChartData } });
  };

  return (
    <div className={`form-container ${darkMode ? 'dark-mode' : ''}`}>
      <button className="dark-mode-btn" type="button" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      <h2>Presentation Data Input</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>Opening Slide:</label>
          <textarea name="openingSlide" value={formData.openingSlide} onChange={handleChange} />
        </div>
        <div>
          <label>Images:</label>
          {formData.images.map((image, index) => (
            <div key={index} className="image-upload">
              <input
                className="file-upload"
                type="file"
                onChange={(e) => handleImageChange(index, e.target.files[0])}
                accept="image/*"
              />
              {image && <img src={image} alt={`Uploaded ${index + 1}`} className="preview-image" />}
            </div>
          ))}
          <button className="image-add-btn" type="button" onClick={() => handleImageChange(formData.images.length, '')}>
            Add More Image
          </button>
        </div>
        <div>
          <label>Chart Data:</label>
          <input
            type="text"
            placeholder="Chart Title"
            value={chartData.title}
            onChange={(e) => handleChartChange(null, 'title', e.target.value)}
          />
          {chartData.labels.map((label, index) => (
            <div key={index} className="chart-input-group">
              <input
                className="chart-input-label"
                type="text"
                placeholder="Label"
                value={label}
                onChange={(e) => handleChartChange(index, 'labels', e.target.value)}
              />
              <input
                className="chart-input-field"
                type="number"
                placeholder="Value"
                value={chartData.values[index]}
                onChange={(e) => handleChartChange(index, 'values', e.target.value)}
              />
            </div>
          ))}
          <button className="chart-add-btn" type="button" onClick={addChartField}>
            Add More Data Point
          </button>
        </div>
        <div>
          <label>Code Block:</label>
          <textarea name="codeBlock" value={formData.codeBlock} onChange={handleChange} />
        </div>
        <div>
          <label>Python Code:</label>
          <textarea name="pythonCode" value={formData.pythonCode} onChange={handleChange} />
        </div>
        <div>
          <label>Closing Slide:</label>
          <textarea name="closingSlide" value={formData.closingSlide} onChange={handleChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
      <Link to="/presentation" className="link">Go to Presentation</Link>
    </div>
  );
}

export default FormInput;


