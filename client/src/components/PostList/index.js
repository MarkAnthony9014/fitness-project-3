import React from 'react';
import { Link } from 'react-router-dom';

const PostList = ({ posts, title }) => {
  if (!posts.length) {
    return <h3>No Posts Yet</h3>;
  }

  return (
    <div>
      <div className='card mt-4'>
      </div>
      <h3>{title}</h3>
      {posts &&
        posts.map(post => (
          <div key={post._id} className="card mb-3">
            <p className="card-header">
              <Link
                to={`/profile/${post.username}`}
                style={{ fontWeight: 700 }}
                className="text-white"
              >
                {post.username}
              </Link>{' '}
              posted on {post.createdAt}
            </p>
            <div className="card-body">
            <p>{post.postText}</p>
                <p className="mb-0">
                  Comments: {post.reactionCount}
                  {post.reactionCount ? ' ' : ''}
                </p>
              <Link to={`/post/${post._id}`}>
                <button className='replyBtn bg-secondary mt-4 p-2 border rounded-1'>Reply</button>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default PostList;
