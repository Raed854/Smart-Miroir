
import dlib
import cv2
import numpy as np
import requests
from test import test

# Load the face recognition model
model_path = "dlib_face_recognition_resnet_model_v1.dat"
facerec = dlib.face_recognition_model_v1(model_path)

# Perform face detection and facial landmarks detection (you can use shape_predictor_5_face_landmarks.dat)
detector = dlib.get_frontal_face_detector()
predictor = dlib.shape_predictor("shape_predictor_5_face_landmarks.dat")

def profile_upload(frame):
    # Convert the frame to bytes
    _, frame_encoded = cv2.imencode('.jpg', frame)
    frame_bytes = frame_encoded.tobytes()

    # Define the upload preset
    upload_preset = "oztadvnr"  # Update with your upload preset

    # Create a FormData object and append frame and preset
    files = {'file': frame_bytes}
    data = {'upload_preset': upload_preset}

    # Make a POST request to the Cloudinary API endpoint
    response = requests.post("https://api.cloudinary.com/v1_1/dl4qexes8/upload", files=files, data=data)

    # Check if the request was successful
    if response.status_code == 200:
        # Parse the JSON response and get the secure URL
        response_data = response.json()
        secure_url = response_data["secure_url"]
        api_url = 'http://192.168.1.11:8000/miroir/api/image_problemme/create/'
        request_body = {
                    'image': secure_url
                }

        response = requests.post(api_url, json=request_body)
        return secure_url
    else:
        # If there was an error, raise an exception with the error message
        response.raise_for_status()
# Define the API endpoint URL
def api():
    api_url = 'http://192.168.1.11:8000/miroir/api/images/'
    # Make a GET request to the API endpoint
    response = requests.get(api_url)
    # Check if the request was successful (status code 200)
    if response.status_code == 200:
        # Parse the JSON response
        return response.json()
    else:
        print("Error:", response.status_code, response.text)
        return None

# Convert string to numpy array
def to_int(string):
    return np.array([float(item) for item in string.split(',')])
def compar(a,data):
    min=1
    i=data
    for entry in data:
        bio_data = entry.get('biometrique', '')
        result2 = to_int(bio_data)
        if np.linalg.norm(result1[1] - result2) < min :
            min=np.linalg.norm(result1[1] - result2)
            i=entry
    if min <0.55:
        return i
    return None
# Fetch API data outside the loop


t = 1
cap = cv2.VideoCapture(0)

while t:
    api_data = api()
    ret, frame = cap.read()
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = detector(gray)
    
    for face in faces:
        landmarks = predictor(gray, face)
        face_descriptor = facerec.compute_face_descriptor(frame, landmarks)
        result1 = [face, np.array(face_descriptor)]

        if api_data:
            distance = compar(result1[1],api_data)
            if distance!=None:
                a = result1[0]
                a = [a.left(), a.top(), a.right(), a.bottom()]
                a = np.array(a).flatten()
                etat = test([a], frame)
                print("success")
                user = distance.get('user', '')
                api_url = 'http://192.168.1.11:8000/miroir/api/pointage/create/'
                request_body = {
                    'user': user,
                    'etat': etat
                }
                print(user)
                # Make a POST request to the API endpoint
                response = requests.post(api_url, json=request_body)
                break
            else:
                print(profile_upload(frame))
                print("problemme")
        else:
            print("API problem")

    
    key = cv2.waitKey(int(1000 / 30))

cv2.destroyAllWindows()
cap.release()