# Copy files
rm -rf "./temp"
mkdir "./temp"
wget "https://github.com/NicolasFlamel1/mwcwallet.com/archive/refs/heads/master.zip"
unzip "./master"
cp -r "./mwcwallet.com-master/public_html/." "./temp/"
chmod 777 -R "./temp/"
cp "./service_worker.js" "./temp/"
cp "./content_script.js" "./temp/"
cp "../common/api.js" "./temp/"
cp -R "../common/_locales" "./temp/"
cp "../common/_locales/en_US/messages.json" "./" && HTTP_ACCEPT_LANGUAGE="en_US" php "./messages.json" > "./temp/_locales/en_US/messages.json"

# Get version
VERSION=$(grep -Po "(?<=VERSION_NUMBER = \").*(?=\";)" "./temp/backend/common.php")

# Remove unused files
rm -r "./temp/backend"
rm -r "./temp/errors"
rm -r "./temp/languages"
rm "./temp/browserconfig.xml"
rm "./temp/connection_test.html"
rm "./temp/robots.txt"
rm "./temp/site.webmanifest"
rm "./temp/sitemap.xml"
rm "./temp/privacy_policy.txt"
rm "./temp/.user.ini"
rm "./temp/scripts/service_worker.js"

# Compile manifest.json
SERVER_NAME="mwcwallet.com" HTTPS="on" NO_FILE_VERSIONS="" NO_FILE_CHECKSUMS="" NO_MINIFIED_FILES="" HTTP_SERVER_ADDRESS="https://mwcwallet.com" TOR_SERVER_ADDRESS="http://mwcwalletmiq3gdkmfbqlytxunvlxyli4m6zrqozk7xjc353ewqb6bad.onion" php "./manifest.json" > "./temp/manifest.json"

# Compile index.html
SERVER_NAME="mwcwallet.com" HTTPS="on" NO_FILE_VERSIONS="" NO_FILE_CHECKSUMS="" NO_MINIFIED_FILES=""  HTTP_SERVER_ADDRESS="https://mwcwallet.com" TOR_SERVER_ADDRESS="http://mwcwalletmiq3gdkmfbqlytxunvlxyli4m6zrqozk7xjc353ewqb6bad.onion" php "./mwcwallet.com-master/public_html/index.html" > "./temp/index.html"
sed -i "s/rel=\"preload\"/rel=\"prefetch\"/" "./temp/index.html"

# Move scripts from index.html to index.js
sed -i "s/ onerror=\"[^\"]*\"//" "./temp/index.html"
sed -i "s/ onload=\"[^\"]*\"//" "./temp/index.html"
grep -Pzo "(?s)(?<=<script>).*?(?=</script>)" "./temp/index.html" > "./temp/index.js"
sed -i "s/\x00//" "./temp/index.js"
sed -i "/<script>/,/<\/script>/d" "./temp/index.html"
sed -i "0,/<script/s//<script src=\".\/index.js\" type=\"application\/javascript\" charset=\"UTF-8\"><\/script>\n\t<script/" "./temp/index.html"

# Compile styles
SERVER_NAME="mwcwallet.com" HTTPS="on" NO_FILE_VERSIONS="" NO_FILE_CHECKSUMS="" NO_MINIFIED_FILES=""  HTTP_SERVER_ADDRESS="https://mwcwallet.com" TOR_SERVER_ADDRESS="http://mwcwalletmiq3gdkmfbqlytxunvlxyli4m6zrqozk7xjc353ewqb6bad.onion" php "./mwcwallet.com-master/public_html/fonts/btc/btc.css" > "./temp/fonts/btc/btc.css"
SERVER_NAME="mwcwallet.com" HTTPS="on" NO_FILE_VERSIONS="" NO_FILE_CHECKSUMS="" NO_MINIFIED_FILES=""  HTTP_SERVER_ADDRESS="https://mwcwallet.com" TOR_SERVER_ADDRESS="http://mwcwalletmiq3gdkmfbqlytxunvlxyli4m6zrqozk7xjc353ewqb6bad.onion" php "./mwcwallet.com-master/public_html/fonts/eth/eth.css" > "./temp/fonts/eth/eth.css"
SERVER_NAME="mwcwallet.com" HTTPS="on" NO_FILE_VERSIONS="" NO_FILE_CHECKSUMS="" NO_MINIFIED_FILES=""  HTTP_SERVER_ADDRESS="https://mwcwallet.com" TOR_SERVER_ADDRESS="http://mwcwalletmiq3gdkmfbqlytxunvlxyli4m6zrqozk7xjc353ewqb6bad.onion" php "./mwcwallet.com-master/public_html/fonts/font_awesome/font_awesome.css" > "./temp/fonts/font_awesome/font_awesome.css"
SERVER_NAME="mwcwallet.com" HTTPS="on" NO_FILE_VERSIONS="" NO_FILE_CHECKSUMS="" NO_MINIFIED_FILES=""  HTTP_SERVER_ADDRESS="https://mwcwallet.com" TOR_SERVER_ADDRESS="http://mwcwalletmiq3gdkmfbqlytxunvlxyli4m6zrqozk7xjc353ewqb6bad.onion" php "./mwcwallet.com-master/public_html/fonts/grin/grin.css" > "./temp/fonts/grin/grin.css"
SERVER_NAME="mwcwallet.com" HTTPS="on" NO_FILE_VERSIONS="" NO_FILE_CHECKSUMS="" NO_MINIFIED_FILES=""  HTTP_SERVER_ADDRESS="https://mwcwallet.com" TOR_SERVER_ADDRESS="http://mwcwalletmiq3gdkmfbqlytxunvlxyli4m6zrqozk7xjc353ewqb6bad.onion" php "./mwcwallet.com-master/public_html/fonts/mwc/mwc.css" > "./temp/fonts/mwc/mwc.css"
SERVER_NAME="mwcwallet.com" HTTPS="on" NO_FILE_VERSIONS="" NO_FILE_CHECKSUMS="" NO_MINIFIED_FILES=""  HTTP_SERVER_ADDRESS="https://mwcwallet.com" TOR_SERVER_ADDRESS="http://mwcwalletmiq3gdkmfbqlytxunvlxyli4m6zrqozk7xjc353ewqb6bad.onion" php "./mwcwallet.com-master/public_html/fonts/open_sans/open_sans.css" > "./temp/fonts/open_sans/open_sans.css"
SERVER_NAME="mwcwallet.com" HTTPS="on" NO_FILE_VERSIONS="" NO_FILE_CHECKSUMS="" NO_MINIFIED_FILES=""  HTTP_SERVER_ADDRESS="https://mwcwallet.com" TOR_SERVER_ADDRESS="http://mwcwalletmiq3gdkmfbqlytxunvlxyli4m6zrqozk7xjc353ewqb6bad.onion" php "./mwcwallet.com-master/public_html/styles/section.css" > "./temp/styles/section.css"
SERVER_NAME="mwcwallet.com" HTTPS="on" NO_FILE_VERSIONS="" NO_FILE_CHECKSUMS="" NO_MINIFIED_FILES=""  HTTP_SERVER_ADDRESS="https://mwcwallet.com" TOR_SERVER_ADDRESS="http://mwcwalletmiq3gdkmfbqlytxunvlxyli4m6zrqozk7xjc353ewqb6bad.onion" php "./mwcwallet.com-master/public_html/styles/unlocked.css" > "./temp/styles/unlocked.css"

# Compile scripts
SERVER_NAME="mwcwallet.com" HTTPS="on" NO_FILE_VERSIONS="" NO_FILE_CHECKSUMS="" NO_MINIFIED_FILES=""  HTTP_SERVER_ADDRESS="https://mwcwallet.com" TOR_SERVER_ADDRESS="http://mwcwalletmiq3gdkmfbqlytxunvlxyli4m6zrqozk7xjc353ewqb6bad.onion" php "./mwcwallet.com-master/public_html/scripts/camera_worker.js" > "./temp/scripts/camera_worker.js"
SERVER_NAME="mwcwallet.com" HTTPS="on" NO_FILE_VERSIONS="" NO_FILE_CHECKSUMS="" NO_MINIFIED_FILES=""  HTTP_SERVER_ADDRESS="https://mwcwallet.com" TOR_SERVER_ADDRESS="http://mwcwalletmiq3gdkmfbqlytxunvlxyli4m6zrqozk7xjc353ewqb6bad.onion" php "./mwcwallet.com-master/public_html/scripts/output_worker.js" > "./temp/scripts/output_worker.js"
SERVER_NAME="mwcwallet.com" HTTPS="on" NO_FILE_VERSIONS="" NO_FILE_CHECKSUMS="" NO_MINIFIED_FILES=""  HTTP_SERVER_ADDRESS="https://mwcwallet.com" TOR_SERVER_ADDRESS="http://mwcwalletmiq3gdkmfbqlytxunvlxyli4m6zrqozk7xjc353ewqb6bad.onion" php "./mwcwallet.com-master/public_html/scripts/slate_worker.js" > "./temp/scripts/slate_worker.js"

# Copy third-party library instructions for reviewer
cp "./mwcwallet.com-master/third-party libraries instructions.txt" "./temp/README.txt"

# Prepare extension
rm -rf "./MWC Wallet Extension/Resources"
mv "./temp" "./MWC Wallet Extension/Resources"
sed -i "s/MARKETING_VERSION = .*/MARKETING_VERSION = $VERSION;/" "./MWC Wallet Extension.xcodeproj/project.pbxproj"
echo "Use Xcode to compile 'MWC Wallet Extension.xcodeproj' into an app named 'MWC Wallet Safari Extension Installer v$VERSION'"

# Cleanup
rm -rf "./master.zip" "./mwcwallet.com-master" "./messages.json"
