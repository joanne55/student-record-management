# Requirements
Node.js (comes with NPM)

# Run
$ cd ./server
$ npm install       // install the libraries 
$ node app.js       // start the server application

$ cd ../client
$ npm install       
$ npm start         // start the client application

# Kill process on port <port_number> 
$ netstat -ano | findstr :<port_number>
$ taskkill /PID <process_id> /F
