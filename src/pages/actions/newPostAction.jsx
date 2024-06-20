import getJwt from '@utils/getJwt';
import { redirect } from 'react-router-dom';

export default async function newPostAction({ request }) {
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

  let res;
  try {
    res = await fetch(
      'https://api.cloudinary.com/v1_1/dg2fuzzhq/image/upload/',
      requestOptions,
    );

    if (!res.ok) {
      throw new Error();
    }
  } catch (error) {
    throw new Response('Fetch error', {
      statusText: 'Failed to post.',
      status: res?.status,
    });
  }

  let postId;

  try {
    const parsedCloudinaryRes = await res.json();
    imageUrl = parsedCloudinaryRes.secure_url;

    res = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/posts`, {
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

    if (!res.ok) {
      throw new Error();
    }

    const parsedRes = await res.json();
    postId = parsedRes.data.id;
  } catch (error) {
    throw new Response('Fetch error', {
      statusText: 'Failed to post.',
      status: res?.status,
    });
  }

  return redirect(`/post/${postId}`);
}
