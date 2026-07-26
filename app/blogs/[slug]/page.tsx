import React from 'react'

const BlogsSlugsPage =async ({ params }: { params: Promise<{ slug: string }> }) => {
   const { slug } = await params;
  return <div>BlogsSlugsPage:{slug} </div>;
};

export default BlogsSlugsPage 