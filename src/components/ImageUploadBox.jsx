import React, { useRef, useState } from 'react';

import './style/ImageUploadBox.css';

export default function ImageUploadBox() {
  const [file, setFile] = useState(null);
  const inputRef = useRef();
  const dropBoxRef = useRef();

  const handleDragEnter = (e) => {
    dropBoxRef.current.classList.add('dragging');
    e.stopPropagation();
    e.preventDefault();
  };

  const handleDragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const handleDragLeave = (e) => {
    e.stopPropagation();
    dropBoxRef.current.classList.remove('dragging');
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.stopPropagation();
    dropBoxRef.current.classList.remove('dragging');
    e.preventDefault();

    const { dataTransfer } = e;
    const dropFile = dataTransfer.files[0];
    setFile(dropFile);

    // Add the image to the input's FileList
    const newTransfer = new DataTransfer();
    newTransfer.items.add(dropFile);
    inputRef.current.files = newTransfer.files;
  };

  const isFileValid = (curFile) => {
    if (!curFile) return false;
    if (!curFile.type.startsWith('image/')) return false;
    return curFile.size <= 10 ** 7;
  };

  return (
    <label
      htmlFor="file"
      className="image-upload-box"
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragLeave={handleDragLeave}
      onChange={(e) => setFile(e.target.files[0])}
      ref={dropBoxRef}
    >
      <div className="content-wrapper">
        {!isFileValid(file) && (
          <div className="instruction">
            Drop an image here or click to upload
          </div>
        )}

        {isFileValid(file) && <img src={URL.createObjectURL(file)} alt="" />}

        {inputRef?.current?.files.length > 0 && !isFileValid(file) && (
          <div className="filesize-warning">
            File is too big. Please select an image smaller than 10 MB.
          </div>
        )}

        <input
          type="file"
          name="file"
          id="file"
          accept="image/*"
          ref={inputRef}
          required
        />
      </div>
    </label>
  );
}
