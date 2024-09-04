import React from 'react';
import './styles/OpeningSlide.css';

function OpeningSlide({ content, darkMode }) {
    return (
        <div className={`opening-slide ${darkMode ? 'dark-mode' : ''}`}>
            <h2>Opening Slide</h2>
            <p>{content}</p>
        </div>
    );
}

export default OpeningSlide;
