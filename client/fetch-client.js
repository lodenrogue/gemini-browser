const fetch = require('gemini-fetch')({
    followRedirects: true,
    useClientCerts: false
});

class FetchClient {
    
    async fetch(url) {
        const response = await fetch(url);
        return await response.text();
    }
}

module.exports = FetchClient;
