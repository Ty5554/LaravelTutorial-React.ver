import { useForm } from '@inertiajs/react';
import React from 'react';


type Post = {
  id: number;
  title: string;
  body: string;
};

export default function Edit({ post }: { post: Post }) {
    const { data, setData, put, processing, errors } = useForm({
        title: post.title,
        body: post.body,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('posts.update', post.id));
    };

    return (
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">投稿を編集</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
             <div>
               <label className="block mb-1">タイトル</label>
               <input
                 type="text"
                 value={data.title}
                 onChange={e => setData('title', e.target.value)}
                 className="w-full border p-2 rounded"
               />
               {errors.title && <div className="text-red-500">{errors.title}</div>}
             </div>

             <div>
               <label className="block mb-1">本文</label>
               <textarea
                 value={data.body}
                 onChange={e => setData('body', e.target.value)}
                 className="w-full border p-2 rounded h-40"
               />
               {errors.body && <div className="text-red-500">{errors.body}</div>}
             </div>

             <button
               type="submit"
               disabled={processing}
               className="bg-blue-500 text-white px-4 py-2 rounded"
             >
               更新する
             </button>
           </form>
        </div>
    );
}
