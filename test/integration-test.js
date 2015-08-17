var fs = require("fs");

var testConstants = {};
testConstants.configDirectory = (__dirname + '/data/configs');
testConstants.migrationsDirectory = (__dirname + '/data/migrations');
testConstants.migrationRunLogFile = "/migration-run-log.txt";
testConstants.testMigrationRunLogFilePath = testConstants.configDirectory + testConstants.migrationRunLogFile;

exports.integrationTest = {

    "should create a change log file if it is not present and run all the migrations": function(test) {
        if(fs.existsSync(testConstants.testMigrationRunLogFilePath)) {
            fs.unlinkSync(testConstants.testMigrationRunLogFilePath);
        }

        process.argv = ['', '', testConstants.configDirectory, testConstants.migrationsDirectory];
        require("../lib/runner.js");

        var migrationRunLog = fs.readFileSync(testConstants.testMigrationRunLogFilePath).toString();
        test.deepEqual(migrationRunLog.split('\n'), ["V1__first.js", "V2__second.js", "V10__tenth.js"]);

        test.done();
    }

};