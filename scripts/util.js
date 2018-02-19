const Path = require("path");

/**
 * Provides functions for making paths relative to other common paths.
 */
const rel = {
    /**
     * Join paths and make resulting paths relative to the src directory.
     * @param paths {string[]} a list of paths to join.
     */
    src: function(...paths) {
        const joined = Path.join(...paths);
        const fullpath = Path.join(__dirname, "..", "src", joined);
        return Path.resolve(fullpath);
    },

    /**
     * Join paths and make resulting paths relative to the build directory.
     * @param paths {string[]} a list of paths to join.
     */
    build: function(...paths) {
        const joined = Path.join(...paths);
        const fullpath = Path.join(__dirname, "..", "build", joined);
        return Path.resolve(fullpath);
    }
};

module.exports = {
    rel
};
