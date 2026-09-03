from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app)

# Load trained model
model = joblib.load("heart_model.pkl")

# Load feature names
feature_names = joblib.load("feature_names.pkl")


@app.route("/")
def home():
    return "Heart Disease Prediction API is running!"


@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json

        # Create all required features with 0
        input_data = pd.DataFrame(0, index=[0], columns=feature_names)

        # Numerical features
        input_data["BMI"] = float(data["BMI"])
        input_data["PhysicalHealth"] = float(data["PhysicalHealth"])
        input_data["MentalHealth"] = float(data["MentalHealth"])
        input_data["SleepTime"] = float(data["SleepTime"])

        # Binary features
        binary_features = [
            "Smoking_Yes",
            "AlcoholDrinking_Yes",
            "Stroke_Yes",
            "DiffWalking_Yes",
            "Sex_Male",
            "Diabetic_Yes",
            "PhysicalActivity_Yes",
            "Asthma_Yes",
            "KidneyDisease_Yes",
            "SkinCancer_Yes"
        ]

        for feature in binary_features:
            input_data[feature] = int(data.get(feature, 0))

        # Age Category - One Hot Encoding
        age_category = data["AgeCategory"]
        age_column = "AgeCategory_" + age_category

        if age_column in input_data.columns:
            input_data[age_column] = 1

        # Race - One Hot Encoding
        race = data["Race"]
        race_column = "Race_" + race

        if race_column in input_data.columns:
            input_data[race_column] = 1

        # General Health - One Hot Encoding
        gen_health = data["GenHealth"]
        health_column = "GenHealth_" + gen_health

        if health_column in input_data.columns:
            input_data[health_column] = 1

        # Make prediction
        prediction = model.predict(input_data)[0]

        if prediction == 1:
            result = "Heart Disease Risk Detected"
        else:
            result = "No Heart Disease Risk Detected"

        return jsonify({
            "prediction": int(prediction),
            "result": result
        })

    except Exception as e:
        print("ERROR:", str(e))

        return jsonify({
            "error": str(e)
        }), 400


if __name__ == "__main__":
    app.run(debug=True)