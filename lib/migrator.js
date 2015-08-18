'use strict';

module.exports = function migrator(migrationFileName, configFilesDirectory, migrationFilesDirectory) {
    var fs = require('fs');

    global.migrate = function (configJsonFileName, migration) {
        var intendation = 4;
        var filePath = configFilesDirectory + "/" + configJsonFileName;
        try {
            var configObject = require(filePath);
        } catch (e) {
            console.log("Config file not found: " + filePath);
            return;
        }

        var resultObject = migration(configObject);
        if (resultObject) {
            var resultString = JSON.stringify(resultObject, null, intendation);
            fs.writeFileSync(filePath, resultString, 'utf-8');
        }
    };

    console.log("Running migration... " + migrationFileName);
    require(migrationFilesDirectory + "/" + migrationFileName);

};

