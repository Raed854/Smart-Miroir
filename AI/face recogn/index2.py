import dlib
import cv2
import numpy as np
from test import test
import time
def teste(image):
    # Load the face recognition model
    model_path = "dlib_face_recognition_resnet_model_v1.dat"
    facerec = dlib.face_recognition_model_v1(model_path)

    # Perform face detection and facial landmarks detection (you can use shape_predictor_5_face_landmarks.dat)
    detector = dlib.get_frontal_face_detector()
    predictor = dlib.shape_predictor("shape_predictor_5_face_landmarks.dat")

    # Convert the image to grayscale (dlib works with grayscale images)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Detect faces in the image
    faces = detector(gray)

    # Check if a face is detected
    if len(faces) == 0:
        return None

    # Assume there is only one face in the image (you may need to modify this if there are multiple faces)
    face = faces[0]

    # Detect facial landmarks
    landmarks = predictor(gray, face)

    # Compute the face descriptor
    face_descriptor = facerec.compute_face_descriptor(image, landmarks)
    # Convert the face descriptor to a NumPy array for further processing or storage
    face_descriptor_np = np.array(face_descriptor)
    return [face,face_descriptor_np]

cap = cv2.VideoCapture(0)

image1 = cv2.imread("image4.jpg")
start=time.time()
n1 = teste(image1)[1]

if n1 is not None:
    ret, frame = cap.read()
    n2 = teste(frame)[1]
    if n2 is not None:
        # Compute the Euclidean distance between the two face descriptors
        distance = np.linalg.norm(n1 - n2)
        if distance < 0.6:
            a=teste(frame)[0]
            print(a)
            a=[a.left(),a.top(),a.right(),a.bottom()]
            a=(np.array(a).flatten())
            test([a],frame)

        else:
            print("Fail: Faces are not similar enough")
    else:
        print("Fail: No face detected in the webcam frame")
else:
    print("Fail: No face detected in the image")
end=time.time()
print(end-start)