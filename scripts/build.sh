#! /bin/bash
#
# \\\ wami ///
# /// 12-Feb-2015 \\\
#
#
# Build script
#

function usage() {
    echo "Usage:" `basename $0` "debug | release"
    exit 1
}

if [[ $# -ne 1 ]]; then
    usage
fi

if [[ ! -f "./index.js" ]]; then
    echo "Please, run this script from scrollback-ii main directory"
    exit 1
fi

# Environment setup
case "$1" in
    debug)
        echo "Setting up debug environment..."
        sed -i -e 's/env: "production"/env: "dev"/g' ./server-config.js
        ;;
    release)
        echo "Setting up release environment..."
        sed -i -e 's/env: "dev"/env: "production"/g' ./server-config.js
        ;;
    *)
        usage
        ;;
esac

# Build
echo "Starting gulp..."
gulp
