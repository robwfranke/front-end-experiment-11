 import React from 'react';
import posts from '../data/posts.json';
import { useParams, Link } from 'react-router-dom';

function BlogPost() {
  const { id } = useParams();
  const currentPost = posts.find((post) => {
    return post.id === id;
  });

  return (
    <>
      <article>
        <h1>{currentPost.title}</h1>
        <h3>{currentPost.date}</h3>
        <p>{currentPost.content}</p>
      </article>
      <article>
        <Link to="/">Terug naar Home</Link>
      </article>
    </>
  );
}

export default BlogPost;