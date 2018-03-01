# Survival of The Fastest - Client

[A fast paced multiplayer action game.](http://orange-dev.duckdns.org)

## Information
This game is split up into two parts:
* [Leaderboard repo](https://github.com/Svahnen/Orange-Game-Development)
* [Mobile client repo](https://github.com/Svahnen/Orange-Game-Development-App)

## Getting Started

To be able to work towards different branches on this repository and push to the live server, follow this guide;

##### Orange git setup:
```
git clone https://github.com/Svahnen/Orange-Game-Development-App
cd Orange-Game-Development-App
git remote add live ssh://root@orange-dev.duckdns.org/root/repo/app.git
```
##### To push to live master:
```
git add .
git commit -m ”Commit message”
git push live master
Password: *******
```

##### To pull from the live server:

```
git pull live master
Password: *******
```
*Note: Only push to live master when pushing to regular master.*

##### To start your own developer server:
*Note: You first need to have your own mySQL server.*

###### Rest API:
```
cd node
npm install
npm install -g nodemon
nodemon
```

###### Host HTTPS server for the client:
```
cd html
npm install -g http-server
http-server -S -C ../cert/cert.pem -K ../cert/key.pem
```

#### Tools used and how to install them

```
apm install atom-beautify
npm install standard --global
apm install linter-htmlhint
apm install linter-csslint
apm install linter-js-standard
```

## Built With

* [Bootstrap](https://getbootstrap.com/) - The web framework used
* [NodeJS](https://nodejs.org/en/) - Rest API
* [Google API](https://developers.google.com/maps/) - Google Maps API


## Versioning

* [GitHub](https://github.com)

## Authors

* [Alexandra Sigurdardottir](https://github.com/Alexosk)
* [Andreas Fält](https://github.com/falt)
* [Jonny Svahn](https://github.com/Svahnen)
* [Magnus Wallin](https://github.com/mangster80)
* [Miranda Mutka](https://github.com/mirandamutka)

## License

To be added.
