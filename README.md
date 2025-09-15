# MWC Wallet Browser Extension

### Description
Browser extension version of the MimbleWimble Coin web wallet, [mwcwallet.com](https://mwcwallet.com), for Chrome, Firefox, and Safari.

### Installing
This extension can be installed on Chrome from the [Chrome Web Store](https://chromewebstore.google.com/detail/mwc-wallet/ahhdnimkkpkmclgcnbchlgijhmieongp).

This extension can be installed on Firefox from the [Firefox Add-ons site](https://addons.mozilla.org/en-US/firefox/addon/mwc-wallet/).

This extension can be installed on Safari by downloading it from its [releases](https://github.com/NicolasFlamel1/MWC-Wallet-Browser-Extension/releases), installing it, and enabling Safari to use unsigned extensions.

### Building
Run the following command to install the dependencies required to build this browser extension.
```
sudo apt install php php-intl php-mbstring unzip wget grep sed coreutils zip
```
Then run the following commands to build this browser extension.
```
wget "https://github.com/NicolasFlamel1/MWC-Wallet-Browser-Extension/archive/refs/heads/master.zip"
unzip "./master"
cd "./MWC-Wallet-Browser-Extension-master"
cd "./Chrome" && "./build.sh"
cd "../Firefox" && "./build.sh"
cd "../Safari" && "./build.sh"
```
This will create the Chrome extension, `MWC-Wallet-Browser-Extension-master/MWC Wallet Chrome Extension.zip`, create the Firefox extension, `MWC-Wallet-Browser-Extension-master/MWC Wallet Firefox Extension.xpi`, and prepare the Safari extension to be compiled. You can finish building the Safari extension by using Xcode to compile the `MWC-Wallet-Browser-Extension-master/Safari/MWC Wallet Browser Extension.xcodeproj` project.

### API
This extension injects a `MwcWallet` object into every site which allows those sites to interact with this extension. That object provides the following APIs.
1. `startTransaction(walletType, networkType, recipientAddress, amount = MwcWallet.NO_TRANSACTION_AMOUNT, message = MwcWallet.NO_TRANSACTION_MESSAGE)`: Launches the wallet if it is not already open and prompts the user to approve sending a payment with the provided parameters.

Examples of this extension's APIs are available in [api_example.html](https://github.com/NicolasFlamel1/MWC-Wallet-Browser-Extension/blob/master/api_example.html).
