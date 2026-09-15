import { expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { DateTime } from 'luxon';
import { getPOSTAPIRequestBody } from '../../utils/APIHelper';
import apiPathData from '../../testdata/api-data/api-path-data.json';
import { test } from '../../fixtures/hooks-fixture'
import restfulApiData from '../../testdata/api-data/restful-booker-api-module.json'

test('Verify that the user is able to delete the booking using DELETE API and receive valid response', {
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

    await test.step('Validating expect assertions for POST API response', async () => {
        expect(postAPIResponse.status()).toBe(200);
        expect(postAPIResponse.statusText()).toBe('OK');

    })

    const postAPIResponseJson = await test.step('Parse POST API response to JSON', async () => {
        return await postAPIResponse.json();
    })


    await test.step('Validating expect assertions for POST API response body', async () => {
        console.log(postAPIResponseJson);
        expect(postAPIResponseJson).not.toBeNull();
        expect(postAPIResponseJson.booking).toEqual(postAPIRequestBody);
        expect(postAPIResponseJson.bookingid).toBeGreaterThan(0);

    })

    const bId = postAPIResponseJson.bookingid;

    const deleteAPIResponse = await test.step('Calling delete API using booking ID generated from POST API request', async () => {

        return await request.delete(`${apiPathData.booking_path}/${bId}`, {
            headers: {
                Cookie: `token=${tokenVal}`
            }

        })
    })

    await test.step('Validaing expect assertions for delete API response ', async () => {
        expect(deleteAPIResponse.status()).toBe(201);
        expect(deleteAPIResponse.statusText()).toBe('Created');
    })

    await test.step('Validaing the booking is deleted using GET API ', async () => {
        const getAPIResponse = await request.get(`${apiPathData.booking_path}/${bId}`)

        expect(getAPIResponse.status()).toBe(404);
        expect(getAPIResponse.statusText()).toBe('Not Found');
        
    })
    /* const deleteAPIResponseJson = await test.step('Parsing deleteAPIResponse to JSON', async () => {
        return await deleteAPIResponse.json();
    }) */

})