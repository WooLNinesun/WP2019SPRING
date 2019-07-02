## About my Homework

主要設計方式是寫一個 `class ImageViewer`，一開始定義好我的 `items` 物件的 `method` 之後在 `__init()` 生成 html structure 和 addEventListener

### Features: 
1. basic: 可建立數個 TodoItems
2. basic: 可新增刪除任意 TodoItem
3. basic: 可勾選已完成的 TodoItem
4. basic: 在畫面上顯示已完成的 TodoItems 的不同
5. basic: 統計並顯示未完成的 TodoItem 數量
6. advance: 可再次編輯 item 的內容
6. advance: filter 已完成/未完成項目，且可動態消失，且標示目前的 filter
7. advance: 一鍵刪除所有已完成項目，且沒有可清除時 clear button 會變淡
8. advance: 簡單的防止 xss attack，可以好好顯示內容是 html tag 的內容

### Use:
| options   | type         | default                                   |
|-----------|--------------|-------------------------------------------|
| container | HTML Element | `document.getElementById("todo-app" )` |

```html
<!DOCTYPE html>
<html lang="en">
...
<body>
    <div id="todo-app"></div>
</body>
<script type="text/javascript" src="main.js"></script>
<script>
const todo = new TodoListApp({
    container: document.getElementById('todo-app'),
    items: []
});
</script>
</html>
```

### Notice:

1. 有使用 ES6 語法，沒辦法跑在 IE<=11, chrome<57 瀏覽器上，不過大部分主流瀏覽器的新版都有支援了，所以就沒有花時間使用 babel 去轉譯成 ES5 的語法。
2. 使用 scss 這個 CSS preprocessor，並且用 `node-sass` 去轉譯成 css，如果要看 css，不要看 `style.css` 的檔案，直接看 `scss` 下的 [styles.scss](./scss/styles.scss) 會比較清楚。


### Use library:
1. [normalize.css v8.0.1](https://necolas.github.io/normalize.css/)

Normalize.css makes browsers render all elements more consistently and in line with modern standards. It precisely targets only the styles that need normalizing.
