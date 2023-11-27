// const puppeteer = require('puppeteer');
import { isTokenCredential } from '@azure/core-auth';
import dotenv from 'dotenv'
import {server} from "../../server"
const request=require("supertest")
dotenv.config()
const baseURL= `http://localhost:${process.env.PORT}`
jest.setTimeout(10000);

describe("GET /", () => {
    it("Response with status 200", async () => {
        const response = await request(server).get('/');
        expect(response.status).toBe(200);
    })
})
/**
 * Login api test
 */
describe("POST /api/users/auth", () => {
    it("Login in with valid credential, response with status 200", async () => {
        const data = {
            email: process.env.CLIENT_GMAIL, 
            password: process.env.CLIENT_PASSWORD
        }      
        const response = await request(server).post('/api/users/auth').send(data);
        expect(response.status).toBe(200);
    })
    it("Login in with invalid credential, response with status 401", async () => {
        const data = {
            email: process.env.INVALID_GMAIL,
            password: process.env.INVALID_PASSWORD
        }
        const response = await request(server).post('/api/users/auth').send(data);
        expect(response.status).toBe(401);
    })

})



