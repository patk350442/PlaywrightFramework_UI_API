import { APIRequestContext } from "@playwright/test";
import apiPathData from '../testdata/api-data/api-path-data.json'
import CommonUtils from "./CommonUtils";


export default class CommonApiUtils{

    private request: APIRequestContext;

    constructor(request: APIRequestContext)
    {
        this.request=request;
    }

    public async createToken()
    {
        const commonUtils=new CommonUtils();
        const apiUserName= commonUtils.decryptData(process.env.API_USER_NAME!);
        const apiPassword= commonUtils.decryptData(process.env.API_PASSWORD!)
        const AuthResponse=await this.request.post(apiPathData.auth_path,{
            data:
            {
                "username": apiUserName,
                "password" :apiPassword
            }
            
        })
        const AuthResponseJson=await AuthResponse.json();
        if (!AuthResponseJson.token) {
            throw new Error('Authentication response did not contain a token');
        }
        return AuthResponseJson.token;
    }
}