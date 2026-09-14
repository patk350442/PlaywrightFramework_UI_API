
import { expect } from '@playwright/test';
import {test} from '../../fixtures/hooks-fixture';
import apiPathData from '../../testdata/api-data/api-path-data.json'
import restfulApiData from '../../testdata/api-data/restful-booker-api-module.json'
// try to explore/implementing faker js for this API framework using Bakkappa's 

test('Verify that the user is able to fetch all the booking IDs using GET API and receive valid response',{
    tag:['@API','@UAT'],
    annotation:{
        type: 'Test Case Link',
        description:'https://azure.microsoft.com/en-us/pricing/purchase-options/azure-account'
    }
}, async({request})=>{
    const getAPIResponse=await request.get(apiPathData.booking_path);
    const getAPIResponseJson=await getAPIResponse.json();
    expect(getAPIResponse.ok()).toBeTruthy();
    expect(getAPIResponse.status()).toBe(200);
    expect(getAPIResponse.statusText()).toBe('OK');
    expect(getAPIResponse.headers()['content-type']).toBe(restfulApiData.content_type);
    expect(getAPIResponseJson).not.toBeNull()
})

test('[Restful -Booker > Booking] Verify that the user is able to fetch booking details for a specific booking ID using GET API and receives a valid response', {
    tag:['@API','@UAT'],
    annotation:{
        type:'Test Case Link',
        description:'https://azure.microsoft.com/en-us/pricing/purchase-options/azure-account'
    }
}, async ({request})=>{

    const getAPIResponse1=await request.get(`${apiPathData.booking_path}/${restfulApiData.booking_id}`);
    const getAPIResponseJson=await getAPIResponse1.json();
    console.log(getAPIResponseJson);
    expect(getAPIResponse1.ok()).toBeTruthy();
    expect(getAPIResponse1.status()).toBe(200);
    expect(getAPIResponse1.statusText()).toBe('OK');
    expect(getAPIResponseJson).not.toBeNull();
    expect(getAPIResponseJson.firstname).toEqual(restfulApiData.firstname);
})

test('[Restful Booker > booking] Verify that the user is able to create to new booking using POST API and receive valid response',{
    tag:['@API','@UAT'],
    annotation:{
        type:'Test Case Link',
        description:'https://azure.microsoft.com/en-us/pricing/purchase-options/azure-account'
    }
}, async ({request})=>{
    const postAPIResponse=await request.post(apiPathData.booking_path,{
        data:restfulApiData.create_booking,
    })
    const postAPIResponseJson=await postAPIResponse.json()
    expect(postAPIResponse.ok()).toBeTruthy();
    expect(postAPIResponse.status()).toBe(200);
    expect(postAPIResponse.statusText()).toBe('OK');
    expect(postAPIResponseJson).not.toBeNull();
    expect(postAPIResponseJson.bookingid).not.toBeNull();
    expect(postAPIResponseJson.booking).toMatchObject(restfulApiData.create_booking);
    //expect(postAPIResponseJson.booking.firstname).toBe(restfulApiData.create_booking.firstname);
})

test('[Restful Booker > Booking] Verify that the user is able to update the existing booking using PUT API call and receive the updated booking response',{
        tag:['@API','@UAT'],
        annotation:{
            type:'Test Case Link',
            description: 'https://azure.microsoft.com/en-us/pricing/purchase-options/azure-account'
        }
}, async ({request,commonApiUtils})=>{
        const tokenVal= await commonApiUtils.createToken();
        console.log('token is '+tokenVal)
        const putAPIResponse=await request.put(`${apiPathData.booking_path}/${restfulApiData.booking_id_PUT}`,{
            headers:{
                Cookie:`token=${tokenVal}`
            },
            data: restfulApiData.update_booking
        });
        const putAPIResponseJson=await putAPIResponse.json()
        expect(putAPIResponse.ok()).toBeTruthy();
        expect(putAPIResponse.status()).toBe(200);
        expect(putAPIResponseJson).toMatchObject(restfulApiData.update_booking);
})

test('[Restful booking > Booking] Verify that the user is able to partially update the booking using PATCH API and receive valid response',{
    tag:['@API','@UAT'],
    annotation:{
        type:'Test Case Link',
        description: 'https://azure.microsoft.com/en-us/pricing/purchase-options/azure-account'
    }
}, async ({request,commonApiUtils})=>{
    const tokenVal=await commonApiUtils.createToken();
    const patchAPIResponse=await request.patch(`${apiPathData.booking_path}/${restfulApiData.booking_id_PATCH}`,{
        headers:{
            Cookie: `token=${tokenVal}`
        },
        data:restfulApiData.partial_update_booking
    })
    const patchAPIResponseJson=await patchAPIResponse.json();
    expect(patchAPIResponse.status()).toBe(200);
    expect(patchAPIResponse.ok()).toBeTruthy();
    expect(patchAPIResponseJson).not.toBeNull();
    expect(patchAPIResponseJson.firstname).toMatch(restfulApiData.partial_update_booking.firstname);
    expect(patchAPIResponseJson.lastname).toMatch(restfulApiData.partial_update_booking.lastname);

})

test('[Restful Booking > Booking Verify that user is able to delete the booking using DELETE API and receive valid response]',{
    tag:['@UAT','@API'],
    annotation:{
        type:'Test Case Link',
        description:'https://azure.microsoft.com/en-us/pricing/purchase-options/azure-account'
    }
}, async ({request,commonApiUtils})=>{
    const tokenVal=await commonApiUtils.createToken();
    const deleteAPIResponse=await request.delete(`${apiPathData.booking_path}/${restfulApiData.booking_id_DELETE}`,{
        headers:{
            Cookie:`token=${tokenVal}`
        }
    })
    
    expect(deleteAPIResponse.ok()).toBeTruthy();
    expect(deleteAPIResponse.status()).toBe(201);
    expect(deleteAPIResponse.statusText()).toBe('Created');
    const getAPIResponseAfterDeletion=await request.get(`${apiPathData.booking_path}/${restfulApiData.booking_id_DELETE}`)
    expect(getAPIResponseAfterDeletion.status()).toBe(404);
    expect(getAPIResponseAfterDeletion.statusText()).toBe('Not Found');
})