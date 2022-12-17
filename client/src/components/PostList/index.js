import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_LIKE } from '../../utils/mutations';
import { useState } from 'react'

const PostList = ({ posts, title }) => {
  const [addLike, {error}] = useMutation(ADD_LIKE)
  const handleLike = async (postId) => {
    const returnData = await addLike({
          variables: { postId: postId}}
          );
    console.log(returnData);
  }



  if (!posts.length) {
    return <h3>No Posts Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {posts &&
        posts.map(post => (
          <div key={post._id} className="card mb-3">
            <p className="card-header">
              <Link
                to={`/profile/${post.username}`}
                style={{ fontWeight: 700 }}
                className="text-light"
              >
                {post.username}
              </Link>{' '}
              posted on {post.createdAt}
            </p>
            <div className="card-body">

              <button className='likebtn' onClick={() => handleLike(post._id)}>Like</button>

              <Link to={`/post/${post._id}`}>
                <p>{post.postText}</p>
                <p className="mb-0">
                  Reactions: {post.reactionCount} || Click to{' '}
                  {post.reactionCount ? 'see' : 'start'} the discussion!
                </p>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default PostList;
