from flask import Flask, request, jsonify
import cv2
import numpy as np
import tensorflow as tf
import base64
import os
import numpy as np
from keras.models import load_model
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
classes_nomes = {0: 'Covid-19', 1: 'Saudavel', 2:'Pneumonia Viral', 3: 'Pneumonia bacterial'}
# Endpoint de teste
@app.route('/')
def index():
    return "API para diagnósticar Radiografias.", 200

# Endpoint para predição
@app.route('/predict', methods=['POST'])
def predict():
    try:
        
        img_file = request.files['imagem']
        
        img_path = 'input_image.jpg'
        img_file.save(img_path)

        model_loaded = load_model('model/weights.hdf5')

        img = cv2.imread(img_path)

        img = cv2.resize(img, (256, 256))

    
        img = img / 255
        img = img.reshape(-1, 256, 256, 3)

        
        predict = model_loaded.predict(img)
        predict2 = np.argmax(predict)
        response = {"classe": classes_nomes[predict2], "probabilidade": float(predict[0][predict2])}
        os.remove(img_path)
        return jsonify(response), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
