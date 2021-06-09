 import React from 'react';
import { useParams, Link } from 'react-router-dom';

function BlogPost() {


  return (
    <>
      <article>
      <p>Blogpost pagina</p>
      </article>
      <article>
        <Link to="/">Terug naar Home</Link>
      </article>
    </>
  );
}

export default BlogPost;