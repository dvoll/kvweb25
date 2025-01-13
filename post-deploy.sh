# WIP: Is not used by the deploy mechanism yet
rm -rf ../httpdocs/wp-content/themes/kvweb25-theme
cp -r ./themes/kvweb25-theme ../httpdocs/wp-content/themes/kvweb25-theme

rm -rf ../httpdocs/wp-content/plugins/kvweb25-blocks
cp -r ./plugins/kvweb25-blocks ../httpdocs/wp-content/plugins/kvweb25-blocks

rm -rf ../httpdocs/wp-content/plugins/kvweb25-mail-config
cp -r ./plugins/kvweb25-mail-config ../httpdocs/wp-content/plugins/kvweb25-mail-config