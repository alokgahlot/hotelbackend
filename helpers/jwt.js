var jwt  = require('express-jwt'); 
// require('dotenv/config')

function authJwt()
{
    return jwt({
       secret : process.env.SECRET_KEY,
        algorithms : ['HS256'], 
        isRevoked: isRevoked,
    }).unless({
        path : [
            '/user-login', 
            '/user-signup'
        ]
    })
}

async function isRevoked(req, payload , done){
if(!payload.isAdmin){
    done(null, true)
}
done()
}

module.exports = authJwt;