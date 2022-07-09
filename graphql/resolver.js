
const api = require('../api')
const client = require('./db')

const bankApi = async (accounts)=>{
    details = []

    for(let account of accounts){
        let data = await api.getData(account)
        let res = await api.getWeather(data['city'])
        data.weather = res
        details.push(data)
    }
    
    return details
}

const getSingleDoc = async (id) => {
        
        let rows = await client.query(`SELECT * FROM users WHERE id = ${id}`)
        let user = rows['rows']
        let accounts = user[0]['accounts']
      
        details = await bankApi(accounts)
        user[0]['accounts'] = details
        return user

}

const resolvers = {
    Query: {
        getAllDetails : async () => {
            
            //await client.connect()
            rows = await client.query('SELECT * FROM users')
            let users = rows['rows']

            for(let user of users){
                accounts = user['accounts'];
                details = await bankApi(accounts)
                user.accounts = details;
            }
           
            return users;
            
        },

    },

    Mutation: {
        addAccountDetails : async (parent, args, context, info) => {

            //await client.connect()

            const user = { ...args.data }
            
            let rows = await client.query(`SELECT id FROM users WHERE id = ${user["user_id"]}`)
            let response = rows['rows']
            let accounts  = user['bank_accounts']
            //accounts = {"", ""}
            
            if(response.length === 0){

                let literal = `${user['user_id']}, '${user['user_name']}', '{`
                

                for(i =0; i < accounts.length-1; i++){
                    literal += accounts[i] + ","
                }
                literal += `${accounts[accounts.length - 1]} }'`

                let query_string = `INSERT INTO users VALUES (${literal})`
                let res = await client.query(query_string)
                
                if(res.rowCount == 0){
                    return 'Query Didnt execute properly'
                }
                
            }
            else{

                let literal = `'{ `
                for(i =0; i < accounts.length-1; i++){
                    literal += accounts[i] + ","
                }
                literal += `${accounts[accounts.length - 1]} }'`
                let query_string = `UPDATE users SET name = '${user['user_name']}', accounts = ${literal} WHERE id = ${user['user_id']}`
                let res = await client.query(query_string)
                
            }

                const result = await getSingleDoc(user['user_id'])
                return result[0]
        }
    }
}




module.exports = resolvers;
