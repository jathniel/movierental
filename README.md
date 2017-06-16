# movierental
express base movie rental site

# Installation
do npm Install

```
npm install
```

After installation include this to ~/.bash-profile So that we can use commands on the node_module/bin

```
export PATH=$PATH:./node_modules/.bin
```

# Running
First we need to Initialize the data.
to Initialize Make sure that mongodb is Running by running `mongo` on seperate terminal
then run
```
npm run prerun
```
after initializing the database.
```
npm start
```
then Browse
http://localhost:8080
Credentials are in loadTestData.js

# Running
```
npm test
```
