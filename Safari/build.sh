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

# Create locales
mkdir "./temp/_locales"
for FILE in ./temp/languages/*.php; do
	LANGUAGE=$(grep -Po '(?<=\$availableLanguages\[")[^"]+(?="\])' $FILE)
	EXTENSION_LOCALE_CODE=$(grep -Po '(?<="Extension Locale Code" => ")[^"]+(?=")' $FILE | sed -e 's/-/_/g')
	if [[ -n $EXTENSION_LOCALE_CODE ]]; then
		mkdir "./temp/_locales/$EXTENSION_LOCALE_CODE"
		HTTP_ACCEPT_LANGUAGE="$LANGUAGE" php "../common/messages.json" > "./temp/_locales/$EXTENSION_LOCALE_CODE/messages.json"
	fi
done
for FILE in ./temp/languages/*.php; do
	LANGUAGE=$(grep -Po '(?<=\$availableLanguages\[")[^"]+(?="\])' $FILE)
	LANGUAGE_IDENTIFIER=$(grep -Po '(?<=\$availableLanguages\[")[^"]+(?="\])' $FILE | sed -e 's/-/_/g')
	rm -rf "./temp/_locales/$LANGUAGE_IDENTIFIER"
	mkdir "./temp/_locales/$LANGUAGE_IDENTIFIER"
	HTTP_ACCEPT_LANGUAGE="$LANGUAGE" php "../common/messages.json" > "./temp/_locales/$LANGUAGE_IDENTIFIER/messages.json"
done

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
SERVER_NAME="mwcwallet.com" HTTPS="on" NO_FILE_VERSIONS="" NO_FILE_CHECKSUMS="" NO_MINIFIED_FILES="" HTTPS_SERVER_ADDRESS="https://mwcwallet.com" TOR_SERVER_ADDRESS="http://mwcwalletmiq3gdkmfbqlytxunvlxyli4m6zrqozk7xjc353ewqb6bad.onion" php "./manifest.json" > "./temp/manifest.json"

# Compile index.html
SERVER_NAME="mwcwallet.com" HTTPS="on" NO_FILE_VERSIONS="" NO_FILE_CHECKSUMS="" NO_MINIFIED_FILES="" HTTPS_SERVER_ADDRESS="https://mwcwallet.com" TOR_SERVER_ADDRESS="http://mwcwalletmiq3gdkmfbqlytxunvlxyli4m6zrqozk7xjc353ewqb6bad.onion" php "./mwcwallet.com-master/public_html/index.html" > "./temp/index.html"
sed -i "s/rel=\"preload\"/rel=\"prefetch\"/" "./temp/index.html"
sed -i "/<link .* rel=\"manifest\".*>/d" "./temp/index.html"
sed -i "/<meta name=\"msapplication-config\".*>/d" "./temp/index.html"
sed -i "/<meta name=\"msapplication-starturl\".*>/d" "./temp/index.html"
sed -i "/<link rel=\"alternate\".*>/d" "./temp/index.html"
sed -i "/<link rel=\"canonical\".*>/d" "./temp/index.html"

# Move scripts from index.html to index.js
sed -i "s/ onerror=\"[^\"]*\"//" "./temp/index.html"
sed -i "s/ onload=\"[^\"]*\"//" "./temp/index.html"
grep -Pzo "(?s)(?<=<script>).*?(?=</script>)" "./temp/index.html" > "./temp/index.js"
sed -i "s/\x00//" "./temp/index.js"
sed -i "/<script>/,/<\/script>/d" "./temp/index.html"
sed -i "0,/--><script/s//--><script src=\".\/index.js\" type=\"application\/javascript\" charset=\"UTF-8\"><\/script><!--\n\t--><script/" "./temp/index.html"

# Compile styles
SERVER_NAME="mwcwallet.com" HTTPS="on" NO_FILE_VERSIONS="" NO_FILE_CHECKSUMS="" NO_MINIFIED_FILES="" HTTPS_SERVER_ADDRESS="https://mwcwallet.com" TOR_SERVER_ADDRESS="http://mwcwalletmiq3gdkmfbqlytxunvlxyli4m6zrqozk7xjc353ewqb6bad.onion" php "./mwcwallet.com-master/public_html/fonts/btc/btc.css" > "./temp/fonts/btc/btc.css"
SERVER_NAME="mwcwallet.com" HTTPS="on" NO_FILE_VERSIONS="" NO_FILE_CHECKSUMS="" NO_MINIFIED_FILES="" HTTPS_SERVER_ADDRESS="https://mwcwallet.com" TOR_SERVER_ADDRESS="http://mwcwalletmiq3gdkmfbqlytxunvlxyli4m6zrqozk7xjc353ewqb6bad.onion" php "./mwcwallet.com-master/public_html/fonts/eth/eth.css" > "./temp/fonts/eth/eth.css"
SERVER_NAME="mwcwallet.com" HTTPS="on" NO_FILE_VERSIONS="" NO_FILE_CHECKSUMS="" NO_MINIFIED_FILES="" HTTPS_SERVER_ADDRESS="https://mwcwallet.com" TOR_SERVER_ADDRESS="http://mwcwalletmiq3gdkmfbqlytxunvlxyli4m6zrqozk7xjc353ewqb6bad.onion" php "./mwcwallet.com-master/public_html/fonts/font_awesome/font_awesome.css" > "./temp/fonts/font_awesome/font_awesome.css"
SERVER_NAME="mwcwallet.com" HTTPS="on" NO_FILE_VERSIONS="" NO_FILE_CHECKSUMS="" NO_MINIFIED_FILES="" HTTPS_SERVER_ADDRESS="https://mwcwallet.com" TOR_SERVER_ADDRESS="http://mwcwalletmiq3gdkmfbqlytxunvlxyli4m6zrqozk7xjc353ewqb6bad.onion" php "./mwcwallet.com-master/public_html/fonts/grin/grin.css" > "./temp/fonts/grin/grin.css"
SERVER_NAME="mwcwallet.com" HTTPS="on" NO_FILE_VERSIONS="" NO_FILE_CHECKSUMS="" NO_MINIFIED_FILES="" HTTPS_SERVER_ADDRESS="https://mwcwallet.com" TOR_SERVER_ADDRESS="http://mwcwalletmiq3gdkmfbqlytxunvlxyli4m6zrqozk7xjc353ewqb6bad.onion" php "./mwcwallet.com-master/public_html/fonts/epic/epic.css" > "./temp/fonts/epic/epic.css"
SERVER_NAME="mwcwallet.com" HTTPS="on" NO_FILE_VERSIONS="" NO_FILE_CHECKSUMS="" NO_MINIFIED_FILES="" HTTPS_SERVER_ADDRESS="https://mwcwallet.com" TOR_SERVER_ADDRESS="http://mwcwalletmiq3gdkmfbqlytxunvlxyli4m6zrqozk7xjc353ewqb6bad.onion" php "./mwcwallet.com-master/public_html/fonts/mwc/mwc.css" > "./temp/fonts/mwc/mwc.css"
SERVER_NAME="mwcwallet.com" HTTPS="on" NO_FILE_VERSIONS="" NO_FILE_CHECKSUMS="" NO_MINIFIED_FILES="" HTTPS_SERVER_ADDRESS="https://mwcwallet.com" TOR_SERVER_ADDRESS="http://mwcwalletmiq3gdkmfbqlytxunvlxyli4m6zrqozk7xjc353ewqb6bad.onion" php "./mwcwallet.com-master/public_html/fonts/open_sans/open_sans.css" > "./temp/fonts/open_sans/open_sans.css"
SERVER_NAME="mwcwallet.com" HTTPS="on" NO_FILE_VERSIONS="" NO_FILE_CHECKSUMS="" NO_MINIFIED_FILES="" HTTPS_SERVER_ADDRESS="https://mwcwallet.com" TOR_SERVER_ADDRESS="http://mwcwalletmiq3gdkmfbqlytxunvlxyli4m6zrqozk7xjc353ewqb6bad.onion" php "./mwcwallet.com-master/public_html/styles/section.css" > "./temp/styles/section.css"
SERVER_NAME="mwcwallet.com" HTTPS="on" NO_FILE_VERSIONS="" NO_FILE_CHECKSUMS="" NO_MINIFIED_FILES="" HTTPS_SERVER_ADDRESS="https://mwcwallet.com" TOR_SERVER_ADDRESS="http://mwcwalletmiq3gdkmfbqlytxunvlxyli4m6zrqozk7xjc353ewqb6bad.onion" php "./mwcwallet.com-master/public_html/styles/unlocked.css" > "./temp/styles/unlocked.css"

# Compile scripts
SERVER_NAME="mwcwallet.com" HTTPS="on" NO_FILE_VERSIONS="" NO_FILE_CHECKSUMS="" NO_MINIFIED_FILES="" HTTPS_SERVER_ADDRESS="https://mwcwallet.com" TOR_SERVER_ADDRESS="http://mwcwalletmiq3gdkmfbqlytxunvlxyli4m6zrqozk7xjc353ewqb6bad.onion" php "./mwcwallet.com-master/public_html/scripts/camera_worker.js" > "./temp/scripts/camera_worker.js"
SERVER_NAME="mwcwallet.com" HTTPS="on" NO_FILE_VERSIONS="" NO_FILE_CHECKSUMS="" NO_MINIFIED_FILES="" HTTPS_SERVER_ADDRESS="https://mwcwallet.com" TOR_SERVER_ADDRESS="http://mwcwalletmiq3gdkmfbqlytxunvlxyli4m6zrqozk7xjc353ewqb6bad.onion" php "./mwcwallet.com-master/public_html/scripts/output_worker.js" > "./temp/scripts/output_worker.js"
SERVER_NAME="mwcwallet.com" HTTPS="on" NO_FILE_VERSIONS="" NO_FILE_CHECKSUMS="" NO_MINIFIED_FILES="" HTTPS_SERVER_ADDRESS="https://mwcwallet.com" TOR_SERVER_ADDRESS="http://mwcwalletmiq3gdkmfbqlytxunvlxyli4m6zrqozk7xjc353ewqb6bad.onion" php "./mwcwallet.com-master/public_html/scripts/slate_worker.js" > "./temp/scripts/slate_worker.js"
SERVER_NAME="mwcwallet.com" HTTPS="on" NO_FILE_VERSIONS="" NO_FILE_CHECKSUMS="" NO_MINIFIED_FILES="" HTTPS_SERVER_ADDRESS="https://mwcwallet.com" TOR_SERVER_ADDRESS="http://mwcwalletmiq3gdkmfbqlytxunvlxyli4m6zrqozk7xjc353ewqb6bad.onion" php "./mwcwallet.com-master/public_html/scripts/languages.js" > "./temp/scripts/languages.js"

# Copy third-party library instructions for reviewer
cp "./mwcwallet.com-master/third-party libraries instructions.txt" "./temp/README.txt"

# Prepare extension
rm -rf "./MWC Wallet Browser Extension/Resources"
mv "./temp" "./MWC Wallet Browser Extension/Resources"
sed -i "s/MARKETING_VERSION = .*/MARKETING_VERSION = $VERSION;/" "./MWC Wallet Browser Extension.xcodeproj/project.pbxproj"
echo "Use Xcode to compile 'MWC Wallet Browser Extension.xcodeproj' into an app named 'MWC Wallet Safari Extension Installer v$VERSION'"

# Cleanup
rm -rf "./master.zip" "./mwcwallet.com-master" "./messages.json"
