TIME="10"
TELEGRAM_USER_ID="-577214160"
TELEGRAM_BOT_TOKEN="1854162816:AAGK8zhHx07rnEuQwklRuQkMp6bhPiSvMms"
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
URL="https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/sendMessage"

TEXT="Deploy status App : $1%0A%0A$echo($GITHUB_WORKFLOW)  %0AURL= $(echo $GITHUB_SERVER_URL/$GITHUB_REPOSITORY/actions/runs/$GITHUB_RUN_ID) %0Aactor= $(echo $GITHUB_ACTOR)"

curl -s --max-time $TIME -d "chat_id=$TELEGRAM_USER_ID&disable_web_page_preview=1&text=$TEXT" $URL > /dev/null