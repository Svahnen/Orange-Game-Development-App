# Orange-Game-Development-App
This repo is for the mobile app

Repo Guides:

Webbsida för Leaderboard  http://orange-dev.duckdns.org/

För att få detta att fungera så ni kan jobba mot olika branches på våran git repo samt pusha till live repon, så följer ni denna guide.

Orange git setup:
git clone https://github.com/Svahnen/Orange-Game-Development
cd Orange-Game-Development
git remote add live ssh://root@orange-dev.duckdns.org/root/repo/site.git

För att pusha till Live servern:
git add .
git commit -m ”Commit message”
git push live master <br>
Lösenord: *******

För att hämta från Live servern:
git pull live master <br>
Lösenord: *******

PS: ni kan jobba helt som vanligt mot den vanliga git repon och bara pusha till ”live” när vi har uppdaterat våran egen master.





Webbsida för Mobile App  http://orange-dev.duckdns.org:8081

För att få detta att fungera så ni kan jobba mot olika branches på våran git repo samt pusha till live repon, så följer ni denna guide.

Orange git setup:
git clone https://github.com/Svahnen/Orange-Game-Development-App
cd Orange-Game-Development-App
git remote add live ssh://root@orange-dev.duckdns.org/root/repo/app.git

För att pusha till Live servern:
git add .
git commit -m ”Commit message”
git push live master <br>
Lösenord: *******

För att hämta från Live servern:
git pull live master <br>
Lösenord: *******

PS: ni kan jobba helt som vanligt mot den vanliga git repon och bara pusha till ”live” när vi har uppdaterat våran egen master.
