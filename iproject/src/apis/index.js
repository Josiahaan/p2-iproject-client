import axios from 'axios'

const url = "http://localhost:3000"

const origin = axios.create({
  baseURL: url
})

export { origin }