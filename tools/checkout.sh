#!/bin/sh

if [ -d jscs ]; then
    cd jscs && git fetch origin;
else
    git clone git@github.com:jscs-dev/node-jscs.git jscs;
    cd jscs;
fi

LAST_TAG_REV=`git rev-list --tags --max-count=1`;
LAST_TAG=`git describe --tags "$LAST_TAG_REV"`;
git checkout "$LAST_TAG";

npm install

npm run coverage-html
