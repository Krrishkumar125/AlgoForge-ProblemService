const marked = require('marked');
const sanitize = require('sanitize-html');
const TurndownService = require('turndown');

function sanitizeMarkdown(markdownContent) {
    const turdownService = new TurndownService();

    const convertedHtml = marked.parse(markdownContent);

    const sanitizedHtml = sanitize(convertedHtml, {
        allowedTags: sanitize.defaults.allowedTags
    });

    const sanitizedMarkdown = turdownService.turndown(sanitizedHtml);

    return sanitizedMarkdown;
}

module.exports = sanitizeMarkdown;