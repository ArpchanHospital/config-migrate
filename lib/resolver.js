'use strict';

exports.resolve = function(migrationRunLog, allMigrations) {
    var migrationsYetToRun = [];
    var alreadyRunMigrations = migrationRunLog.split("\n").filter(jsFiles);
    allMigrations.filter(jsFiles).forEach(function(migration) {
        if(alreadyRunMigrations.indexOf(migration) == -1) {
            migrationsYetToRun.push(migration);
        }
    });
    return migrationsYetToRun.sort(sortByVersion);
};

function sortByVersion(file1, file2) {
    var regex = new RegExp(/V(\d*)__.*/);
    var file1Version = parseInt(regex.exec(file1)[1]);
    var file2Version = parseInt(regex.exec(file2)[1]);
    return (file1Version > file2Version) ? 1 : -1;
}

function jsFiles(fileName) {
    return fileName.substr(-3) === '.js';
}
