"use strict"

//変数(let)・定数(const)エリア（なるべく直接的な数字は使わない方向で考える)
const Font = "48px monospace"//文字のデザイン
let gFrame = 0;//内部カウンター
let gScreen;//仮想画面
let WIDTH = window.innerWidth;//横サイズ
let HEIGHT = window.innerHeight;//縦サイズ
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
    for( let y = 0; y < gImgHeight; y++){
        for( let x = 0; x < gImgWidth; x++){
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

    g.drawImage(gScreen,0,0);//キャンバスへ仮想画面を張り付ける

    }



// 画面サイズメソッド
function WmSize(){
    const ca = document.getElementById("main");
    const g = ca.getContext("2d");
    ca.width = window.innerWidth;//横方向サイズについて、ウィンドウサイズにキャンバスサイズを合わせる
    ca.height = window.innerHeight;//縦方向サイズについて、ウィンドウサイズにキャンバスサイズを合わせる
    const gs = gScreen.getContext("2d");
    gScreen.width = window.innerWidth;//横方向サイズについて、ウィンドウサイズにキャンバスサイズを合わせる
    gScreen.height = window.innerHeight;//縦方向サイズについて、ウィンドウサイズにキャンバスサイズを合わせる

}


//ブラウザ起動時イベント
window.onload = function(){
    
    gImgMap = new Image();//gImgMapを画像用変数に設定
    gImgMap.src = "img/map.png";
    gImgHeight = HEIGHT/10;
    gImgWidth = WIDTH/10;

    window.addEventListener("resize",function(){ WmSize()});
    

    // 画像が読み込まれた後の処理
    gImgMap.onload = function() {

    const ca = document.getElementById("main");
    const g = ca.getContext("2d");
    gScreen = document.createElement("canvas");//仮想画面の作成
    gScreen.width = WIDTH;
    gScreen.height = HEIGHT;

    setInterval( function(){ WmTimer()}, 33); 
        WmSize();
    }
    window.addEventListener("resize",function(){ WmSize()});
}


//20250424
//caは重複しているから外に出したい
// →画像が読み込み完了してから出ないと、ずれるので、入れるタイミングの調整と使いまわせるように準備が必要。
//動画内では、説明を省いているが、画像を拡大して、背景やキャラクターを見やすくする下地作りを2.5として
// 理解度を深めながら行う予定
//少し、画面サイズ値は動画のよりいじってしまっているので、一度動画と同じ状態のものを１つ作成しつつ、
// 変更を掛けていくこと

//ショートカットキー
//VSコードだと、Ctrl+D