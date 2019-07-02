class ImageViewer {
    /**
     * ImageViewer constructor function
     *
     * @param {Object} options - See README
     * @constructor
     */
    constructor (options) {
        this.container = options.container || document.getElementById("ImageViewer");
        this.medias    = options.medias    || {};
        this.current_state = {
            media_key: 0
        };
        this.init();
    }

    /**
     * init HTML structure and event listener
     *
     */
    init () {
        // HTML structure
        this.container.innerHTML = `
            <div class="iv-title">Image Viewer</div>
            <div class="iv-medias"></div>
            <div class="iv-nav">
                <div class="iv-button" id="iv-back" title="Back">
                    <img src="./images/back.png" alt="back" />
                </div>
                <div class="iv-thumbnails"></div>
                <div class="iv-button" id="iv-next" title="Next">
                    <img src="./images/next.png" alt="next" />
                </div>
            </div>
        `;

        this.medias_container     = this.container.querySelector('.iv-medias');
        this.thumbnails_container = this.container.querySelector('.iv-thumbnails');

        Array.from(this.medias).forEach( (media, index) => {
            this.medias_container.innerHTML += `
                <div 
                    class="iv-media ${media.type}"
                    data-active="false" data-key="${index}"
                >
                    ${this.generate_media_html(media)}
                </div>
            `;
            this.thumbnails_container.innerHTML += `
                <div class="iv-thumbnail" data-active="false" data-key="${index}">
                    <img src="${media.thumbnail || media.url}" alt="" />
                    <div class="iv-cuticle"></div>
                </div>
            `;
        });

        // event listener
        this.back_button = this.container.querySelector('#iv-back');
        this.next_button = this.container.querySelector('#iv-next');
        this.back_button.addEventListener( 'click', () => { this.switch_media(-1); });
        this.next_button.addEventListener( 'click', () => { this.switch_media( 1); });

        Array
            .from( this.container.querySelectorAll('.iv-thumbnail') )
            .forEach( thumb => { 
                thumb.addEventListener('click', () => {
                    this.switch_media(thumb.dataset.key);
                });
            });

        Array
            .from( this.container.querySelectorAll('.image') )
            .forEach( pic => { 
                pic.addEventListener( 'click', () => {
                    pic.classList.toggle('lightbox');
                });
            });

        // default on media[0]
        this.switch_media(0);
    }

    /**
     * switch media
     *
     * @param {Number || String} index
     *      - String for click thumbnail, Number for click button
     */
    switch_media (index) {
        let new_media_key = this.current_state.media_key;
        switch (index) {
            case 1: case -1: {
                new_media_key += index; break;
            }
            default: {
                new_media_key = +index; break;
            }
        }

        if ( new_media_key >= 0 && new_media_key <= this.medias.length - 1 ) {
            this.current_state.media_key = new_media_key;

            Array
                .from( this.container.querySelectorAll('[data-active=true]') )
                .forEach( el => el.setAttribute('data-active', false) );
            Array
                .from( this.container.querySelectorAll(`[data-key="${new_media_key}"]`) )
                .forEach( el => el.setAttribute('data-active', true) );

            this.back_button.classList.remove("disabled");
            this.next_button.classList.remove("disabled");
            if ( new_media_key == 0 ) {
                this.back_button.classList.add("disabled");
            }
            if ( new_media_key == this.medias.length - 1 ) {
                this.next_button.classList.add("disabled");
            }
        }
    }

    /**
     * generate media html content
     *
     * @param {Object} media - media attributes
     */
    generate_media_html (media ) {
        if ( media.type === 'image' ) {
            return `<img src="${media.url}" alt=""/>`;
        } else if ( media.type === 'youtube' ) {
            return `<iframe src="${media.url}?modestbranding=1&color=white"
                    frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" ></iframe>`;
        }
    }
}


