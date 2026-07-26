


const BlogsPage =async () => {
     const posts = await fetch("https://jsonplaceholder.typicode.com/posts");
     const jsonPOst=await posts.json();
     console.log(jsonPOst)

  return (
   
    <div> this is blogs page : </div>
  )
}

export default BlogsPage