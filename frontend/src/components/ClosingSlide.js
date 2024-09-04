import React from 'react';
import './styles/ClosingSlide.css';

function ClosingSlide({ content,darkMode }) {
    return (
        <div className={`closing-slide ${darkMode ? 'dark-mode' : ''}`}>
            <h2>Closing Slide</h2>
            <p>{content}</p>
        </div>
    );
}


export default ClosingSlide;
