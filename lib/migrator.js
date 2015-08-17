'use strict';

module.exports = function Migrator(migrationFileName, configFilesDirectory, migrationFilesDirectory) {
    var self = this;
    var fs = require('fs');

    self.execute = function (configJsonFileName, migration) {
        var intendation = 4;
        var filePath = configFilesDirectory + "/" + configJsonFileName;
        try {
            debugger;
            var configObject = require(filePath);
        } catch (e) {
            console.log("Migration not found: " + filePath);
            throw e;
        }

        var resultObject = migration(configObject);
        if (resultObject) {
            var resultString = JSON.stringify(resultObject, null, intendation);
            fs.writeFileSync(filePath, resultString, 'utf-8');
        }
    };

    console.log("Running migration... " + migrationFileName);
    var Migration = require(migrationFilesDirectory + "/" + migrationFileName);
    new Migration(self);

};

