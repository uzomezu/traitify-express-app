module.exports = {
    SCHEMA: "postgres",
    HOST: "localhost",
    USER: "postgres",
    PORT: 5432,
    PASS: "",
    DB: "testDB",
    dialect: "postgres",
    DB_SSL: true,
    pool: {
        max:5,
        min:0,
        acquire:30000,
        idle:10000,

    }
}