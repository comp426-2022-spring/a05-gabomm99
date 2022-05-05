// Put your database code here
const logData = require("better-sqlite3")

const logdb = new logData("log.db")

// Is the database initialized or do we need to initialize it?
const stmt = logdb.prepare(`
    SELECT name FROM sqlite_master WHERE type='table' and name='accesslog';`
    );
// Define row using `get()` from better-sqlite3
let row = stmt.get();
// Check if there is a table. If row is undefined then no table exists.
if (row === undefined) {
// Echo information about what you are doing to the console.
    console.log('Your database appears to be empty. I will initialize it now.');
// Set a const that will contain your SQL commands to initialize the database.
    const sqlInit = `
        CREATE TABLE accesslog ( 
            id INTEGER PRIMARY KEY, 
            remoteaddr TEXT,
            remoteuser TEXT,
            time INTEGER,
            method TEXT,
            url TEXT,
            protocol TEXT,
            httpversion TEXT,
            status INTEGER, 
            referrer TEXT,
            useragent TEXT 
            );
    `
// Execute SQL commands that we just wrote above.
    logdb.exec(sqlInit);
} else {
// Since the database already exists, echo that to the console.
    console.log('Log Data Base already created.')
}
// Export all of the above as a module so that we can use it elsewhere.
module.exports = logdb