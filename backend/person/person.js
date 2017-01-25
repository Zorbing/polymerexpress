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
 * Fetches a list of all persons from the database.
 */
router.get("/", function (req, res) {
    let personList = [];
    let addressMap = new Map();
    let emailMap = new Map();
    let phoneMap = new Map();
    let numFetched = 0;

    let collector = function() {
        numFetched++;

        if (numFetched === 4) {
            let returnList = [];

            for (let pRecord of personList) {
                // Basic information
                let person = {
                    id: pRecord.id,
                    name: pRecord.name,
                    dateOfBirth: pRecord.dateOfBirth,
                    company: {
                        id: pRecord.companyId,
                        name: pRecord.companyName
                    },
                    category: {
                        id: pRecord.categoryId,
                        color: pRecord.categoryColor
                    }
                };

                // Addresses
                person.addresses = addressMap.has(pRecord.id) ? addressMap.get(pRecord.id) : [];

                // Phones
                person.phoneNumbers = phoneMap.has(pRecord.id) ? phoneMap.get(pRecord.id) : [];

                // Email Addresses
                person.emailAddresses = emailMap.has(pRecord.id) ? emailMap.get(pRecord.id) : [];

                returnList.push(person);
            }

            res.send(JSON.stringify(returnList));
        }
    };

    // Person info

    let pQuery = "SELECT ";
    pQuery += db.personTable + ".id";
    pQuery += ", " + db.personTable + ".name";
    pQuery += ", " + db.personTable + ".date_of_birth AS dateOfBirth";
    pQuery += ", " + db.companyTable + ".id AS companyId";
    pQuery += ", " + db.companyTable + ".name AS companyName";
    pQuery += ", " + db.categoryTable + ".id AS categoryId";
    pQuery += ", " + db.categoryTable + ".name AS categoryName";
    pQuery += ", " + db.categoryTable + ".color AS categoryColor";
    pQuery += " FROM " + db.personTable;
    pQuery += " INNER JOIN " + db.companyTable + " ON " + db.personTable + ".company_id = " + db.companyTable + ".id";
    pQuery += " INNER JOIN " + db.categoryTable + " ON " + db.personTable + ".category_id = " + db.categoryTable + ".id";

    let pHandler = function (error, results) {
        if (error) {
            errorHandler.handleDatabaseError(error, res);
        } else {
            personList = results;
            collector();
        }
    };

    conn.query(pQuery, pHandler);

    // Address info
    let aQuery = "SELECT * FROM " + db.addressTable;

    let aHandler = function (error, results) {
        if (error) {
            errorHandler.handleDatabaseError(error, res);
        } else {
            // Group the addresses by person
            results.forEach(function (result) {
                let address = {
                    id: result.id,
                    address: result.address
                };
                if (!addressMap.has(result.person_id)) {
                    // Initialize address list for this person
                    addressMap.set(result.person_id, [address]);
                } else {
                    // Add to existing list for this person
                    let addressList = addressMap.get(result.person_id);
                    addressList.push(address);
                }
            });

            collector();
        }
    };

    conn.query(aQuery, aHandler);

    // Phone numbers
    let phQuery = "SELECT * FROM " + db.phoneTable;

    let phHandler = function (error, results) {
        if (error) {
            errorHandler.handleDatabaseError(error, res);
        } else {
            // Group the phone numbers by person
            results.forEach(function (result) {
                let phone = {
                    id: result.id,
                    type: result.type,
                    number: result.number
                };

                if (!phoneMap.has(result.person_id)) {
                    // Initialize phone number list for this person
                    phoneMap.set(result.person_id, [phone]);
                } else {
                    // Add to existing list for this person
                    let phoneList = phoneMap.get(result.person_id);
                    phoneList.push(phone);
                }
            });

            collector();
        }
    };

    conn.query(phQuery, phHandler);

    // Email Addresses
    let eQuery = "SELECT * FROM " + db.emailTable;

    let eHandler = function (error, results) {
        if (error) {
            errorHandler.handleDatabaseError(error, res);
        } else {
            // Group the email addresses by person
            results.forEach(function (result) {
                let email = {
                    id: result.id,
                    type: result.type,
                    address: result.address
                };

                if (!emailMap.has(result.person_id)) {
                    // Initialize email address list for this person
                    emailMap.set(result.person_id, [email]);
                } else {
                    // Add to existing list for this person
                    let emailList = emailMap.get(result.person_id);
                    emailList.push(email);
                }
            });

            collector();
        }
    };

    conn.query(eQuery, eHandler);
});

/**
 * Fetches one person identified by an id from the database.
 */
router.get("/:id", function (req, res) {
    let personRecord = null;
    let addressRecord = null;
    let phoneRecord = null;
    let emailRecord = null;
    let numFetched = 0;

    let collector = function() {
        numFetched++;

        if (numFetched === 4) {
            // Check if we have found anything
            if (personRecord.length < 1) {
                res.send(JSON.stringify(null));
                return;
            }

            // Build return object
            let person = {
                id: personRecord[0].id,
                name: personRecord[0].name,
                dateOfBirth: personRecord[0].dateOfBirth,
                company: {
                    id: personRecord[0].companyId,
                    name: personRecord[0].companyName
                },
                category: {
                    id: personRecord[0].categoryId,
                    color: personRecord[0].categoryColor
                },
                addresses: addressRecord,
                phoneNumbers: phoneRecord,
                emailAddresses: emailRecord
            };

            res.send(JSON.stringify(person));
        }
    };

    // Person info
    let pQuery = "SELECT ";
    pQuery += db.personTable + ".id";
    pQuery += ", " + db.personTable + ".name";
    pQuery += ", " + db.personTable + ".date_of_birth AS dateOfBirth";
    pQuery += ", " + db.companyTable + ".id AS companyId";
    pQuery += ", " + db.companyTable + ".name AS companyName";
    pQuery += ", " + db.categoryTable + ".id AS categoryId";
    pQuery += ", " + db.categoryTable + ".name AS categoryName";
    pQuery += ", " + db.categoryTable + ".color AS categoryColor";
    pQuery += " FROM " + db.personTable;
    pQuery += " INNER JOIN " + db.companyTable + " ON " + db.personTable + ".company_id = " + db.companyTable + ".id";
    pQuery += " AND " + db.personTable + ".id = " + conn.escape(req.params.id);
    pQuery += " INNER JOIN " + db.categoryTable + " ON " + db.personTable + ".category_id = " + db.categoryTable + ".id";

    let pHandler = function (error, results) {
        if (error) {
            errorHandler.handleDatabaseError(error, res);
        } else {
            personRecord = results;
            collector();
        }
    };

    conn.query(pQuery, pHandler);

    // Address info
    let aQuery = "SELECT id, address FROM " + db.addressTable + " WHERE person_id = " + conn.escape(req.params.id);

    let aHandler = function (error, results) {
        if (error) {
            errorHandler.handleDatabaseError(error, res);
        } else {
            addressRecord = results;
            collector();
        }
    };

    conn.query(aQuery, aHandler);

    // Phone numbers
    let phQuery = "SELECT id, type, number FROM " + db.phoneTable + " WHERE person_id = " + conn.escape(req.params.id);

    let phHandler = function (error, results) {
        if (error) {
            errorHandler.handleDatabaseError(error, res);
        } else {
            phoneRecord = results;
            collector();
        }
    };

    conn.query(phQuery, phHandler);

    // Email Addresses
    let eQuery = "SELECT id, type, address FROM " + db.emailTable + " WHERE person_id = " + conn.escape(req.params.id);

    let eHandler = function (error, results) {
        if (error) {
            errorHandler.handleDatabaseError(error, res);
        } else {
            emailRecord = results;
            collector();
        }
    };

    conn.query(eQuery, eHandler);
});

/**
 * Removes one person identified by an id from the database.
 */
router.delete("/:id", function (req, res) {
    // Delete record from db
    let query = 'DELETE FROM ' + db.personTable + ' WHERE id=' + conn.escape(Number(req.params.id));

    let handler = function (error, results) {
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
 * Persists one person in the database and sends back the id.
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
    if (!body.hasOwnProperty('dateOfBirth') || body.dateOfBirth === '') {
        respondWithError(res, "Invalid date of birth.");
        return;
    }
    if (!body.hasOwnProperty('category') || !body.category.hasOwnProperty('id') || Number.isNaN(body.category.id)) {
        respondWithError(res, "Invalid category.");
        return;
    }
    if (!body.hasOwnProperty('company')) {
        respondWithError(res, "Invalid company.");
        return;
    }

    /*
     * Insert into db
     */
    let requestCounter = 1;
    if (body.hasOwnProperty('addresses') && Array.isArray(body.addresses)) {
        requestCounter += body.addresses.length;
    }
    if (body.hasOwnProperty('phoneNumbers') && Array.isArray(body.phoneNumbers)) {
        requestCounter += body.phoneNumbers.length;
    }
    if (body.hasOwnProperty('emailAddresses') && Array.isArray(body.emailAddresses)) {
        requestCounter += body.emailAddresses.length;
    }
    let transactionCounter = 0;
    let savedPersonId = -1;
    let collector = function() {
        transactionCounter++;
        if (transactionCounter !== requestCounter) {
            return;
        }

        // Respond with the new person's id
        let details = {
            id: savedPersonId
        };
        respondWithOk(res, details);
    };

    let afterPerson = function(personId) {
        savedPersonId = personId;
        let transactionError = false;

        let handler = function (error) {
            if (error) {
                if (!transactionError) {
                    respondWithError(res, error);
                    transactionError = true;
                }
            } else {
                collector();
            }
        };

        // Addresses
        if (body.hasOwnProperty('addresses') && Array.isArray(body.addresses)) {
            for (let address of body.addresses) {
                if (transactionError) {
                    return;
                }
                if (!address.hasOwnProperty('address')) {
                    collector();
                    continue; // Skip faulty addresses
                }
                let aQuery = 'INSERT INTO ' + db.addressTable + ' SET';
                aQuery += ' address = ' + conn.escape(address.address);
                aQuery += ', person_id = ' + conn.escape(personId);
                conn.query(aQuery, handler);
            }
        }

        // Phone numbers
        if (body.hasOwnProperty('phoneNumbers') && Array.isArray(body.phoneNumbers)) {
            for (let phone of body.phoneNumbers) {
                if (transactionError) {
                    return;
                }
                if (!phone.hasOwnProperty('number')) {
                    collector();
                    continue; // Skip faulty phone numbers
                }
                let phQuery = 'INSERT INTO ' + db.phoneTable + ' SET';
                phQuery += ' number = ' + conn.escape(phone.number);
                phQuery += ', type = '  + (phone.hasOwnProperty('type') ? conn.escape(phone.type) : '""');
                phQuery += ', person_id = ' + conn.escape(personId);
                conn.query(phQuery, handler);
            }
        }

        // Email addresses
        if (body.hasOwnProperty('emailAddresses') && Array.isArray(body.emailAddresses)) {
            for (let email of body.emailAddresses) {
                if (transactionError) {
                    return;
                }
                if (!email.hasOwnProperty('address')) {
                    collector();
                    continue; // Skip faulty addresses
                }
                let phQuery = 'INSERT INTO ' + db.emailTable + ' SET';
                phQuery += ' address = '  + conn.escape(email.address);
                phQuery += ', type = '  + (email.hasOwnProperty('type') ? conn.escape(email.type) : '""');
                phQuery += ', person_id = ' + conn.escape(personId);
                conn.query(phQuery, handler);
            }
        }

        collector();
    };

    let afterCompany = function(companyId) {
        // Store person in db
        let pQuery = 'INSERT INTO ' + db.personTable + ' SET';
        pQuery += ' name = ' + conn.escape(body.name);
        pQuery += ', category_id = ' + conn.escape(Number(body.category.id));
        pQuery += ', company_id = ' + conn.escape(companyId);
        pQuery += ', date_of_birth = ' + (body.hasOwnProperty('dateOfBirth') ? conn.escape(body.dateOfBirth) : '""');

        conn.query(pQuery, function(error, results) {
            if (error) {
                respondWithError(res, error);
            } else {
                afterPerson(results.insertId);
            }
        });
    };

    // Company
    if (body.company.hasOwnProperty('id') && !Number.isNaN(body.company.id)) {
        afterCompany(body.company.id);
    } else if (body.company.hasOwnProperty('name') && body.company.name !== '') {
        // Store company in db
        let cQuery = 'INSERT INTO ' + db.companyTable + ' SET name = ' + conn.escape(body.company.name);
        conn.query(cQuery, function (error, results) {
            if (error) {
                respondWithError(res, error);
            } else {
                afterCompany(results.insertId);
            }
        });
    } else {
        respondWithError(res, "Invalid company");
    }
});

/**
 * Changes properties of one person identified by an id in the database.
 */
router.patch("/:id", function (req, res) {
    // TODO Change person with id
    res.send("UPDATE person with id " + req.params.id);
});

/**
 * Changes one person identified by an id in the database.
 */
router.put("/:id", function (req, res) {
    // TODO Edit person with id
    res.send("EXCHANGE person with id " + req.params.id);
});

module.exports = router;