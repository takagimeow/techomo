import * as React from 'react';
import { useHistory } from 'react-router-dom';

export function HomeScreen() {
  const history = useHistory();
  return (
    <div className="py-2 px-4">
      <h1 className="text-3xl">Techomoへようこそ</h1>
      <p className="text-gray-400 my-2">SNSに投稿する感覚でメモを投稿してみてください</p>
      <button
        className="btn-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline bg-purple-700 hover:bg-purple-900 text-white font-normal py-2 px-4 mr-1 rounded"
        onClick={() => {
          history.push('/about');
        }}
      >
        Aboutへ
      </button>
    </div>
  );
}
