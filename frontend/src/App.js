import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import FormInput from "./components/FormInput";
import PresentationSlides from "./components/PresentationSlides";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    openingSlide: "",
    images: [""],
    chartData: { labels: [""], values: [""] },
    codeBlock: "",
    pythonCode: "",
    closingSlide: "",
  });
  const [fetchedData, setFetchedData] = useState({
    openingSlide: "",
    images: [""],
    chartData: { title: "", labels: [""], values: [""] },
    codeBlock: "",
    pythonCode: "",
    closingSlide: "",
  });
  const [loading, setLoading] = useState(true);

  const updateFetchedData = async (newData) => {
    setFetchedData(newData);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/data");
        if (response.ok) {
          const data = await response.json();
          setFetchedData(data);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array to ensure it runs only once

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Form data saved successfully");
        updateFetchedData(formData); // Update fetchedData with new data
      } else {
        console.error("Failed to save form data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Router>
      <div className={`App ${darkMode ? "dark-mode" : ""}`}>
        <Header />
        <button
          className="dark-mode-btn"
          type="button"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
        <Routes>
          <Route
            path="/form"
            element={
              <FormInput
                formData={formData}
                handleChange={(e) => {
                  const { name, value } = e.target;
                  setFormData({ ...formData, [name]: value });
                }}
                handleImageChange={(index, file) => {
                  const newImages = [...formData.images];
                  const reader = new FileReader();

                  reader.onloadend = () => {
                    newImages[index] = reader.result;
                    setFormData({ ...formData, images: newImages });
                  };

                  if (file) {
                    reader.readAsDataURL(file);
                  } else {
                    newImages[index] = "";
                    setFormData({ ...formData, images: newImages });
                  }
                }}
                handleSubmit={handleSubmit}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
            }
          />
          <Route
            path="/presentation"
            element={
              loading ? (
                <p>Loading...</p>
              ) : (
                <PresentationSlides
                  formData={fetchedData}
                  darkMode={darkMode}
                />
              )
            }
          />
          <Route
            path="/"
            element={
              <div className="full-window">
                <h2>Welcome to the Presentation App</h2>
                <p>Select a route</p>
                <Link to="/form" className="go-to-form">
                  Go to Form
                </Link>
                <br />
                <Link to="/presentation" className="go-to-presentation">
                  Go to Presentation
                </Link>
              </div>
            }
          />
        </Routes>
        <Footer darkMode={darkMode} />
      </div>
    </Router>
  );
}

export default App;
