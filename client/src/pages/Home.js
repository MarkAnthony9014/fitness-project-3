import React from 'react';
import Feed from '../components/Feed';
import FriendList from '../components/FriendList';

import { useQuery } from '@apollo/client';
import { QUERY_POSTS, QUERY_ME_BASIC } from '../utils/queries';
import Auth from '../utils/auth';

const Home = () => {
    const { loading, data } = useQuery(QUERY_POSTS);
    const { data: userData } = useQuery(QUERY_ME_BASIC);
    const posts = data?.posts || [];

    const loggedIn = Auth.loggedIn();

  return (
      <main>
        <div className="">
            {loggedIn && (
                <div className="col-12 mb-3">
                </div>   
            )}
        </div>
      </main>
  );  
}