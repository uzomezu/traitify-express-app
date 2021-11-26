require('dotenv').config();

module.exports = {
    PORT : process.env.PORT || '',
    API_HOST : process.env.API_HOST || '',
    SECRET_KEY : process.env.SECRET_KEY || '',
    PUBLIC_KEY : process.env.PUBLIC_KEY || '',
}