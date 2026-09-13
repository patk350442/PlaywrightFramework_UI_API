import { profileEnd } from 'console';
import cryptoJs from 'crypto-js';

export default class CommonUtils{

    private secretKey:string;

    constructor()
    {
        //this.secretKey=process.env.SECRET_KEY ? process.env.SECRET_KEY : "";
        if(process.env.SECRET_KEY)
        {
            this.secretKey=process.env.SECRET_KEY;
        }
        else
        {
            throw new Error("Please provide secret key while starting the execution");
        }
    }
    /**
     * 
     * @param data 
     * @returns 
     */
    public encryptData(data:string)
    {
        const encryptedData=cryptoJs.AES.encrypt(data,this.secretKey).toString();
        console.log(encryptedData);
        return encryptedData;
    }
    public decryptData(encryptdData:string)
    {
        const decryptedData=cryptoJs.AES.decrypt(encryptdData, this.secretKey).toString(cryptoJs.enc.Utf8);
        return decryptedData;
    }
}