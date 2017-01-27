# PolymerExpress

## Setup

Install the common prerequisites: [node.js](https://nodejs.org/en/), [npm](https://www.npmjs.com/) and a [MySQL](https://www.mysql.com/) server.

### Frontend

1. Install the frontend's prerequisites (the package manager bower and the polymer build tool).

    ```
    # npm install -g bower polymer-cli
    ```

2. Install all dependencies of the frontend.

    ```
    $ npm install
    ```
    ```
    $ bower install
    ```

3. Build the frontend

    ```
    $ polymer build
    ```

    This will create a `build/` folder with `bundled/` and `unbundled/` sub-folders containing a bundled (Vulcanized) and unbundled builds, both run through HTML, CSS, and JS optimizers.

4. Create the folder `static` in `backend` and copy the build files into that folder (or just create a symlink).

    ```
    $ mkdir -p backend/static
    $ cp -r build/bundled/* backend/static/
    ```
    or
    ```
    $ ln -s $(pwd)/build/bundled backend/static
    ```

### Backend

1. Navigate to the `backend` directory.
    ```
    $ cd backend
    ```

2. Run `npm install` while in `/backend` to install the backend's dependencies.
    ```
    backend $ npm install
    ```

3. Use `setup/tables.sql` to build the database structure in your MySQL server, for example with:
    ```
    backend $ mysql -u root -p < setup/tables.sql
    ```

4. Create a MySQL user with access to the previously created tables and configure the credentials in `database/connector.js` using your favorite text editor (which, of course, is vim).

## Usage 
### Start
Start the backend by running `node` on `index.js` inside the `backend` directory.
```
$ node backend/index.js
```
This will both serve the frontend and the REST API.
You should now be able to use the contacts app by navigating to `http://localhost:3000/` (replace the default port if you configured one).

### Stop
Interrupt the process, for example by pressing Ctrl+C on Linux.

### Configuration (Optional)
#### Port
By default, the backend runs on port `3000`. You can configure it to run on another port by changing the `port` variable at the top of `backend/index.js`.

#### Database connection
The database connection can be configured in `backend/database/connector.js`.
