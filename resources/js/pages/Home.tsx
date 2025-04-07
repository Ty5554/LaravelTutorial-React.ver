import React from 'react';

type Props = {
    user: {
        name: string;
    };
};

export default function Home({ user }: Props) {
    return (
        <div>
          <h1>こんにちは、{user.name}さん！</h1>
          <p>Laravel + Inertia.js + React の世界へようこそ!</p>
        </div>
    );
}
