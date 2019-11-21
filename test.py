import face_recognition
import cv2
imageSrc = "./images/img4.jpg"
image = cv2.imread(imageSrc, cv2.IMREAD_COLOR)
face_locations = face_recognition.face_locations(image)
for face_location in face_locations:
    cv2.rectangle(image, (face_location[1], face_location[0]), (face_location[3], face_location[2]), (255, 0, 0), 2)

cv2.imshow("image", image)
cv2.waitKey(0);       

cv2.destroyAllWindows()