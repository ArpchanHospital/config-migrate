'use strict';

module.exports = function Migration(migrator) {

    migrator.execute("sample-config.json", function(jsonObject) {
        //Some migration
    });
};
