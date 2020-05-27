const allowedHeaders = [
    "Authorization",
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept"
]

const allowedOrigins = [
    "*"
]

function getAllowedOrigins(){
    return allowedOrigins.join(",");
}


function getAllowedHeaders() {
    return allowedHeaders.join(",");
}


module.exports = {
    allowedOrigins : getAllowedOrigins(),
    allowedHeaders : getAllowedHeaders()
}