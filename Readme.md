
Project implemenmted from:
https://subhrapaladhi.medium.com/using-redis-with-nodejs-and-mongodb-28e5a39a2696


# Node-Redis-Mongo app backend only
This is a node js app for demonstrating how to use redis as cache with node js and mongodb

# Requirements
- node
- redis cache
- mongoDB ( cloud)

# Installation
```
npm install
```

# Running
In first terminal > Note u have to install redic server on local machine, 
I have used windows, follow instructions from https://redis.com/blog/redis-on-windows-10/ 
```
Start redis on Windows Subsystem for Linux installed above...(UBUNTU)
 
 
```
Start the app: 
npm start
``` 
PORT= 3000


#APIS:
POST / create data 
http://localhost:3000/gs
{
    "serialno":3,
    "gsType":"fruits",
    "name":"Apple"
}

{
    "serialno":3,
    "gsType":"veggies",
    "name":"Spinach"
}

get all data 
http://localhost:3000/

#get specific data: based on type or ID
http://localhost:3000/Liquid/   > Trigger URL for the first time, Data will be fetched from DB, second time on same request
 data will be fetched from redis cache 
 
http://localhost:3000/Liquid/123

