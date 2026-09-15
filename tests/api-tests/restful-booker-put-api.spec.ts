import { expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { DateTime } from 'luxon';
import { getPOSTAPIRequestBody } from '../../utils/APIHelper';
import apiPathData from '../../testdata/api-data/api-path-data.json';
import { test } from '../../fixtures/hooks-fixture'
import restfulApiData from '../../testdata/api-data/restful-booker-api-module.json'

test('Verify that the user is able to update the booking using PUT API and receive valid response', {
    tag: ['@API', '@UAT'],
    annotation: {
        type: 'Test Case Link',
        description: 'https://github.com/patk350442/PlaywrightFramework_UI_API'
    }
}, async ({ request, commonApiUtils }) => {

    const tokenVal = await test.step('Generating cookie token for the PUT API', async () => {
        return await commonApiUtils.createToken();
    })
    const postAPIRequestBody = await test.step('Creating data setup for post API request  body', async ({ }) => {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const totalPrice = faker.number.int({ min: 1000, max: 10000 });
        const depositpaid = true;
        const additionalNeeds = faker.food.fruit();
        const checkin = DateTime.now().toFormat('yyyy-MM-dd');
        const checkout = DateTime.now().plus({ days: 5 }).toFormat('yyyy-MM-dd');
        return await getPOSTAPIRequestBody(firstName, lastName, totalPrice, depositpaid, additionalNeeds, checkin, checkout);

    })

    const postAPIResponse = await test.step('Calling POST API request', async ({ }) => {
        return await request.post(`${apiPathData.booking_path}`, {
            data: postAPIRequestBody
        })
    })

    const postAPIResponseJson = await test.step('Parse POST API response to JSON', async () => {
        return await postAPIResponse.json();
    })

    await test.step('Validating expect assertions for POST API response', async () => {
        expect(postAPIResponse.status()).toBe(200);
        expect(postAPIResponse.statusText()).toBe('OK');
        console.log(postAPIResponseJson);
        expect(postAPIResponseJson).not.toBeNull();
        expect(postAPIResponseJson.booking).toEqual(postAPIRequestBody);
        expect(postAPIResponseJson.bookingid).toBeGreaterThan(0);

    })

    const bId = postAPIResponseJson.bookingid;
    
    const putAPIResponse = await test.step('Calling GET API using booking ID generated from POST API request', async () => {

        return await request.put(`${apiPathData.booking_path}/${bId}`, {
            headers: {
                Cookie: `token=${tokenVal}`
            },
            data: restfulApiData.update_booking
        })
    })

    const putAPIResponseJson = await test.step('Parsing getAPIResponse to JSON', async () => {
        return await putAPIResponse.json();
    })

    console.log(putAPIResponseJson);
    await test.step('Validaing expect assertions for PUT API response', async()=>{
    expect(putAPIResponse.status()).toBe(200);
    expect(putAPIResponse.statusText()).toBe('OK');        
    expect(putAPIResponseJson).not.toBeNull();
    expect(putAPIResponseJson).toEqual(restfulApiData.update_booking);

    })




})