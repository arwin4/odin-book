import React, { useEffect, useRef, useState } from 'react';
import postPropType from '@propTypes/post';
import { useFetcher } from 'react-router-dom';
import LabelButton from '@components/buttons/LabelButton';

export default function CommentForm({ post }) {
  const fetcher = useFetcher();
  const commentFieldRef = useRef();

  const [commentFieldFocused, setCommentFieldFocused] = useState(false);

  // Reset form on submit
  useEffect(() => {
    commentFieldRef.current.value = '';
    commentFieldRef.current.blur();
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
        onFocus={() => setCommentFieldFocused(true)}
        onBlur={() => setCommentFieldFocused(false)}
        maxLength={500}
        required
      />
      {(commentFieldFocused || commentFieldRef.current?.value !== '') && (
        <LabelButton
          busy={fetcher.state !== 'idle'}
          icon="ph:paper-plane-right"
          inline="true"
          type="submit"
          text="Post"
        />
      )}
    </fetcher.Form>
  );
}

/* Prop Types */
CommentForm.propTypes = {
  post: postPropType.isRequired,
};
