#!/usr/bin/env bash
TMP_PATH="$PWD/../tmp-dock-pkg.tar.gz";

rm -rf $TMP_PATH

rm -rf node_modules

(cd $PWD && tar -X $PWD/.platformignore -czvf $TMP_PATH .)

curl -F "data=@$TMP_PATH" --header "Authorization: Bearer $DEPLOY_TOKEN" "https://platform.shub.dev/app/boost?type=production"

