import React from 'react';
import './styles/CodeBlockSlide.css';

function CodeBlockSlide({ code,darkMode }) {
    return (
        <div  className={`code-block-slide ${darkMode ? 'dark-mode' : ''}`}>
            <h2>Code Block Slide</h2>
            <pre>{code}</pre>
        </div>
    );
}

export default CodeBlockSlide;
