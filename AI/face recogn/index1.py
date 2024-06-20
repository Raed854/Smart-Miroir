import dlib
import cv2
import numpy as np
def test(image):
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

    # Assume there is only one face in the image (you may need to modify this if there are multiple faces)
    face = faces[0]

    # Detect facial landmarks
    landmarks = predictor(gray, face)

    # Compute the face descriptor
    face_descriptor = facerec.compute_face_descriptor(image, landmarks)
    # Convert the face descriptor to a NumPy array for further processing or storage
    face_descriptor_np = np.array(face_descriptor)
    return face_descriptor_np
# Load an image containing a face
image1= cv2.imread("image3.jpg")
image2= cv2.imread("image4.jpg")

image1=test(image1)
image2=test(image2)

# Compute the Euclidean distance between the two face descriptors
distance = np.linalg.norm(image1 - image2)

# Print or use the face descriptor as needed
print("Face Descriptor:", distance)
if distance < 0.45  :
    print("success")
else:
    print("fail")
