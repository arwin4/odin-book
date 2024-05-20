import getJwt from '@utils/getJwt';
import React, { useRef, useState } from 'react';
import { Form, redirect, useNavigation } from 'react-router-dom';

import './style/NewPost.css';

/**
 * TODO:
 * - allow undoing file selection
 * - display upload errors
 * - handle wrong file type
 */

export default function NewPostForm() {
  const navigation = useNavigation();
  const uploading = navigation.state !== 'idle';

  const [file, setFile] = useState(null);
  const inputRef = useRef();

  const handleDragEnter = (e) => {
    e.preventDefault();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
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
    <Form className="new-post-form" method="post" encType="multipart/form-data">
      <label
        htmlFor="file"
        className="dropbox"
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onChange={(e) => setFile(e.target.files[0])}
      >
        <div className="instruction">Drop an image here or click to upload</div>

        {isFileValid(file) ? (
          <img src={URL.createObjectURL(file)} alt="" />
        ) : (
          ''
        )}

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
      </label>
      <input
        type="text"
        placeholder="Add a description..."
        name="description"
        required
      />
      <input
        type="submit"
        value={uploading ? 'Uploading...' : 'Upload image'}
        name="submit"
      />
    </Form>
  );
}

export async function newPostAction({ request }) {
  const data = await request.formData();

  // Refuse big files
  const file = data.get('file');
  if (file.size >= 10 ** 7) {
    throw new Error('Image must be smaller than 10 MB');
  }

  const formData = new FormData();
  formData.append('upload_preset', 'odinstragram-post');
  formData.append('file', file);

  const requestOptions = {
    method: 'POST',
    body: formData,
    redirect: 'follow',
  };

  let imageUrl;

  try {
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/dg2fuzzhq/image/upload/',
      requestOptions,
    );
    const parsedRes = await res.json();
    imageUrl = parsedRes.secure_url;
  } catch (error) {
    // TODO: handle error
  }

  // Mock:
  // const imageUrl =
  //   'https://res.cloudinary.com/dg2fuzzhq/image/upload/v1715851737/post/gsxzt0vduusv3dnyp8re.avif';

  let postId;

  try {
    const res = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/posts`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getJwt()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          type: 'posts',
          attributes: {
            imageUrl,
            description: data.get('description'),
          },
        },
      }),
    });

    const parsedRes = await res.json();
    postId = parsedRes.data.id;

    if (!res.ok) {
      // TODO
    }
  } catch (err) {
    // TODO
  }

  return redirect(`/post/${postId}`);
}
