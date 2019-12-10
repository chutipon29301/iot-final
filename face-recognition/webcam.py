import os
import face_recognition
import cv2
import numpy as np
from imutils.video import VideoStream
import requests

BASE_URL = 'http://192.168.1.43:3000'

face_dir = 'faces'

known_faces_dir = os.listdir(face_dir)
known_face_encodings = []
known_face_names = []

for face in known_faces_dir:
    folder_names = os.listdir(os.path.join(face_dir, face))
    for file_name in folder_names:
        path = os.path.join(face_dir, face, file_name)
        print(path)
        person_image = face_recognition.load_image_file(path)
        if(len(face_recognition.face_encodings(person_image)) > 0):
            known_face_encodings.append(face_recognition.face_encodings(person_image)[0])
            known_face_names.append(face)

# video_capture = cv2.VideoCapture(0)
video_capture  = VideoStream(src=0).start()

# Initialize some variables
face_locations = []
face_encodings = []
face_names = []
process_this_frame = True

while True:
    # Grab a single frame of video
    frame = video_capture.read()

    # Resize frame of video to 1/4 size for faster face recognition processing
    small_frame = cv2.resize(frame, (0, 0), fx=0.2, fy=0.2)

    # Convert the image from BGR color (which OpenCV uses) to RGB color (which face_recognition uses)
    rgb_small_frame = small_frame[:, :, ::-1]

    # Only process every other frame of video to save time
    if process_this_frame:
        # Find all the faces and face encodings in the current frame of video
        face_locations = face_recognition.face_locations(rgb_small_frame)
        face_encodings = face_recognition.face_encodings(rgb_small_frame, face_locations)

        face_names = []
        for face_encoding in face_encodings:
            # See if the face is a match for the known face(s)
            matches = face_recognition.compare_faces(known_face_encodings, face_encoding, tolerance=0.5)
            name = "Unknown"

            # Or instead, use the known face with the smallest distance to the new face
            face_distances = face_recognition.face_distance(known_face_encodings, face_encoding)
            best_match_index = np.argmin(face_distances)
            if matches[best_match_index]:
                name = known_face_names[best_match_index]
                print('Matches')
                requests.get(url = BASE_URL + '/unlockByFace')

            face_names.append(name)

    process_this_frame = not process_this_frame


    # Display the results
    for (top, right, bottom, left), name in zip(face_locations, face_names):
        # Scale back up face locations since the frame we detected in was scaled to 1/4 size
        top *= 5
        right *= 5
        bottom *= 5
        left *= 5

        # Draw a box around the face
        cv2.rectangle(frame, (left, top), (right, bottom), (0, 0, 255), 2)

        # Draw a label with a name below the face
        cv2.rectangle(frame, (left, bottom - 35), (right, bottom), (0, 0, 255), cv2.FILLED)
        font = cv2.FONT_HERSHEY_DUPLEX
        cv2.putText(frame, name, (left + 6, bottom - 6), font, 1.0, (255, 255, 255), 1)

    # Display the resulting image
    cv2.imshow('Video', cv2.resize(frame, (0, 0), fx=0.5, fy=0.5))

    # Hit 'q' on the keyboard to quit!
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release handle to the webcam
video_capture.release()
cv2.destroyAllWindows()