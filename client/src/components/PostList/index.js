import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_LIKE } from '../../utils/mutations';
import { useState } from 'react'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
const options = [
  'None', 'Arms', 'Chest', 'Abdominal/Torso', 'Shoulders', 'Legs', 'Back'
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
      <Dropdown className="m-4"options={options} onChange={handleSort} value={defaultOption} placeholder="Select an option" />
      <h3>{title}</h3>
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
              <p className="postInfo mb-2 m-4 mt-6">  
                <Link className='mr-2' to={`/post/${post._id}`}>
                  Comments: {post.reactionCount}{' '}
                  {post.reactionCount ? ' ' : '   '}
                </Link>

                Likes: {post.likeCount}                

              </p>
              <button  className='btn' onClick={() => handleLike(post._id)}>Like</button>

              <Link to={`/post/${post._id}`}>
                <button className='btn'>Reply</button>

              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default PostList;
