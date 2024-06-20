import dlib
import cv2
import numpy as np
from django.core.files.uploadedfile import InMemoryUploadedFile

def test(image):
        model_path = "./back/dlib_face_recognition_resnet_model_v1.dat"
        facerec = dlib.face_recognition_model_v1(model_path)
        # Perform face detection and facial landmarks detection (you can use shape_predictor_5_face_landmarks.dat)
        detector = dlib.get_frontal_face_detector()
        predictor = dlib.shape_predictor("./back/shape_predictor_5_face_landmarks.dat")
        # Convert the image to grayscale (dlib works with grayscale images)
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        # Detect faces in the image
        faces = detector(gray)
        # Assume there is only one face in the image (you may need to modify this if there are multiple faces)
        face = faces[0]

        # Detect facial landmarks
        landmarks = predictor(gray, face)

        # Compute the face descriptor
        face_descriptor = facerec.compute_face_descriptor(image, landmarks)
        # Convert the face descriptor to a NumPy array for further processing or storage
        string_list = [str(item) for item in face_descriptor]
        result = ",".join(string_list)
        return result


