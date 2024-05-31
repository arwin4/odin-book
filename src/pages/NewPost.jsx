import getJwt from '@utils/getJwt';
import React from 'react';
import { Form, redirect, useNavigation } from 'react-router-dom';

import './style/NewPost.css';
import ImageUploadBox from '@components/ImageUploadBox';
import LabelButton from '@components/buttons/LabelButton';

/**
 * TODO:
 * - allow undoing file selection
 * - display upload errors
 * - handle wrong file type
 */

export default function NewPostForm() {
  const navigation = useNavigation();
  const uploading = navigation.state !== 'idle';

  return (
    <div className="new-post">
      <Form
        className="new-post-form"
        method="post"
        encType="multipart/form-data"
      >
        <ImageUploadBox />
        <input
          className="description-field"
          type="text"
          placeholder="Add a description..."
          name="description"
          maxLength={500}
          required
        />
        <div className="public-notice">
          Your post will be visible to all other users on the Explore page.
        </div>
        <LabelButton
          busy={uploading}
          type="submit"
          name="submit"
          text={uploading ? 'Posting...' : 'Post'}
        />
      </Form>
    </div>
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
