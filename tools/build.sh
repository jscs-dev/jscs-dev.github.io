#!/bin/sh

rm -Rf result
mkdir result
mkdir result/jscs
cp jscs/coverage.html result/jscs
cp -R app/resources/* result

npm run build-js
node app/buildPages
