#! /usr/bin/env node

'use strict';

var Migrator = require('./migrator.js');
var resolver = require('./resolver.js');
var fs = require('fs');

var configFilesDirectory = process.argv[2]; //first param
var migrationFilesDirectory = process.argv[3]; //second param

if (configFilesDirectory === undefined || migrationFilesDirectory === undefined) {
    console.log("Incorrect usage! \nCommand: bahmni-migrate config_files_directory migration_files_directory");
    return;
}

var migrationRunLogFile = configFilesDirectory + '/migration-run-log.txt';

var migrationsToRun = getMigrationFileNamesToRun();
if (migrationsToRun.length == 0) {
    console.log("No new migrations to run...");
} else {
    migrationsToRun.forEach(function (migrationFileName) {
        new Migrator(migrationFileName, configFilesDirectory, migrationFilesDirectory);
        updateChangeLog(migrationFileName);
    });
    console.log("Done!");
}

function getMigrationFileNamesToRun() {
    var migrationRunLog = fs.existsSync(migrationRunLogFile) ? fs.readFileSync(migrationRunLogFile).toString() : "";
    var allMigrations = fs.readdirSync(migrationFilesDirectory);
    return resolver.resolve(migrationRunLog, allMigrations);
}

function updateChangeLog(migratedFileName) {
    if (fs.existsSync(migrationRunLogFile)) {
        fs.appendFileSync(migrationRunLogFile, "\n" + migratedFileName);
    } else {
        fs.writeFileSync(migrationRunLogFile, migratedFileName, 'utf-8');
    }
}




