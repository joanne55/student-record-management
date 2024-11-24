A university management system for Admin stff, Students and Lecturers to view and update relevant information to them. 

# Project Setup

## Requirements
- Node.js (comes with NPM)

## Run
### Run server application 
```bash
cd ./server
npm install       # install the libraries 
node app.js       # start the server application
```

### Run client application 
```bash
cd ./client
npm install       # install client-side libraries
npm start         # start the client application
```

## Others
### Kill process on port <port_number> 
```bash
netstat -ano | findstr :<port_number>
taskkill /PID <process_id> /F
```



