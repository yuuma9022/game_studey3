"use strict"//厳格モード有効化（エラーが表示されやすくなる）
//厳格モードについて：厳格にしないことで、変数宣言をせずにあたらしい変数を使用したり、
// レガシーコード（（古いJavascriptコードや他開発者のコードを問題なく動作させやすくなる

//変数(let)・定数(const)エリア
const Font = "48px monospace"//文字のデザイン
let gFrame = 0;//内部カウンター
let gImgMap;//マップ画像

//タイマーイベント
function WmTimer(){
    gFrame++;
    const ca = document.getElementById("main");//htmlよりidがmainである要素を取得して代入
    const g = ca.getContext("2d");//キャンバス要素を2Dに設定
    //コンテキストというキャンバス描写用のペンのような道具がないと、何もできないので、
    //描写用の道具セットを持ってくるイメージ
    g.font = Font;//表示するフォントのデザイン設定

    //画像は縦横16画面ずつを張り付け処理
    for( let y = 0; y < 16; y++){
        for( let x = 0; x < 16; x++){
            g.drawImage( gImgMap, x * 32, y * 32);//画像全体を読み込むために、サイズ分ずらして貼り付け
        }
    }

    g.fillText("Hello World"+ gFrame, gFrame /10, 64 ) //Hello Worldの文字を、x軸=0、y軸64で設置
    //位置は基本左上の頂点が(0,0)右下が第一事象範囲（ｘ、ｙとも＋）

    // 背景は変わらずに文字だけ動くように見えるが、実際は、少しずつずらした文字と毎回画像をあたらしく張り付けて表面上見えなくしているだけ。
}

//ブラウザ起動時イベント
window.onload = function(){
    gImgMap = new Image();//gImgMapを画像用変数に設定
    gImgMap.src = "img/map.png";//マップ画像のURLを設定
    //画像やファイルの読み込みでは基本非同期処理（遅延が発生する処理）なので、読み込みが完了してからしか使用不可
    // 画像が読み込まれた後の処理
    gImgMap.onload = function() {
    setInterval( function(){ WmTimer()}, 33); //33ms（ミリ秒）間隔でWmTimer()を呼び出す設定
    //30.3fps(frames/second)
    }
}
