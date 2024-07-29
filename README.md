Base web-app
==============
## Prerequisites

You’ll need to have node, npm, pm2, concurrently and redis-server installed on your machine.   
- PM2 should be installed globally(npm install -g pm2)   
- redis-server can be installed by: apt-get install redis-server (for linux users)   
- concurrently should be installed globally(npm install -g concurrently)  

 Use npm (version: 5.6.0) and node (version: 8.11.1) for  faster installation speed and better disk usage.You can use nvm to easily switch Node versions between different projects.
 

#### Installing latest version of node

1. Get your nodejs tarball from node site e.g. node-v8.11.1-linux-x64.tar.gz from v8.11.1     
`wget https://nodejs.org/dist/v8.11.1/node-v8.11.1-linux-x64.tar.gz`                   
2. Unpack provided archive files to            
 `mkdir -p /opt/nodejs`        
`tar -xvzf node-v8.11.1-linux-x64.tar.gz -C /opt/nodejs/`  
3. Create link to current node version    
`cd /opt/nodejs`   
`mv node-v8.11.1-linux-x64 8.11.1`  
`ln -s 8.11.1 current`           
4. Create link to current node binary           
`ln -s /opt/nodejs/current/bin/node /bin/node`   
5. Verify Node version     
`node -v`            
    
For more details [click here](https://askubuntu.com/questions/957439/how-to-install-a-specific-version-of-node-on-ubuntu-server)
<br/>

#### Installing latest version of npm
1. Install npm using                                        
`apt-get install npm`              
2. Check for the version of the installed npm            
`npm -v`
3. If the version is less than 5.6.0, then install the version using                                        
`npm install -g npm@5.6.0`             
         
<br/>
   
Note: There are a lot of methods to install node and npm. This is just one way to achieve it. You can use other methods as well  
<br/> 
 
 
## Running the project in development mode

### Install all dependencies

`npm install`

### Running the server

You will need to run 2 different commands in 2 different terminal

- `npm run build-dev` (This will build the project and watch for any changes)

- `npm run start-dev` (This will start the node server - sudo might be required)

The project will rebuild in case of any changes are made and server will automatically restart
<br>
<br/>
<br/>

## Running the project in production mode

### Install all dependencies

`npm install`

### Building the project

Run the following command and wait for it to finish
`npm run build-prod` (This will build the project)

Builds the app for production to the `build` folder.

Here we are not using any server. The project in production mode is fully client side and so, we need to serve the index.html inside the build folder using nginx. <br />
The basic nginx config is:
server {    
   listen 3006;    
   root path of yor repo/build; #the build folder    
   server_name localhost;    
   location / {    
    try_files $uri /index.html;    
   }    
}    
<br/>
Few nginx commands
1. sudo systemctl start nginx
2. sudo systemctl stop nginx
3. sudo systemctl restart nginx
<br/>
<br/>
<br/>

## Redis Setup

We are using redis to cache some pages in production mode.  
Redis is disabled in development mode. However, if one want to enable redis in development mode, follow:  
install redis-server (for ubuntu: sudo apt-get install redis-server)  
Change the `nodeEnv` variable to "development" in src/script/server_script.js  
Update `nodeEnv === "production"` to `nodeEnv === "development"` at line 118 and line 206 in src/script/server_script.js  
<br/>
<br/>
<br/>

## Windows Setup
If you clone and build the repo on Windows System, you'll find following issues. Build Process will get stuck at building the project. To fix this.

Edit following lines in `package.json`

##### Step 1
Change `line 124` in `package.json` to the following
`"start": "npm run sass-compile-mock && npm run sass-compile-components && npm run sass-compile-dumbComponents && npm run dev-server",`

##### Step 2
You need to manually start the watchers in a different terminal.
- For Mock Components `npm run sass-watcher-mock`
- For Dumb Components `npm run sass-watcher-component`
- For Components `npm run sass-watcher-component`


## Facebook Auth

To get facebook auth working you have to launch the app with REACT_APP_FACEBOOK_APP_ID env set to your app id.

## Google Auth

To get google auth working you have to launch the app with REACT_APP_GOOGLE_APP_ID env set to your app id.



### Fixing few common errors while running the project
 
  
In case, the command `npm run ssr` goes into infinite loop, we need to kill the PIDs related to node-sass. The same can be achieved using:  
1. Stop the existing running commands.  
2. Run the following command in the terminal `ps aux | grep "node-sass"`  
3. The result will be of the format:
```
user     6419  1.7  0.2 934116 43320 pts/13   Sl+  11:56   0:56 node-sass
user     6455  0.5  0.2 925196 41340 pts/13   Sl+  11:56   0:17 node-sass
user     6497  0.5  0.2 926024 41944 pts/13   Sl+  11:56   0:17 node-sass
user     6518  0.5  0.2 924684 41236 pts/13   Sl+  11:56   0:18 node-sass
```
4. We need to kill all the node-sass process using the PIDs in column 2. The command will be `kill -9 PIDs` (sudo might be required). here `kill -9 6419 6455 6497 6518  `

If you are getting error : ` The remote end hung up unexpectedly`

run this command: `git config --global http.postBuffer 1048576000`
