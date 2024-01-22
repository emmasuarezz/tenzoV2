import avatar1 from "../assets/avatars/avatar01.png";
import avatar2 from "../assets/avatars/avatar02.png";
import avatar3 from "../assets/avatars/avatar03.png";
import vinyl from "../assets/avatars/vinyl.png";
import flower from "../assets/avatars/flower.png";

import { ChangeEvent } from "react";

const avatars = [avatar1, avatar2, avatar3, vinyl, flower];

function PicturePicker({
  setPicture,
  isVisible,
  setChangePicture,
}: {
  setPicture: Function;
  isVisible: boolean;
  setChangePicture: Function;
}) {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileSize = file.size / 1024 / 1024; // in MiB
      const fileType = file.type;
      const validImageTypes = ["image/gif", "image/jpeg", "image/png"];

      if (fileSize > 4) {
        // Change this to your desired maximum file size
        alert("File is too large. Please upload a file smaller than 2 MiB.");
        return;
      }

      if (!validImageTypes.includes(fileType)) {
        alert("Invalid file type. Please upload a GIF, JPEG, or PNG image.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

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
