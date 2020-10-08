import React, { useState, useEffect } from 'react';
import { API, Auth } from 'aws-amplify'
import { listPosts } from './graphql/queries'
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'


function App() {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    fetchPosts();
    checkUser(); // new function call
  }, []);
  async function fetchPosts() {
    try {
      const postData = await API.graphql({ query: listPosts });
      setPosts(postData.data.listPosts.items)
    } catch (err) {
      console.log({ err })
    }
  }

  async function checkUser() {
    const user = await Auth.currentAuthenticatedUser();
    console.log('user: ', user);
    console.log('user attributes: ', user.attributes);
  }

  return (
      <div>
        <h1>Hello World</h1>
        {
          posts.map(post => (
              <div key={post.id}>
                <h3>{post.name}</h3>
                <p>{post.location}</p>
              </div>
          ))
        }
        <AmplifySignOut />
      </div>
  )
}

export default withAuthenticator(App);
