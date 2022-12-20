import React from 'react';
import { Link } from 'react-router-dom';

const CategoryList = ({ categories, title }) => {
  if (!categories.length) {
    return <h3>No Posts Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {categories &&
        categories.map(category => (
          //Add code to render category name
            category.posts && 
             category.posts.map(post => (
            //Reuse all the code beneath to render each post in a loop. 
            //  )) 
            <h2></h2>
             ))))}
          <div key={post._id} className="card mb-3">
            <p className="card-header">
              <Link
                to={`/profile/${post.username}`}
                style={{ fontWeight: 700 }}
                className="text-light"
              >
                {category.post}
              </Link>{' '}
              posted on {post.createdAt}
            </p>
            <div className="card-body">
              <Link to={`/post/${post._id}`}>
                <p>{post.postText}</p>
                <p className="mb-0">
                  Reactions: {post.reactionCount} || Click to{' '}
                  {post.reactionCount ? 'see' : 'start'} the discussion!
                </p>
              </Link>
            </div>
          </div>
    </div>
  );
};

export default PostList;