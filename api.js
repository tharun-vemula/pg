const axios = require('axios')

module.exports.getWeather =  async (city) => {

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0b3d7e7cfd40292f6663a7dff52136ae`       
    res = await axios.get(url)

    const Weather = {
        temp : res['data']['main']['temp'],
        humidity : res['data']['main']['humidity']
    }
    
    return Weather
}


module.exports.getData = async (code) => {
    let url = `https://ifsc.razorpay.com/${code}`
    let res = await axios.get(url)
    res = res['data']
    const bank = {
        bank : res['BRANCH'],
        branch : res['BANK'],
        address : res['ADDRESS'],
        city : res['CITY'],
        district : res['DISTRICT'],
        state :res['STATE'],
        bank_code :res['BANKCODE']
    }
    
    return bank;

   
}


