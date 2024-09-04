
import React, { useState, useEffect } from 'react';
import './styles/PythonCompilerSlide.css';

function PythonCompilerSlide({ pythonCode,darkMode }) {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [pyodide, setPyodide] = useState(null);

  useEffect(() => {
    
    const loadPyodide = async () => {
      try {
        const pyodideInstance = await window.loadPyodide();
        console.log('Pyodide loaded');
        setPyodide(pyodideInstance);
      } catch (error) {
        console.error('Error loading Pyodide:', error);
      }
    };
    loadPyodide();
  }, []);

  useEffect(() => {
    
    setCode(pythonCode);
  }, [pythonCode]);

  const runCode = async () => {
    if (!pyodide) {
      setOutput('Pyodide is not loaded yet.');
      return;
    }

    setOutput(''); 

    try {
      console.log('Running code:', code);
      
      const result = await pyodide.runPythonAsync(`
import sys
import io

# Capture stdout and stderr
stdout = io.StringIO()
stderr = io.StringIO()

sys.stdout = stdout
sys.stderr = stderr

# Run user code
try:
  exec('''${code}''')
except Exception as e:
  print(f"Error: {e}", file=stderr)

sys.stdout = sys.__stdout__
sys.stderr = sys.__stderr__

(stdout.getvalue(), stderr.getvalue())
      `);

      
      const [stdout, stderr] = result;

      
      setOutput(stderr ? `Error: ${stderr}` : stdout);
    } catch (err) {
      console.error('Error running Python code:', err);
      setOutput(err.toString());
    }
  };

  return (
    <div  className={`python-compiler-slide ${darkMode ? 'dark-mode' : ''}`}>
      <h2>Python Compiler Slide</h2>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Write your Python code here..."
      />
      <button onClick={runCode}>Run Code</button>
      <pre>{output}</pre>
    </div>
  );
}

export default PythonCompilerSlide;
