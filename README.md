# mongoFiles

Requirements
---
1. Node.js >= 8.9.1
2. Mongodb >= 3.6.3



Overview
---
A web application developed with express.js, mongodb and react which uses GFS( or GridFS ) to load files in database.


GFS ( or GridFS) is a specification for storing and retrieving files.
Instead of storing a file in a single document, GridFS divides the file into parts, or chunks, and stores each chunk as a separate document.  By default, GridFS uses a default chunk size of 255 kB; that is, GridFS divides a file into chunks of 255 kB with the exception of the last chunk. T
GridFS uses two collections to store files. One collection stores the file chunks, and the other stores file metadata. 
While querying for a file,  the driver will reassemble the chunks as needed.

GridFS is useful for storing any files without having to load the entire file into memory.


Run a local demo
---

#### Build React components
cd UI-components

npm install

npm run build

#### Start the server
cd ..

cd lib

npm install

npm start

#### Render
http://localhost:3002

