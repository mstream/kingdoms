const ttf2woff2 = require('ttf2woff2');
const Fontmin = require('fontmin');
const RawSource = require('webpack-sources').RawSource;

const FONT_REGEX = /\.(ttf|woff2)$/;
const TEXT_REGEX = /\.(js|css|html)$/;
const GLYPH_REGEX = /content\s*:[^};]*?('|")(.*?)\s*('|"|;)/g;
const UNICODE_REGEX = /\\(\w{4})/;
const PLUGIN_NAME = 'MinimizeFontsPlugin';

const findUnicodeGlyphs = (compilation) => {
    return Object.keys(compilation.assets).reduce(
        (unicodeGlyphs, assetName) => {
            if (!TEXT_REGEX.test(assetName)) {
                return unicodeGlyphs;
            }

            const content = compilation.assets[assetName].source();

            const matches = content.match(GLYPH_REGEX) || [];

            const unicodeMatches = matches
                .map((match) => {
                    const unicodeMatch = match.match(UNICODE_REGEX);
                    return unicodeMatch
                        ? String.fromCharCode(parseInt(unicodeMatch[1], 16))
                        : false;
                })
                .filter(Boolean);

            return [...unicodeGlyphs, ...unicodeMatches];
        },
        [],
    );
};

const minimize = (compilation, done) => {
    const fonts = Object.keys(compilation.assets)
        .filter((asset) => FONT_REGEX.test(asset))
        .map((asset) => ({ asset, buffer: compilation.assets[asset]._value }))
        .sort((asset1, asset2) => asset1.buffer.length - asset1.buffer.length);

    const ttfFonts = fonts.filter((font) => font.asset.endsWith('ttf'));
    const woff2Fonts = fonts.filter((font) => font.asset.endsWith('woff2'));

    const unicodeGlyphs = findUnicodeGlyphs(compilation);

    const minimizedTtfFontPromises = ttfFonts.map((font) => {
        return new Promise((resolve, reject) => {
            const fontmin = new Fontmin().use(
                Fontmin.glyph({ text: unicodeGlyphs.join(' ') }),
            );

            fontmin.src(font.buffer).run((error, files) => {
                if (error) {
                    reject(error);
                }
                resolve({
                    asset: font.asset,
                    buffer: files[0].contents,
                });
            });
        });
    });

    Promise.all(minimizedTtfFontPromises)
        .then((minimizedTtfFonts) => {
            minimizedTtfFonts.forEach((minimizedTtfFont, index) => {
                const woff2Font = woff2Fonts[index];
                compilation.assets[minimizedTtfFont.asset] = new RawSource(
                    minimizedTtfFont.buffer,
                );
                compilation.assets[woff2Font.asset] = new RawSource(
                    ttf2woff2(minimizedTtfFont.buffer),
                );
            });
            done();
        })
        .catch(done);
};

class MinimizeFontsPlugin {
    apply(compiler) {
        compiler.hooks.thisCompilation.tap(PLUGIN_NAME, (compilation) => {
            compilation.hooks.afterSeal.tapAsync(PLUGIN_NAME, (done) => {
                minimize(compilation, done);
            });
        });
    }
}

module.exports = MinimizeFontsPlugin;
