import React from 'react';
import { Link } from 'react-router-dom';

const Feed = ({ posts, title }) => {
    if (!posts.length) {
      return <h3>No Posts Yet</h3>;
    }

return (
    <div>
        <h3>{title}</h3>
    </div>
);


};


export default Feed;