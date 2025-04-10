import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Link } from '@inertiajs/react'

type Post = {
    id: number;
    title: string;
    body: string;
};

type Props = {
    posts: Post[];
    errors?: {
        title?: string;
        body?: string;
    };
};

export default function Index({ posts, errors }: Props) {
    const { data, setData, post, processing, reset } = useForm({
        title: '',
        body: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/posts', {
            onSuccess: () => reset(),
        });
    };

    return (
      <>
      <Head title="記事一覧" />

    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">記事一覧</h1>

    <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
            <label className="block mb-1 font-medium">タイトル</label>
            <input 
              type="text"
              value={data.title}
              onChange={e => setData('title', e.target.value)}
              className="w-full border px-3 py-2 rounded"
              />
              {errors?.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>
        <div className="mb-4">
            <label className="block mb-1 font-medium">本文</label>
            <textarea
              value={data.body}
              onChange={e => setData('body', e.target.value)}
              className='w-full border px-3 py-2 rounded'
            />
            {errors?.body && <p className='text-red-500 text-sm mt-1'>{errors.body}</p>}
        </div>
        <button
          type="submit"
          disabled={processing}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
            投稿する
        </button>
    </form>

      {/* 記事一覧*/}
      {posts.length === 0 ? (
          <p>記事がありません。</p>
      ) : (
        posts.map((post) => (
            <div key={post.id} className="mb-6 border-b pb-4">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p>{post.body}</p>
              <Link
                href={route('posts.edit', post.id)}
                className="text-blue-500 underline"
              >
                編集
              </Link>
            </div>
        ))
      )}
    </div>
  </>
 );
}

