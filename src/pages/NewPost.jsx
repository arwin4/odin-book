import React from 'react';
import { useFetcher } from 'react-router-dom';

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
  const fetcher = useFetcher();
  const uploading = fetcher.state !== 'idle';

  return (
    <div className="new-post">
      <fetcher.Form
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
      </fetcher.Form>
    </div>
  );
}
