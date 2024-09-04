






import React from 'react';
import OpeningSlide from "./OpeningSlide";
import ImagesSlide from "./ImagesSlide";
import ChartSlide from "./ChartSlide";
import CodeBlockSlide from "./CodeBlockSlide";
import PythonCompilerSlide from "./PythonCompilerSlide";
import ClosingSlide from "./ClosingSlide";
import { useNavigate } from 'react-router-dom';
import './styles/PresentationSlide.css';
import demoLogo from '../assests/logo.png';

function PresentationSlides({ formData, darkMode, watermarkText = "Watermark" }) {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = React.useState(0);

  
  const availableSlides = [
    formData.openingSlide && <OpeningSlide key="opening" content={formData.openingSlide} darkMode={darkMode} />,
    formData.images.some(img => img) && <ImagesSlide key="images" images={formData.images} darkMode={darkMode} />,
    formData.chartData.labels.some(label => label) && <ChartSlide key="chart" data={formData.chartData} darkMode={darkMode} />,
    formData.codeBlock && <CodeBlockSlide key="code" code={formData.codeBlock} darkMode={darkMode} />,
    formData.pythonCode && <PythonCompilerSlide key="python" pythonCode={formData.pythonCode} darkMode={darkMode} />,
    formData.closingSlide && <ClosingSlide key="closing" content={formData.closingSlide} darkMode={darkMode} />
  ].filter(Boolean);

  const handleNext = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, availableSlides.length - 1));
  };

  const handlePrevious = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className={`slide-container ${darkMode ? 'dark-mode' : ''}`}>
      <img src={demoLogo} alt="Demo Logo" className="demo-logo" />

      {availableSlides.length === 0 ? (
        <div className="no-data-message">
          <h2>No Data Available</h2>
          <p>Please go back to the form and submit data first.</p>
          <button onClick={() => navigate('/form')}>Go to Form</button>
        </div>
      ) : (
        <>
          {availableSlides[currentSlide]}
          <div className="watermark-text">{watermarkText}</div>
          <div className="nav-buttons">
            <button onClick={handlePrevious} disabled={currentSlide === 0}>
              Previous
            </button>
            <button onClick={() => navigate('/form')}>Back to Form</button>
            <button onClick={handleNext} disabled={currentSlide === availableSlides.length - 1}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default PresentationSlides;
