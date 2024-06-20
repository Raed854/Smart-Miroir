import dlib
import cv2
import numpy as np

def test(image):
    # Load the face recognition model
    model_path = "dlib_face_recognition_resnet_model_v1.dat"
    facerec = dlib.face_recognition_model_v1(model_path)

    # Perform face detection and facial landmarks detection using shape_predictor_5_face_landmarks.dat
    detector = dlib.get_frontal_face_detector()
    shape_predictor_path = "shape_predictor_5_face_landmarks.dat"
    predictor = dlib.shape_predictor(shape_predictor_path)

    # Convert the image to grayscale for face detection
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Detect faces in the grayscale image
    faces = detector(gray_image)

    for face in faces:
        # Get the facial landmarks for each detected face
        landmarks = predictor(gray_image, face)

        # Draw the detected face rectangle
        cv2.rectangle(image, (face.left(), face.top()), (face.right(), face.bottom()), (0, 0, 255), 2)

        # Draw the facial landmarks on the image
        for i in range(5):
            x, y = landmarks.part(i).x, landmarks.part(i).y
            cv2.circle(image, (x, y), 2, (0, 255, 0), -1)
            # Compute the face descriptor
        face_descriptor = facerec.compute_face_descriptor(image, landmarks)
        # Convert the face descriptor to a NumPy array for further processing or storage
        face_descriptor_np = np.array(face_descriptor)
        print(face_descriptor_np )

    # Display the image with detected faces and landmarks
    cv2.imshow('Detected Faces and Landmarks', image)
    cv2.waitKey(0)
    cv2.destroyAllWindows()

# Example usage
image_path = "image10.jpg"
image = cv2.imread(image_path)
test(image)
