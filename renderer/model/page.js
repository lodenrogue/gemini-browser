class Page {

    constructor(content) {
        this.content = content;
        this.links = [];
    }

    render() {
        if(!this.rendered) {
            this.rendered = this.renderContent(this.content);
        }
        return this.rendered;
    }

    renderContent(unrendered) {
        return unrendered
            .split('\n')
            .map(line => this.renderLine(line))
            .join('\n');
    }

    renderLine(unrendered) {
        const trimmed = unrendered.trim();
        if(trimmed.startsWith('# ')) {
            return this.renderHeading(trimmed);
        }
        else if(trimmed.startsWith('## ')) {
            return this.renderSubHeading(trimmed);
        }
        else if(trimmed.startsWith('* ')) {
            return this.renderListItem(trimmed);
        }
        else if(trimmed.startsWith('=>')) {
            return this.renderLink(trimmed);
        }
        else {
            return trimmed;
        }
    }

    renderHeading(line) {
        return `{red-fg}${line}{/}`;
    }

    renderSubHeading(line) {
        return `{green-fg}${line}{/}`;
    }

    renderListItem(line) {
        return line.replace('*', ' \u2022');
    }

    renderLink(line) {
        const link = this.getLink(line);
        const label = this.getLabel(line);
        const linkColor = this.getLinkColor(link);

        this.links.push(link);
        const indexPrefix = this.createIndexPrefix(this.links.length);

        if(label) {
            return `${indexPrefix} {${linkColor}-fg}${label}{/}`;
        }
        else {
            return `${indexPrefix} {${linkColor}-fg}${link}{/}`;
        }
    }

    getLinkColor(link) {
        return link.startsWith('http') ? '#8700d7' : 'blue';
    }

    createIndexPrefix(index) {
        const prefix = `[${index}]`;
        const paddingSize = 5 - prefix.length;

        if(paddingSize > 0) {
            return prefix + ' '.repeat(paddingSize);
        }
        return prefix;
    }

    getLink(line) {
        const content = this.getLinkContent(line);
        const whitespaceIndex = this.getWhitespaceIndex(content);
        return content.slice(0, whitespaceIndex);
    }

    getLabel(line) {
        const content = this.getLinkContent(line);
        const whitespaceIndex = this.getWhitespaceIndex(content);

        if(whitespaceIndex == -1) return '';
        return content.slice(whitespaceIndex).trim();
    }

    getLinkContent(line) {
        const indexMarker = line.indexOf('=>');
        return line.slice(indexMarker + 2).trim();
    }

    getWhitespaceIndex(line) {
        for(let i = 0; i < line.length; i++) {
            if(line.charAt(i) == ' ' || line.charAt(i) == '\t') {
                return i;
            }
        }
        return -1;
    }
}

module.exports = Page;
