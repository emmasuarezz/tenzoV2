import avatar1 from "../assets/avatars/avatar01.png";
import avatar2 from "../assets/avatars/avatar02.png";
import avatar3 from "../assets/avatars/avatar03.png";
import vinyl from "../assets/avatars/vinyl.png";
import flower from "../assets/avatars/flower.png";
import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { useEffect } from "react";

const avatars = [avatar1, avatar2, avatar3, vinyl, flower];

function PicturePicker({
  setPicture,
  isVisible,
  setChangePicture,
  addImg,
  setLoadingIMG,
}: {
  setPicture: Function;
  isVisible: boolean;
  setChangePicture: Function;
  addImg?: string;
  setLoadingIMG?: Function;
}) {
  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      // Create a storage reference
      const storageRef = ref(storage, `avatars/${file.name}`);

      // Create the file metadata
      const metadata = {
        contentType: file.type,
      };

      setLoadingIMG!(true);

      // Upload file and metadata to the object 'images/mountains.jpg'
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          setLoadingIMG!(false);
          console.error(error);
        },
        () => {
          // Handle successful uploads on complete
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setPicture(downloadURL);
            setLoadingIMG!(false);
          });
        }
      );
    }
  };

  useEffect(() => {
    if (addImg) {
      avatars.push(addImg);
    }
  }, [addImg]);

  return (
    <section className={`picture-picker-wrapper ${isVisible ? "visible" : ""}`}>
      <button
        className="id-close-button"
        onClick={() => setChangePicture(false)}
      >
        X
      </button>
      <div className="photo-grid">
        {avatars.map((avatar, index) => (
          <div
            className="id-photo-container"
            onClick={() => {
              setPicture(avatar);
            }}
            key={index}
          >
            <img src={avatar} alt="profile" />
          </div>
        ))}
        <div className="id-photo-container">
          <input
            type="file"
            id="file"
            className="upload-photo"
            onChange={handleFileChange}
          />
          <label htmlFor="file"></label>
        </div>
      </div>
    </section>
  );
}

export default PicturePicker;
