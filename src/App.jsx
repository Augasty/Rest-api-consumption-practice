import { useEffect, useState } from 'react'
import AddPosts from './Components/AddPosts'
import Post from './Components/Post'

function App() {
  const [posts, setPosts] = useState([])
  const fetchPosts = () => {
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=4")
      .then((response) => response.json())
      .then(data => setPosts(data))
  }
  useEffect(() => {
    fetchPosts()
  }, [])

  const addPosts = (title, body) => {
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: title,
        body: body,
        userId: Math.random().toString(36).slice(2),
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((data) => setPosts((prev) => [data, ...prev]));

  }
  const deletePost = (id) => {
    // setPosts(posts.filter(p => p.id !== id))
    fetch('https://jsonplaceholder.typicode.com/posts/1', {
      method: 'DELETE',
    })
    .then(res=>{
      if (res.status === 200){
        setPosts(posts.filter(p => p.id !== id))
      }
    })
  }


  return (
    <>
      <h1>consuming rest api</h1>

      <AddPosts addPost={addPosts} />
      <section className='post-container'>
        <h2>Posts</h2>
        {posts.map((p) =>
          <Post key={p.id} id={p.id} title={p.title} body={p.body} deletePost={deletePost} />
        )}
      </section>
    </>
  )
}

export default App
