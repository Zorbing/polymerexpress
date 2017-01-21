/*
 * Copyright 2017 Max Bachmann
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */


"use strict";

let express = require("express");
let router = express.Router();
let db = require('../database/connector');
let conn = db.connection;
let errorHandler = require('../database/error_handler');

/**
 * Responds with an error message to a request.
 * @param res Express.js response object.
 * @param message Error message.
 */
let respondWithError = function (res, message) {
    res.status(400)
        .send(message);
};

/**
 * Responds with '200 OK' and a status message to a request.
 * @param res Express.js response object.
 * @param detail Optional status details object.
 */
let respondWithOk = function (res, detail) {
    if (typeof detail === "undefined") {
        detail = null;
    }

    let message = {
        status: "OK",
        detail: detail
    };

    res.send(JSON.stringify(message));
};

/**
 * Fetches a list of all categories from the database.
 */
router.get("/", function (req, res) {
    // List all records in db
    let query = 'SELECT * FROM `' + db.categoryTable + '`';

    let handler = function (error, results, fields) {
        if (error) {
            errorHandler.handleDatabaseError(error, res);
        } else {
            res.send(JSON.stringify(results));
        }
    };

    conn.query(query, handler);
});

/**
 * Fetches one category identified by an id from the database.
 */
router.get("/:id", function (req, res) {
    // Fetch record from db
    let query = 'SELECT * FROM `' + db.categoryTable + '` WHERE id=' + conn.escape(Number(req.params.id)) + ' LIMIT 1';

    let handler = function (error, results, fields) {
        if (error) {
            errorHandler.handleDatabaseError(error, res);
        } else {
            if (results.length < 1) {
                res.send(JSON.stringify(null));
            } else {
                res.send(JSON.stringify(results[0]));
            }
        }
    };

    conn.query(query, handler);
});

/**
 * Removes one category identified by an id from the database.
 */
router.delete("/:id", function (req, res) {
    // Delete record from db
    let query = 'DELETE FROM ' + db.categoryTable + ' WHERE id=' + conn.escape(Number(req.params.id)) + ' LIMIT 1';

    let handler = function (error, results, fields) {
        if (error) {
            errorHandler.handleDatabaseError(error, res);
        } else {
            let details = {
                deleted: results.affectedRows
            };
            respondWithOk(res, details);
        }
    };

    conn.query(query, handler);
});

/**
 * Persists one category in the database and sends back the id.
 */
router.post("/", function (req, res) {
    // Assert MIME type
    if (!req.is('application/json')) {
        respondWithError(res, "Wrong MIME. Requests have to use 'application/json'");
        return;
    }

    // Parse request body
    let body = "";
    try {
        body = JSON.parse(req.body);
    } catch (error) {
        respondWithError(res, "Invalid JSON.");
        return;
    }

    // Assert parameters
    if (!body.hasOwnProperty('name') || body.name === '') {
        respondWithError(res, "Invalid name.");
        return;
    }
    if (!body.hasOwnProperty('color') || body.color === '') {
        respondWithError(res, "Invalid color.");
        return;
    }

    // Insert into db
    let query = 'INSERT INTO ' + db.categoryTable + ' (name, color) VALUES (';
    query += conn.escape(body.name) + ',';
    query += conn.escape(body.color);
    query += ')';

    let handler = function (error, results, fields) {
        if (error) {
            errorHandler.handleDatabaseError(error, res);
        } else {
            let details = {
                saved: results.affectedRows,
                id: results.insertId
            };
            respondWithOk(res, details);
        }
    };

    conn.query(query, handler);
});

/**
 * Changes properties of one category identified by an id in the database.
 */
router.patch("/:id", function (req, res) {
    // Assert MIME type
    if (!req.is('application/json')) {
        respondWithError(res, "Wrong MIME. Requests have to use 'application/json'");
        return;
    }

    // Parse request body
    let body = "";
    try {
        body = JSON.parse(req.body);
    } catch (error) {
        respondWithError(res, "Invalid JSON");
        return;
    }

    // Check what parameters to change
    let change = {
        name: false,
        color: false,
    };
    if (body.hasOwnProperty('name') && body.name !== '') {
        change.name = true;
    }
    if (body.hasOwnProperty('color') && body.color !== '') {
        change.color = true;
    }
    if (!change.name && !change.color) {
        respondWithError(res, "Too few parameters.");
        return;
    }

    // Update record in db
    let query = 'UPDATE ' + db.categoryTable + ' SET ';
    if (change.name) {
        query += 'name = ' + conn.escape(body.name);
    }
    if (change.name && change.color) {
        query += ',';
    }
    if (change.color) {
        query += 'color = ' + conn.escape(body.color);
    }
    query += ' WHERE id=' + conn.escape(Number(req.params.id)) + " LIMIT 1";

    let handler = function (error, results, fields) {
        if (error) {
            errorHandler.handleDatabaseError(error, res);
        } else {
            let details = {
                changed: results.affectedRows
            };
            respondWithOk(res, details);
        }
    };

    conn.query(query, handler);
});

/**
 * Changes one category identified by an id in the database.
 */
router.put("/:id", function (req, res) {
    // Assert MIME type
    if (!req.is('application/json')) {
        respondWithError(res, "Wrong MIME. Requests have to use 'application/json'");
        return;
    }

    // Parse request body
    let body = "";
    try {
        body = JSON.parse(req.body);
    } catch (error) {
        respondWithError(res, "Invalid JSON");
        return;
    }

    // Assert parameters
    if (!body.hasOwnProperty('name') || body.name === '') {
        respondWithError(res, "Invalid name.");
        return;
    }
    if (!body.hasOwnProperty('color') || body.color === '') {
        respondWithError(res, "Invalid color.");
        return;
    }

    // Update record in db
    let query = 'UPDATE ' + db.categoryTable + ' SET ';
    query += 'name = ' + conn.escape(body.name) + ',';
    query += 'color = ' + conn.escape(body.color);
    query += ' WHERE id=' + conn.escape(Number(req.params.id)) + " LIMIT 1";

    let handler = function (error, results, fields) {
        if (error) {
            errorHandler.handleDatabaseError(error, res);
        } else {
            let details = {
                changed: results.affectedRows
            };
            respondWithOk(res, details);
        }
    };

    conn.query(query, handler);
});

module.exports = router;