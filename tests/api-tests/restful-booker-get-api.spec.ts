import { expect, test } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { DateTime } from "luxon";
import { getPOSTAPIRequestBody } from "../../utils/APIHelper";
import apiPathData from '../../testdata/api-data/api-path-data.json'

test('Verify that the user is able to get the specific booking using GET API and receive valid response', {
    tag: ['@API', '@UAT'],
    annotation: {
        type: 'Test Case Link',
        description: 'https://github.com/patk350442/PlaywrightFramework_UI_API'
    }
}, async ({ request }) => {

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

    await test.step('Validating expect assertions for POST API response ', async () => {
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
    const getAPIResponse = await test.step('Calling GET API using booking ID generated from POST API request', async () => {

        return await request.get(`${apiPathData.booking_path}/${bId}`)
    })

    await test.step('Validating expect assertions for GET API response', async () => {
        expect(getAPIResponse.statusText()).toBe('OK');
        expect(getAPIResponse.status()).toBe(200);
    })

    const getAPIResponseJson = await test.step('Parsing getAPIResponse to JSON', async () => {
        return await getAPIResponse.json();
    })

    console.log(getAPIResponseJson);
    await test.step('Validating expect assertions for GET API response body', async () => {
        expect(getAPIResponseJson).not.toBeNull();
        expect(getAPIResponseJson).toEqual(postAPIRequestBody);

    })


})

