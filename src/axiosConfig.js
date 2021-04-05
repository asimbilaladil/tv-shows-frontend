const axios = require('axios')

const config = {
  timeout: 1500,
  baseURL: process.env.VUE_APP_API_URL
}

const instance = axios.create(config)

export default instance
