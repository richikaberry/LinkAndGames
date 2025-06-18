import { Link } from "@remix-run/react";

export default function Sub() {
  return (
    <>
      <div>次のページ</div>
      <a href="/">最初のページ</a><br />
      {/* ブラウザネットワークを上記と比較するとClientSseverRoutingで、最初のレンダリングを除いてその後のRoutingで不要なファイルを送りつけなくなる */}
      <Link to={`/`}>Link 最初のページ</Link>
    </>
  )
}