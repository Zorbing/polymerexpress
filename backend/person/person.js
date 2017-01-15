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

router.get("/", function (req, res) {
    // TODO: Get List of persons
    res.send("GET person list");
});

router.get("/:id", function (req, res) {
    // TODO: Get person with id
    res.send("GET person with id " + req.params.id);
});

router.delete("/:id", function (req, res) {
    // TODO: Remove person with id
    res.send("DELETE person with id " + req.params.id);
});

router.post("/", function (req, res) {
    // TODO: Save a new person
    res.send("CREATE person");
});

router.put("/:id", function (req, res) {
    // TODO Edit person with id
    res.send("UPDATE person with id " + req.params.id);
});

module.exports = router;