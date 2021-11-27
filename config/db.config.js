module.exports = {
    HOST: "localhost",
    USER: "pgAdmin",
    PASS: "",
    DB: "test_123",
    dialect: "postgres",
    pool: {
        max:5,
        min:0,
        acquire:30000,
        idle:10000,

    }
}