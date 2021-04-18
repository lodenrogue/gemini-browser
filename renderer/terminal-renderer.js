const blessed = require('blessed');
const ContentPanel = require('./content-panel');

class TerminalRenderer {

    constructor() {
        this.screen = this.createScreen();
    }

    start(eventEmitter) {
        new ContentPanel(this.screen, eventEmitter);
    }

    createScreen() {
        let screen = blessed.screen({
            smartCSR: true
        });

        screen.key(['escape', 'q', 'C-c'], function(ch, key) {
            return process.exit(0);
        });

        screen.title = 'Gemini Browser';
        return screen;
    }
}

module.exports = TerminalRenderer;
