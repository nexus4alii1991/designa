#! /bin/sh
mkdir -p pub/static/frontend/Silk/designa/en_US/css/bootstrap/

# copy
cp -Rf app/design/frontend/Silk/designa/assets/css/*.css pub/static/frontend/Silk/designa/en_US/css/

cp -Rf app/design/frontend/Silk/designa/assets/css/bootstrap/*.css pub/static/frontend/Silk/designa/en_US/css/bootstrap/

cp -Rf app/design/frontend/Silk/designa/assets/Magento_Theme/js/*.js pub/static/frontend/Silk/designa/en_US/Magento_Theme/js/
