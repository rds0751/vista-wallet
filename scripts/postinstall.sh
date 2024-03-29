#!/bin/bash
echo "PostInstall script:"
echo "1. React Native nodeify..."
node_modules/.bin/rn-nodeify --install 'crypto,buffer,react-native-randombytes,vm,stream,http,https,os,url,net,fs' --hack
echo "2. jetify"
# npx jetify
# echo "3. Patch npm packages"
# npx patch-package
#echo "4. Create xcconfig files..."
#echo "" > ios/debug.xcconfig
#echo "" > ios/release.xcconfig
#echo "5. Init git submodules"
#echo "This may take a while..."
#git submodule update --init
echo "3 copy provider"
# for android
cp node_modules/humaniq-ethereum-provider/dist/humaniq-provider.js android/app/src/main/assets/provider.js
# for ios
cp node_modules/humaniq-ethereum-provider/dist/humaniq-provider.js provider/provider.js