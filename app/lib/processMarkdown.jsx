import markedToc from 'marked-toc';
import {default as marked, Renderer} from 'marked';
import highlightJs from 'highlight.js';

marked.setOptions({
    highlight: function(code, lang) {
        return lang ? highlightJs.highlight(lang, code).value : code;
    }
});

export default function processMarkdown(markdown, callback) {
    var toc = '\n<!--start_toc-->\n\n' +
        markedToc(markdown, {maxDepth: 1, slugify: generateHeaderAnchor}) +
        '\n\n<!--end_toc-->\n';
    var html = marked(markdown.replace('<!-- toc -->', toc), {renderer: new RendererReplacement()}, callback);
    html = html.replace('<!--start_toc-->', '<div class="toc"><div class="toc-header">Table of contents:</div>');
    html = html.replace('<!--end_toc-->', '</div>');
    return html;
}

class RendererReplacement extends Renderer {
    heading(text, level, raw) {
        let idPrefix = this.options.headerPrefix;
        let id = generateHeaderAnchor(raw);
        return `<h${level} id="${idPrefix + id}">${text}</h${level}>\n`;
    }
}

/**
 * @see https://github.com/vmg/redcarpet/blob/master/ext/redcarpet/html.c
 * @param {String} text
 * @returns {String}
 */
function generateHeaderAnchor(text) {
    var heading = '';
    /* Dasherize the string removing extra white spaces
     and stripped chars */
    for (let i = 0; i < text.length; ++i) {
        var addDash = false;
        while ((i + 1) < text.length && isIllegalChar(text[i]) && isIllegalChar(text[i + 1])) {
            if (shouldReplaceWithDash(text[i]) || shouldReplaceWithDash(text[i + 1])) {
                addDash = true;
            }
            i++;
        }

        if (addDash || shouldReplaceWithDash(text[i])) {
            if (i + 1 < text.length) {
                heading += '-';
            }
        } else {
            if (!shouldRemoveChar(text[i])) {
                heading += text[i].toLowerCase();
            }
        }
    }
    return heading;
}

const toDashChars = toCharIndex(' -&+$,:;=?@"#{}|^~[]`\\*()%.!\'');
const removeChars = toCharIndex('/');

function isIllegalChar(char) {
    return shouldReplaceWithDash(char) || shouldRemoveChar(char);
}

function shouldReplaceWithDash(char) {
    return Boolean(toDashChars[char]);
}

function shouldRemoveChar(char) {
    return Boolean(removeChars[char]);
}

function toCharIndex(input) {
    return input.split('').reduce((obj, char) => {
        obj[char] = true;
        return obj;
    }, {});
}
