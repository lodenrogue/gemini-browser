const blessed = require('blessed');
const Page = require('./model/page');

class ContentPanel {

    constructor(screen, eventEmitter) {
        this.screen = screen;
        this.eventEmitter = eventEmitter;

        this.box = this.createBox();
        this.screen.append(this.box);
        this.screen.render();

        this.registerNavigation();
    }

    createBox() {
        return blessed.box({
            top: '5%',
            left: '15%',
            tags: true,
            // border: {
            //     type: 'line'
            // },
            style: {
                fg: 'white',
                bg: 'black',
                // border: {
                //     fg: '#f0f0f0'
                // }
            },
            scrollable: true,
            alwaysScroll: true,
            mouse: true
        });
    }

    registerNavigation() {
        this.eventEmitter.addListener('navigated', (url, content) => {
            const page = new Page(content);
            this.box.setContent(page.render());
            this.screen.render();
        });
    }
}

module.exports = ContentPanel;
