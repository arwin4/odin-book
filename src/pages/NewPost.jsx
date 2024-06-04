import React from 'react';
import { Form, useNavigation } from 'react-router-dom';

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
