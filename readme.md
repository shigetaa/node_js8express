# Express.js でアプリケーションを設定する

Webアプリケーションの構築は、Webフレームワークが加わって、以前よりも単純な仕事になりました。
Node.jsのWebフレームワークは、アプリケーションに構造を与えるモジュールです。
その構造によって、例えば個々のファイルの供給と言った機能をゼロから構築することなく、ユーザーによるアプリケーションの操作を簡単に構築し、カスタマイズ出来るのです。

## Express.js パッケージをインストール
`Express.js` のインストールは以下のコマンドでインストールします。

```bash
npm i express
```

## Express.js アプリケーションを構築する
Express.js を使い始めるには、まずメインアプリケーションを作って、`express` モジュールをロードする必要があります。
`main.js`と言うファイルを以下の様に記述します。

```javascript
const port = 3000;
const express = require("express");
const app = express();

// 
app.get("/", (req, res) => {
	res.send("Hello World!");
}).listen(port, () => {
	console.log("server start http://localhost:%d/", port);
});
```
以下のコマンドを実行してみます。
```bash
node main.js
```
```bash
server start http://localhost:3000/
```
Webブラウザで`http://localhost:3000/`にアクセスしてみて **Hello World!** が表示されると思います。

## Web フレームワークを理解する
Webフレームワークは、あなたの代わりに大量の退屈な作業をこなすように設計されていて、アプリケーションをカスタマイズする直感的な構造を与えてくれます。
Express.jsは、特定のURLへのリクエストを監視してコールバック関数によってレスポンスする方法を提供します。

Express.jsのようなWebフレームワーク運用機能は、HTTPによるWeb上の相互作用とNode.jsプラットフォームとの中間に位置するので、ある種のミドルウェアと言えます。「ミドルウェア」というのは一般的な用語ですが、この場合はデータをアプリケーションのロジックが処理する前に行われる、HTTP通信の監視、分析、フィルタリング、ハンドリングを援助するコードのことです。

ミドルウェアには、Express.jsよりも小規模なパッケージもあります。
ある種のミドルウェアはセキュリティを担当し、データがコアアプリケーションに渡る前に、到着したリクエストをチェックします。

この場合もHTTPメソッドを使うことに変わりはないので、アプリケーションとブラウザとの間の全体的な相互作用は、`http`モジュールを使ったアプリケーションから、大きく変わってはいません。
あなたが扱う、`request` と `response` のオブジェクトは以前と同じものでやはり送信側に関する豊富な情報と、その内容を含んでいます。Express.jsは、その情報を取得しやすくするメソッドを供給するのです。

`response` オブジェクトの `send` メソッドの他に、Express.js は、リクエスト本体からデータを取り出しロギングする単純な方法を提供します。

前項で作成した`main.js`にあるGET ルートハンドラに追記してみます。

```javascript
const port = 3000;
const express = require("express");
const app = express();

// 
app.get("/", (req, res) => {
	console.log(req.params);
	console.log(req.body);
	console.log(req.url);
	console.log(req.query);
	res.send("Hello World!");
}).listen(port, () => {
	console.log("server start http://localhost:%d/", port);
});
```
以下のコマンドを実行してみます。
```bash
node main.js
```
```bash
server start http://localhost:3000/
```
アプリケーションを再起動したらWebブラウザで`http://localhost:3000/?name=shigeta`でアクセスしてみてください。
```bash
{}
undefined
/?name=shigeta
{ name: 'shigeta' }
```
この様に、request オブジェクトを使用して簡単に情報を取得出来るようになります。

request オブジェクトからは、次のように値を取り出す事ができます。

| データオブジェクト | 説明                                                                         |
| :----------------- | :--------------------------------------------------------------------------- |
| params             | URLからIDとトークンを抽出できます。                                          |
| body               | リクエストの内容のほとんどすべてを含みます。                                 |
| url                | 訪問されているURLに関する情報を提供します。                                  |
| query              | body　と同じく、送出されたデータをアプリケーションのサーバーに抽出出来ます。 |