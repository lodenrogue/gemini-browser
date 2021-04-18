const fetch = require('gemini-fetch')({
    followRedirects: true,
    useClientCerts: false
});

async function run() {
    const response = await fetch('gemini://gemini.circumlunar.space/');
    console.log(await response.text());
}

const FetchClient = require('./client/fetch-client');
const EventEmitter = require('events').EventEmitter;
const TerminalRenderer = require('./renderer/terminal-renderer');

class Browser {
    
    constructor(client = new FetchClient(), 
                eventEmitter = new EventEmitter(),
                renderer = new TerminalRenderer()) {

        this.client = client;
        this.eventEmitter = eventEmitter;
        renderer.start(eventEmitter);
    }

    async navigateTo(url) {
        const content = await this.client.fetch(url);
        this.eventEmitter.emit('navigated', url, content);
    }
}

module.exports = Browser;
