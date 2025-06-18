import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div>
      <div className="font-sans p-4">
        <p>最初のページ</p>
        <a href="/sub">次のページ</a><br />
        <Link to={`/sub`}>Link 次のページ</Link>
      </div>
      <div>
        <Link to="/game" className="text-blue-500 hover:underline">
          ゲームへ
        </Link>
      </div>
    </div>
  );
}
