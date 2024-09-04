



import React, { useState } from 'react';
import './styles/ImagesSlide.css';

function ImagesSlide({ images, darkMode }) {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        if (currentSlide < images.length - 1) {
            setCurrentSlide((prevSlide) => prevSlide + 1);
        }
    };

    const prevSlide = () => {
        if (currentSlide > 0) {
            setCurrentSlide((prevSlide) => prevSlide - 1);
        }
    };

    return (
        <div className={`images-slide ${darkMode ? 'dark-mode' : ''}`}>
            <h2>Images Slide</h2>
            <div className="slider">
                {images.length > 0 && (
                    <img
                        className='image-adjust'
                        src={images[currentSlide]}
                        alt={`Slide Image ${currentSlide + 1}`}
                    />
                )}
            </div>
            {images.length > 1 && (
                <div className="navigation">
                    <button
                        onClick={prevSlide}
                        disabled={currentSlide === 0}
                    >
                        Previous
                    </button>
                    <button
                        onClick={nextSlide}
                        disabled={currentSlide === images.length - 1}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}

export default ImagesSlide;
