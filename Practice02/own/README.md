## About my practice

主要設計方式是寫一個 `class ImageViewer`，一開始 `init()` 生成 html structure 和 addEventListener，javascript 控制 `data attr` 的內容，在配合 `css selector` 去控制圖片的出現和消失。

### Features: 
basic, lightbox, Image preview thumbnail, youtube player

### Use:
| options   | type         | default                                   |
|-----------|--------------|-------------------------------------------|
| container | HTML Element | `document.getElementById("ImageViewer" )` |
| medias    | Object       | {}                                        |

```javascript
const iv = new ImageViewer({
    container: document.getElementById('ImageViewer'),
    medias: [
        {
            type: 'image',
            url: './images/pizza01.jpg'
        },
        {
            type: 'image',
            url: './images/pizza01.jpg'
        },
        {
            type: 'youtube',
            url: 'https://www.youtube.com/embed/BpsoSGlJZeE',
            thumbnail: './images/youtube.png'
        }
    ]
});
```

### Notice:

1. 有使用 ES6 語法，沒辦法跑在 IE<=11, chrome<57 瀏覽器上，不過大部分主流瀏覽器的新版都有支援了，所以就沒有花時間使用 babel 去轉譯成 ES5 的語法。
2. 使用 scss 這個 CSS preprocessor，並且用 `node-sass` 去轉譯成 css，如果要看 css，不要看 `style.css` 的檔案，直接看 `scss` 下的 [styles.scss](./scss/styles.scss) 會比較清楚。


### Use library:
1. [normalize.css v8.0.1](https://necolas.github.io/normalize.css/)

Normalize.css makes browsers render all elements more consistently and in line with modern standards. It precisely targets only the styles that need normalizing.
