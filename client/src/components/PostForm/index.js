import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_POST } from '../../utils/mutations';
import { QUERY_POSTS, QUERY_ME } from '../../utils/queries';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const options = [
  'Arms', 'Chest', 'Abdominal/Torso', 'Shoulders', 'Legs', 'Back'
];
const defaultOption = options[0];

const PostForm = () => {
  const [postText, setText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [addPost, { error }] = useMutation(ADD_POST, {
    update(cache, { data: { addPost } }) {
      
        // could potentially not exist yet, so wrap in a try/catch
      try {
        // update me array's cache
        const { me } = cache.readQuery({ query: QUERY_ME });
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: { ...me, posts: [...me.posts, addPost] } },
        });
      } catch (e) {
        console.warn("First post insertion by user!")
      }

      // update post array's cache
      const { posts } = cache.readQuery({ query: QUERY_POSTS });
      cache.writeQuery({
        query: QUERY_POSTS,
        data: { posts: [addPost, ...posts] },
      });
    }
  });

  // update state based on form input changes
  const handleChange = (event) => {
    if (event.target.value.length <= 280) {
      setText(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };
const [ category, setCategory ] = useState( defaultOption );

 const handleDropdown = ( category ) => {
  console.log(category.value)
  setCategory(category.value)
 }


  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await addPost({
        variables: { postText, category },
      });

      // clear form value
      setText('');
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div >
      <div className='card mb-3'>
      </div>
      <h3>Add a Post</h3>
      <p
        className={`card-header postCard m-0 ${characterCount === 280 || error ? 'text-error' : ''}`}
      >
        Character Count: {characterCount}/280
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
      <form
        className="card-body postCon flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
      >
        <textarea
          placeholder="Insert here..."
          value={postText}
          className="form-input col-12 col-md-9"
          onChange={handleChange}
        ></textarea>
        <Dropdown className="postFormNav" options={options} onChange={handleDropdown} value={defaultOption} placeholder="Select an option" />
        <button className="btn col-12 col-md-3" type="submit">
          Submit
        </button>
      </form>
    </div>



    
  );
};

export default PostForm;
