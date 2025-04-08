import React from 'react';
import { Head } from '@inertiajs/react';

type Post = {
    id: number;
    title: string;
    body: string;
};

type Props = {
    posts: Post[];
};

export default function Index({ posts }: Props) {
    return (
      <>
      <Head title='記事一覧' />
      <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">記事一覧</h1>

      {posts.length === 0 ? (
          <p>記事がありません。</p>
      ) : (
      posts.map(post => (
          <div key={post.id} className="mb-6 border-b pb-4">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p>{post.body}</p>
          </div>
      ))
    )}
  </div>
  </>
 );
}

