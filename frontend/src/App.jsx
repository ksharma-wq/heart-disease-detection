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

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setResult("");

    try {
      const response = await fetch("https://heart-risk-prediction-mccu.onrender.com/predict", {
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

  const isRisk =
    result &&
    !result.toLowerCase().includes("no heart") &&
    !result.toLowerCase().includes("low risk");

  return (
    <div className="container">
      {/* HEADER */}
      <header className="header">
        <div className="brand-icon">❤️</div>

        <div className="header-badge">
          AI / MACHINE LEARNING
        </div>

        <h1>
          Heart Disease <span>Detection</span>
        </h1>

        <p>
          AI-powered heart health risk assessment using machine learning
        </p>

        <div className="header-line"></div>
      </header>

      {/* MAIN CONTENT */}
      <main className="main-layout">

        {/* FORM CARD */}
        <section className="form-card">

          <div className="card-header">
            <div>
              <h2>Patient Health Assessment</h2>
              <p>
                Enter the patient's information to generate a prediction.
              </p>
            </div>

            <div className="secure-badge">
              🔒 Secure
            </div>
          </div>

          <form onSubmit={handleSubmit}>

            {/* BASIC HEALTH */}
            <section className="section">
              <div className="section-title">
                <div className="section-icon">🩺</div>

                <div>
                  <h3>Basic Health Information</h3>
                  <p>General physical and daily health information</p>
                </div>
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
                  <small>Body Mass Index</small>
                </div>

                <div className="field">
                  <label>Sleep Time</label>
                  <input
                    type="number"
                    name="SleepTime"
                    placeholder="e.g. 7"
                    value={formData.SleepTime}
                    onChange={handleChange}
                    required
                  />
                  <small>Hours per day</small>
                </div>

                <div className="field">
                  <label>Physical Health</label>
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
                  <small>Number of unhealthy days</small>
                </div>

                <div className="field">
                  <label>Mental Health</label>
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
                  <small>Number of unhealthy days</small>
                </div>

              </div>
            </section>

            {/* PERSONAL INFORMATION */}
            <section className="section">
              <div className="section-title">
                <div className="section-icon">👤</div>

                <div>
                  <h3>Personal Information</h3>
                  <p>Basic demographic information</p>
                </div>
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

            {/* LIFESTYLE */}
            <section className="section">
              <div className="section-title">
                <div className="section-icon">🏃</div>

                <div>
                  <h3>Lifestyle & Medical History</h3>
                  <p>Health conditions and lifestyle factors</p>
                </div>
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

            {/* BUTTONS */}
            <div className="button-area">

              <button
                type="submit"
                className="predict-button"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Analyzing...
                  </>
                ) : (
                  <>
                    🔍 Predict Heart Disease Risk
                  </>
                )}
              </button>

              <button
                type="button"
                className="reset-button"
                onClick={handleReset}
              >
                Reset
              </button>

            </div>

          </form>
        </section>

        {/* SIDE PANEL */}
        <aside className="side-panel">

          {/* RESULT CARD */}
          <div
            className={`result-card ${
              result
                ? isRisk
                  ? "risk-result"
                  : "safe-result"
                : ""
            }`}
          >

            <div className="result-card-header">
              <span>Prediction Result</span>
              <span className="status-dot"></span>
            </div>

            {!result ? (
              <div className="empty-result">

                <div className="empty-icon">
                  ❤️
                </div>

                <h3>Ready to Analyze</h3>

                <p>
                  Complete the health assessment and click
                  <strong> Predict Heart Disease Risk </strong>
                  to see the machine learning prediction.
                </p>

              </div>
            ) : (
              <div className="prediction-result">

                <div className="prediction-icon">
                  {isRisk ? "⚠️" : "✅"}
                </div>

                <h3>{result}</h3>

                <p>
                  This result was generated by the machine learning model.
                </p>

              </div>
            )}

          </div>

          {/* HEALTH TIPS */}
          <div className="tips-card">

            <div className="tips-header">
              <span className="tips-icon">💡</span>

              <div>
                <h3>Heart Health Tips</h3>
                <p>Simple habits for a healthier heart</p>
              </div>
            </div>

            <div className="tip">
              <span>✓</span>
              <p>Maintain a healthy body weight and BMI.</p>
            </div>

            <div className="tip">
              <span>✓</span>
              <p>Stay physically active on a regular basis.</p>
            </div>

            <div className="tip">
              <span>✓</span>
              <p>Avoid smoking and excessive alcohol consumption.</p>
            </div>

            <div className="tip">
              <span>✓</span>
              <p>Maintain healthy sleep and stress-management habits.</p>
            </div>

          </div>

        </aside>

      </main>

      {/* FOOTER */}
      <footer className="disclaimer">
        <strong>⚕️ Educational Use Only</strong>
        <br />
        This application is for educational and demonstration purposes only.
        It is not a medical diagnosis or a substitute for professional medical advice.
      </footer>

    </div>
  );
}

export default App;