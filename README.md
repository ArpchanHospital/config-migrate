# config-migrate
Tool (built as node module) to track, manage and apply structural/data changes to your json config files

<pre>
    
    +---+                                                 +---+                     
    +---------------------+       +---------------+       +----------------------+
    |                     |       |               |       |                      |
    | Bahmni Config Files | +-----> config-migrate| +---> | Updated Config Files |
    |                     |       |               |       |                      |
    +---------------------+       +-------^-------+       +----------------------+
                                          |                                       
                                          |                                       
                                          +                                       
                                 |---|                                          
                                 |-----------------+                              
                                 |                 |                              
                                 | Migration Files |                              
                                 |                 |                              
                                 +-----------------+                              
    
</pre>

Where,
  * Config Files - Your config files which needs to be updated
  * Migration Files - All the migration javascript files to be run

#### Migration Files
The migration files follow a naming convention
  
>  V1__convert_arrays_to_maps.js
>
> Where,  
> * V - Prefix
> * __ - separator
> * convert_arrays_to_maps - name of the migration

#### Config Files
When the migrations are run, a file named 'migration-run-log.txt' will be generated to remember the already run migrations. 
Keep this file versioned along with other config files

#### Usage

1. npm install -g config-migrate
2. config-migrate config_files migration_files


#### Current Limitations

1. Migrations cannot include any other libraries like underscore

