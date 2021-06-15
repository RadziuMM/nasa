import * as dotenv from 'dotenv'
dotenv.config()

export const solsAPI = `${process.env.SOLS}`
export const apodAPI = `${process.env.APOD}`
export const photosAPI = `${process.env.PHOTOS}`
