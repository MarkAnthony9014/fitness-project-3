import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_LIKE } from '../../utils/mutations';
import { useState } from 'react'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
const options = [
  'none', 'one', 'two', 'three'
];
const defaultOption = options[0];



const PostList = ({ posts, title }) => {
  const [addLike, {error}] = useMutation(ADD_LIKE)
  const handleLike = async (postId) => {
    console.log('test')
    const returnData = await addLike({
          variables: { postId: postId}}
          );
    console.log(returnData);
  }
//  checkLiked ? <button>Unlike</button> : <button>Like</button>
const [ filteredPosts, setFilteredPosts ] =  useState( posts );
const [ category, setCategory ] = useState( defaultOption );

 const handleSort = ( category ) => {
  console.log(category.value)
  setCategory(category.value)
  if (category.value !== "none" ) {
    const filtered = posts.filter(post => post.category == category.value);
    setFilteredPosts( filtered ) 
  } else {
    setFilteredPosts( posts );
  }
 }

  if (!posts.length) {
    return <h3>No Posts Yet</h3>;
  }



  return (
    <div>
      <div className='card mt-4'>
      </div>
      <h3>{title}</h3>
      <Dropdown options={options} onChange={handleSort} value={defaultOption} placeholder="Select an option" />
      {filteredPosts &&
        filteredPosts.map(post => (
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

                <p>{post.postText}</p>
                <p className="mb-0">

                <button className='btn' onClick={() => handleLike(post._id)}>Like</button>
                  {post.likeCount}
                  <Link to={`/post/${post._id}`}>
                  Reactions: {post.reactionCount} || Click to{' '}
                  {post.reactionCount ? 'see' : 'start'} the discussion!
                  </Link>
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
