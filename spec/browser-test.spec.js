describe('Browser', function() {
    const Browser = require('../browser');
    const EventEmitter = require('events').EventEmitter;

    let browser;
    let client;
    let eventEmitter;

    beforeEach(function() {
        client = {};
        eventEmitter = new EventEmitter();

        let renderer = createMockRenderer();
        browser = new Browser(client, eventEmitter, renderer);
    });

    it('should retrieve correct content when navigating to page', async () => {
        let content = createTestContent();
        client.fetch = (url) => content;

        spyOn(eventEmitter, 'emit');
        browser.navigateTo('gemini://test.test');
        
        expect(eventEmitter.emit).toHaveBeenCalledWith(
            'navigated',
            content
        );
    });

    function createMockRenderer() {
        return {
            start: function() {}
        };
    }

    function createTestContent() {
        return `
            # Header
            ## Sub-heading
            ### Sub-sub-heading
            * item 1
            * item 2
            * item 3
        `;
    }
});
