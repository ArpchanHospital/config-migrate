'use strict';

var resolver = require('../lib/resolver.js');

exports.resolverTests = {
    'should filter out already run migrations' : function(test) {
        var migrationRunLog = "V1__something.js\nV2__else.js";
        var allMigrations = ["V1__something.js", "V2__else.js", "V3__new.js"];
        var yetToRunMigrations = resolver.resolve(migrationRunLog, allMigrations);
        test.deepEqual(yetToRunMigrations, ["V3__new.js"]);
        test.done();
    },

    'should ignore not js files' : function(test) {
        var allMigrations = ["V1__something.js", "someText.txt"];
        var yetToRunMigrations = resolver.resolve("", allMigrations);
        test.deepEqual(yetToRunMigrations, ["V1__something.js"]);
        test.done();
    },

    'should not return anything if there are no migrations': function(test) {
        var yetToRunMigrations = resolver.resolve("", []);
        test.ok(yetToRunMigrations.length == 0);
        test.done();
    },

    'should return the migrations ordered by version number' : function(test) {
        var allMigrations = ["V1__something.js","V10__anything.js", "V2__else.js", "V3__new.js"];
        var yetToRunMigrations = resolver.resolve("V2__else.js", allMigrations);

        test.deepEqual(yetToRunMigrations, ["V1__something.js", "V3__new.js", "V10__anything.js"]);
        test.done();
    }
};