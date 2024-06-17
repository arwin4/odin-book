import React, { useRef, useState } from 'react';
import commentsPropType from '@propTypes/comments';
import { Link, useFetcher } from 'react-router-dom';
import LabelButton from '@components/buttons/LabelButton';
import getCurrentUser from '@utils/getCurrentUser';
import Dialog from '@components/dialog/Dialog';
import postPropType from '@propTypes/post';

export default function Comments({ post, comments }) {
  const confirmDeleteCommentModal = useRef();
  const fetcher = useFetcher();
  const currentUser = getCurrentUser();

  const [commentIdToBeDeleted, setCommentIdToBeDeleted] = useState('');

  return (
    <div className="comments">
      {comments.map((comment) => {
        const { content } = comment.attributes;
        const { username, firstName, avatarUrl } =
          comment.relationships.author.data.attributes;

        const currentUserIsAuthor =
          currentUser.id === comment.relationships.author.data.id;

        return (
          <div className="comment" key={comment.id}>
            <Link className="author" to={`/user/${username}`}>
              <img src={avatarUrl} alt="" className="avatar" />
              <div className="first-name">{firstName}</div>
            </Link>

            <div className="content-wrapper">
              {currentUserIsAuthor && (
                <LabelButton
                  icon="ph:trash"
                  onClick={() => {
                    setCommentIdToBeDeleted(comment.id);
                    confirmDeleteCommentModal.current.showModal();
                  }}
                />
              )}
              <cite className="content">{content}</cite>
            </div>

            <Dialog
              title="Delete comment?"
              icon="ph:trash"
              ref={confirmDeleteCommentModal}
            >
              <div className="confirmation">
                <fetcher.Form
                  method="DELETE"
                  onSubmit={() => confirmDeleteCommentModal.current.close()}
                >
                  <input
                    type="hidden"
                    name="comment-id"
                    value={commentIdToBeDeleted}
                  />
                  <input type="hidden" name="post-id" value={post.id} />
                  <LabelButton
                    icon="ph:trash"
                    text="Confirm"
                    type="submit"
                    name="intent"
                    value="delete-comment"
                    busy={fetcher.state !== 'idle'}
                  />
                </fetcher.Form>
                <form className="cancel-btn" method="dialog">
                  <LabelButton text="Cancel" type="submit" method="dialog" />
                </form>
              </div>
            </Dialog>
          </div>
        );
      })}
    </div>
  );
}

/* Prop Types */
Comments.propTypes = {
  post: postPropType.isRequired,
  comments: commentsPropType.isRequired,
};
