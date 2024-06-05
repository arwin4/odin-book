import React, { useEffect, useRef } from 'react';
import Posts from '@components/home/Posts';
import { Link, useLoaderData, useRevalidator } from 'react-router-dom';
import { InlineIcon } from '@iconify/react';

export default function Explore() {
  const posts = useLoaderData();
  console.log(posts);
  const revalidator = useRevalidator();
  const intersectionRef = useRef();

  function fetchMore() {
    // FIXME: use navigate instead. When using React Router, the history API
    // should not be directly manipulated.
    // navigate(...)
    // does work on first click, only on second click. Find out why

    const currentNumberOfPosts = posts.length;
    const limit = currentNumberOfPosts + 10;
    // eslint-disable-next-line no-restricted-globals
    window.history.replaceState({}, '', `${location.pathname}?limit=${limit}`);
    revalidator.revalidate();
  }

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchMore();
      }
    });

    if (intersectionRef.current) {
      observer.observe(intersectionRef.current);
    }

    return () => {
      if (intersectionRef.current) {
        observer.unobserve(intersectionRef.current);
      }
    };
  }, [intersectionRef, posts.length]);

  if (posts.length === 0) {
    return (
      <div className="home">
        <div className="no-posts-tip">
          <h2>No posts yet!</h2>
          <h3>
            Head over to{' '}
            <Link className="explore-link" to="/explore">
              <em>Explore</em>
            </Link>{' '}
            to find some users to follow.
          </h3>
        </div>
      </div>
    );
  }

  return (
    <div className="timeline">
      <Posts posts={posts} />

      <div className="intersection" ref={intersectionRef}>
        {revalidator.state === 'loading' ? (
          <InlineIcon
            className="icon"
            icon="svg-spinners:ring-resize"
            height="unset"
          />
        ) : (
          'No more posts to show.'
        )}
      </div>
    </div>
  );
}
