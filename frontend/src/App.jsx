import { useState } from "react";
import "./App.css";

const initialForm = {
  BMI: "",
  PhysicalHealth: "",
  MentalHealth: "",
  SleepTime: "",
  Smoking_Yes: 0,
  AlcoholDrinking_Yes: 0,
  Stroke_Yes: 0,
  DiffWalking_Yes: 0,
  Sex_Male: 0,
  AgeCategory: "25-29",
  Race: "White",
  Diabetic_Yes: 0,
  PhysicalActivity_Yes: 0,
  GenHealth: "Good",
  Asthma_Yes: 0,
  KidneyDisease_Yes: 0,
  SkinCancer_Yes: 0,
};

function App() {
  const [formData, setFormData] = useState(initialForm);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setResult("");

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.error) {
        setResult("Unable to process prediction.");
      } else {
        setResult(data.result);
      }
    } catch (error) {
      setResult("Error connecting to backend.");
    }

    setLoading(false);
  };

  const handleReset = () => {
    setFormData(initialForm);
    setResult("");
  };

  return (
    <div className="container">

      <header className="header">
        <div className="logo">❤️</div>

        <h1>Heart Disease Prediction</h1>

        <p>
          ML-powered heart disease risk prediction system
        </p>
      </header>

      <main className="form-card">

        {/* Basic Health */}

        <section className="section">
          <div className="section-title">
            <span className="section-icon">🩺</span>
            <h2>Basic Health Information</h2>
          </div>

          <div className="form-grid">

            <div className="field">
              <label>BMI</label>
              <input
                type="number"
                step="any"
                name="BMI"
                placeholder="Enter BMI"
                value={formData.BMI}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label>Sleep Time (hours)</label>
              <input
                type="number"
                name="SleepTime"
                placeholder="e.g. 7"
                value={formData.SleepTime}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label>Physical Health (0-30)</label>
              <input
                type="number"
                name="PhysicalHealth"
                min="0"
                max="30"
                placeholder="0 - 30"
                value={formData.PhysicalHealth}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label>Mental Health (0-30)</label>
              <input
                type="number"
                name="MentalHealth"
                min="0"
                max="30"
                placeholder="0 - 30"
                value={formData.MentalHealth}
                onChange={handleChange}
                required
              />
            </div>

          </div>
        </section>

        {/* Personal Information */}

        <section className="section">
          <div className="section-title">
            <span className="section-icon">👤</span>
            <h2>Personal Information</h2>
          </div>

          <div className="form-grid">

            <div className="field">
              <label>Age Category</label>
              <select
                name="AgeCategory"
                value={formData.AgeCategory}
                onChange={handleChange}
              >
                <option value="25-29">25-29</option>
                <option value="30-34">30-34</option>
                <option value="35-39">35-39</option>
                <option value="40-44">40-44</option>
                <option value="45-49">45-49</option>
                <option value="50-54">50-54</option>
                <option value="55-59">55-59</option>
                <option value="60-64">60-64</option>
                <option value="65-69">65-69</option>
                <option value="70-74">70-74</option>
                <option value="75-79">75-79</option>
                <option value="80 or older">80 or older</option>
              </select>
            </div>

            <div className="field">
              <label>Gender</label>
              <select
                name="Sex_Male"
                value={formData.Sex_Male}
                onChange={handleChange}
              >
                <option value="0">Female</option>
                <option value="1">Male</option>
              </select>
            </div>

            <div className="field">
              <label>Race</label>
              <select
                name="Race"
                value={formData.Race}
                onChange={handleChange}
              >
                <option value="White">White</option>
                <option value="Black">Black</option>
                <option value="Asian">Asian</option>
                <option value="Hispanic">Hispanic</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="field">
              <label>General Health</label>
              <select
                name="GenHealth"
                value={formData.GenHealth}
                onChange={handleChange}
              >
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
                <option value="Poor">Poor</option>
                <option value="Very good">Very good</option>
              </select>
            </div>

          </div>
        </section>

        {/* Lifestyle */}

        <section className="section">
          <div className="section-title">
            <span className="section-icon">🏃</span>
            <h2>Lifestyle & Medical History</h2>
          </div>

          <div className="form-grid">

            <div className="field">
              <label>Smoking</label>
              <select
                name="Smoking_Yes"
                value={formData.Smoking_Yes}
                onChange={handleChange}
              >
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>

            <div className="field">
              <label>Alcohol Drinking</label>
              <select
                name="AlcoholDrinking_Yes"
                value={formData.AlcoholDrinking_Yes}
                onChange={handleChange}
              >
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>

            <div className="field">
              <label>History of Stroke</label>
              <select
                name="Stroke_Yes"
                value={formData.Stroke_Yes}
                onChange={handleChange}
              >
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>

            <div className="field">
              <label>Difficulty Walking</label>
              <select
                name="DiffWalking_Yes"
                value={formData.DiffWalking_Yes}
                onChange={handleChange}
              >
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>

            <div className="field">
              <label>Diabetes</label>
              <select
                name="Diabetic_Yes"
                value={formData.Diabetic_Yes}
                onChange={handleChange}
              >
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>

            <div className="field">
              <label>Physical Activity</label>
              <select
                name="PhysicalActivity_Yes"
                value={formData.PhysicalActivity_Yes}
                onChange={handleChange}
              >
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>

            <div className="field">
              <label>Asthma</label>
              <select
                name="Asthma_Yes"
                value={formData.Asthma_Yes}
                onChange={handleChange}
              >
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>

            <div className="field">
              <label>Kidney Disease</label>
              <select
                name="KidneyDisease_Yes"
                value={formData.KidneyDisease_Yes}
                onChange={handleChange}
              >
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>

            <div className="field">
              <label>Skin Cancer</label>
              <select
                name="SkinCancer_Yes"
                value={formData.SkinCancer_Yes}
                onChange={handleChange}
              >
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>

          </div>
        </section>

        {/* Buttons */}

        <div className="button-area">

          <button
            type="submit"
            className="predict-button"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Analyzing..." : "🔍 Predict Heart Disease Risk"}
          </button>

          <button
            type="button"
            className="reset-button"
            onClick={handleReset}
          >
            Reset
          </button>

        </div>

      </main>

      {/* Result */}

      {result && (
        <div className="result">

          <div className="result-icon">
            {result.includes("No Heart") ? "✅" : "⚠️"}
          </div>

          <h2>{result}</h2>

          <p>
            This result is generated by the machine learning model.
          </p>

        </div>
      )}

      <div className="disclaimer">
        This application is for educational and demonstration purposes only.
        It is not a medical diagnosis or a substitute for professional medical advice.
      </div>

    </div>
  );
}

export default App;