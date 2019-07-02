## About my Homework

1. 使用一些全域變數：
    1. stage 表示遊戲的 "MENU","GAME","OVER" 三個階段。
    2. level 表示目前分數。
    3. timer 表示目前遊戲時間。 
2. 整個遊戲根據顯示順序分成 Background, Font, Floor, Pipes, Bird，分別寫 class 去做管理。
3. 每個 class 都有 `init()`, `update()`, `draw()` 三個 Method 做操作和 `sprites` 存放圖片的物件。
    ```javascript
    class Part {
        constructor() {
            this.position = { };
            this.sprites = { };
            this.sound = { }
        }

        // 初始化
        init() { }

        // 更新數值
        update() { }

        // 顯示
        draw() { }
    }
    ```
4. 所有開頭是 `$` 符號的 function 都在 helper 裡面。

### Features: 
1. basic: 鳥可以受「空白鍵」控制來飛
2. basic: 可以隨著動作發出聲音
3. basic: 鳥的顏色、背景按照真實世界顯示白天晚上
4. advance: 有柱子作為障礙物，可以判斷鳥是否有撞到柱子、天空、地板
4. advance: 可以於遊戲時按下「p」暫停，畫面變暗
4. advance: 可以按下「r」啟動 Crazy bird mode
4. advance: 可以於開始畫面依序輸入「↑↑↓↓←→←→AB」啟動 Very easy mode
4. advance: 分數 > 10，柱子會變成紅色，間距隨機且越變越小
5. advance: 可計分、顯示「Game Over」、按「「空白鍵」重玩

### Notice:

1. 有使用 ES6 語法，沒辦法跑在 IE<=11, chrome<57 瀏覽器上，不過大部分主流瀏覽器的新版都有支援了，所以就沒有花時間使用 babel 去轉譯成 ES5 的語法。
2. `run.sh` 已經刪除，且把 server.py 改成 python2 和 python3 都可以跑的形式。
