"use strict"

//変数(let)・定数(const)エリア（なるべく直接的な数字は使わない方向で考える)
const Font = "48px monospace"//文字のデザイン
let gFrame = 0;//内部カウンター
let gScreen;//仮想画面
let WIDTH = 128;//横サイズ
let HEIGHT = 120;//縦サイズ
let gImgMap;//マップ画像

let gImgWidth;//背景の大きさ横幅
let gImgHeight;//背景の大きさ縦幅

//タイマーイベント
function WmTimer(){
    const ca = document.getElementById("main");
    gFrame++;
    WmPaint();
}

//仮想画面描写メソッド
function DrawMain(){

    const g = gScreen.getContext("2d");

    g.font = Font;

    //画像は縦横16画面ずつを張り付け処理
    for( let y = 0; y < 32; y++){
        for( let x = 0; x < 64; x++){
            g.drawImage( gImgMap, x * 32, y * 32);
        }
    }
    //上記だと、定数で無理やり調整を行っているので、ウィンドウサイズ取得して、その分数字で繰り返すように調整してみた。(一時的におおよそで取得しているが、もうちょい詳細計算でギリで詰めたい)


    g.fillText("Hello World"+ gFrame, gFrame /10, 64 ) 

}

// 描画メソッド
function WmPaint(){

    DrawMain();//先に仮想画面を作成。
    const ca = document.getElementById("main");
    const g = ca.getContext("2d");

    g.drawImage(gScreen,0,0,gScreen.width,gScreen.height,0,0,ca.width,ca.height);//キャンバスへ仮想画面を拡大して張り付ける
    //drawImage(貼り付けるもの,x座標スタート位置,y座標スタート位置,
    //貼り付けるものの横サイズ,貼り付けるものの縦サイズ,貼り付け先x座標貼り付けスタート位置,貼り付け先y座標貼り付けスタート位置,
    //横サイズでどのくらい貼り付けるか,縦サイズでどのくらい貼り付けるか)
    }



// 画面サイズメソッド
function WmSize(){
    const ca = document.getElementById("main");
    const g = ca.getContext("2d");
    ca.width = window.innerWidth;//横方向サイズについて、ウィンドウサイズにキャンバスサイズを合わせる
    ca.height = window.innerHeight;//縦方向サイズについて、ウィンドウサイズにキャンバスサイズを合わせる

}


//ブラウザ起動時イベント
window.onload = function(){
    
    gImgMap = new Image();//gImgMapを画像用変数に設定
    gImgMap.src = "img/map.png";
    WmSize();

        const ca = document.getElementById("main");
        const g = ca.getContext("2d");
        gScreen = document.createElement("canvas");//仮想画面の作成
        gScreen.width = WIDTH;
        gScreen.height = HEIGHT;

    window.addEventListener("resize",function(){ WmSize()});
    setInterval( function(){ WmTimer()}, 33); 

    // // 画像が読み込まれた後の処理(これは今回使用する背景画像が軽いから必要なし)
    // gImgMap.onload = function() {

    // }

}


//20250424

//ショートカットキー
//VSコードだと、Ctrl+D