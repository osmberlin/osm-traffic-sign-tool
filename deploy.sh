#!/usr/bin/env sh

# abort on errors
set -e

# First run check
npm run check

# Increase version
# Which will commit the change version number; which is then available at build time
# Docs https://docs.npmjs.com/cli/v8/commands/npm-version
read -p "Do you want to increase the prepatch version? (Press any key to continue or N to skip): " -n 1 -r
echo    # (optional) move to a new line
if [[ ! $REPLY =~ ^[Nn]$ ]]
then
    npm version prepatch
else
    echo "Skipping version increase."
fi

# build
npm run build

# navigate into the build output directory
cd dist

# place .nojekyll to bypass Jekyll processing
echo > .nojekyll

# place CNAME file to set custom domain
# Test at https://github.com/osmberlin/osm-traffic-sign-tool/settings/pages, needs to show "Custom domain"
echo "trafficsigns.osm-verkehrswende.org" > CNAME

git init
git checkout -B main
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git main

# if you are deploying to https://<USERNAME>.github.io/<REPO>
# https://osmberlin.github.io/osm-traffic-sign-tool/
git push -f git@github.com:osmberlin/osm-traffic-sign-tool.git main:gh-pages

open https://osmberlin.github.io/osm-traffic-sign-tool/
open https://github.com/osmberlin/osm-traffic-sign-tool/actions

cd -
