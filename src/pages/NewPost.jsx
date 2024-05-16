import getJwt from '@utils/getJwt';
import React, { useState } from 'react';
import { Form, redirect, useNavigation } from 'react-router-dom';

export default function NewPost() {
  const navigation = useNavigation();
  const uploading = navigation.state !== 'idle';

  const [file, setFile] = useState(null);

  const handleFile = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const isFileValid = (curFile) => {
    if (!curFile) return false;
    if (!curFile.type.startsWith('image/')) return false;
    return curFile.size <= 10 ** 7;
  };

  return (
    <Form method="post" encType="multipart/form-data">
      <input
        type="file"
        name="file"
        onChange={handleFile}
        accept="image/*"
        required
      />
      <input type="text" name="description" required />
      <input
        type="submit"
        value={uploading ? 'Uploading...' : 'Upload image'}
        name="submit"
      />
      <img
        src={isFileValid(file) ? URL.createObjectURL(file) : undefined}
        alt=""
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

  return;

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
    console.error(error);
  }

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
    console.log(parsedRes);
    postId = parsedRes.data.id;

    if (!res.ok) {
      // TODO
    }
  } catch (err) {
    // TODO
  }

  return redirect(`/post/${postId}`);
}

/**
 * TODO:
 *
 * - drag-n-drop
 * - display upload errors
 * - handle wrong file type
 * - warn files bigger than 10 MiB
 */
