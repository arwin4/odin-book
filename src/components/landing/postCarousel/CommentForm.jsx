import React, { useEffect, useRef } from 'react';
import postPropType from '@propTypes/post';
import { useFetcher } from 'react-router-dom';
import LabelButton from '@components/buttons/LabelButton';

export default function CommentForm({ post }) {
  const fetcher = useFetcher();
  const commentFieldRef = useRef();

  // Emtpy field on submit
  useEffect(() => {
    commentFieldRef.current.value = '';
  }, [fetcher.state]);

  return (
    <fetcher.Form className="comment-form" method="POST">
      <input type="hidden" name="intent" value="post-comment" />
      <input type="hidden" name="post-id" value={post.id} />
      <input
        type="text"
        name="content"
        placeholder="Leave a comment..."
        ref={commentFieldRef}
        autoComplete="off"
        required
      />
      <LabelButton
        busy={fetcher.state !== 'idle'}
        icon="ph:paper-plane-right"
        inline="true"
        type="submit"
        text="Post"
      />
    </fetcher.Form>
  );
}

/* Prop Types */
CommentForm.propTypes = {
  post: postPropType.isRequired,
};
