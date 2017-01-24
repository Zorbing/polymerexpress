# Installation

1. Install [node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/).
2. Navigate to the `/backend` directory.
3. Run `npm install` while in `/backend` to install the dependencies.
4. Install [MySQL](https://www.mysql.com/).
5. Use `setup/tables.sql` to build the database structure in your MySQL server.
6. Create a MySQL user with access to the previously created tables and configure the credentials in `database/connector.js`.

# Usage 
## Start
Start the backend by running `node index.js` while in the `/backend` directory.

## Stop
Interrupt the process, for example by pressing Ctrl+C on Linux.

## Configuration (Optional)
### Port
By default, the backend runs on port `3000`. You can configure it to run on another port by changing the `port` variable at the top of `index.js`.

### Database connection
The database connection can be configured in `database/connector.js`.
