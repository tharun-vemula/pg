const pg = require('pg')

const conString = "postgres://gpmvbbew:d2aci3Gf8NPySdybDk5-x_t_KbFaOg_d@tyke.db.elephantsql.com/gpmvbbew" 


const client = new pg.Client(conString)


async function start(){
await client.connect()
}

start()

module.exports = client;