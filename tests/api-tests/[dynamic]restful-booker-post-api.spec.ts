
import { expect } from '@playwright/test';
import { test } from '../../fixtures/hooks-fixture';
import apiPathData from '../../testdata/api-data/api-path-data.json'
import restfulApiData from '../../testdata/api-data/restful-booker-api-module.json'
import { formatAPIRequest } from '../../utils/APIHelper';
import { faker } from '@faker-js/faker';
import { DateTime } from 'luxon';
import { getPOSTAPIRequestBody } from '../../utils/APIHelper';

test('[Restful Booker > booking] Verify that the user is able to create a booking with a dynamic POST request body', {
    tag: ['@API', '@UAT'],
    annotation: {
        type: 'Test Case Link',
        description: 'https://azure.microsoft.com/en-us/pricing/purchase-options/azure-account'
    }
}, async ({ request }) => {

    const dynamicBooking = await test.step('Create dynamic POST request body', async () => {
        const values = ['dynamicFirstName', 'dynamicLastName', 1000];
        const formattedRequest = await formatAPIRequest(
            JSON.stringify(restfulApiData.dynamic_create_booking),
            values,
        );
        return JSON.parse(formattedRequest);
    });

    const postAPIResponse = await test.step('Send POST request to booking API', async () => {
        return await request.post(apiPathData.booking_path, {
            data: dynamicBooking,
        });
    });

    const postAPIResponseJson = await test.step('Parse API response JSON', async () => {
        const json = await postAPIResponse.json();
        console.log(json);
        return json;
    });

    await test.step('Validate POST API response', async () => {
        expect(postAPIResponse.ok()).toBeTruthy();
        expect(postAPIResponse.status()).toBe(200);
        expect(postAPIResponse.statusText()).toBe('OK');
    });

    await test.step('Validate POST API response body', async () => {
        expect(postAPIResponseJson).not.toBeNull();
        expect(postAPIResponseJson.bookingid).not.toBeNull();
        expect(postAPIResponseJson.bookingid).toBeGreaterThan(0);
        expect(postAPIResponseJson.booking).toEqual(dynamicBooking);
        expect(postAPIResponseJson.booking).toHaveProperty('firstname');
        expect(postAPIResponseJson.booking).toHaveProperty('lastname');
        expect(postAPIResponseJson.booking.bookingdates).toHaveProperty('checkin');
        expect(postAPIResponseJson.booking.bookingdates).toHaveProperty('checkout');
    });
});

test('[Restful Booker > booking] Verify that the user is able to create a booking with a dynamic POST request body using fakerjs', {
    tag: ['@API', '@UAT'],
    annotation: {
        type: 'Test Case Link',
        description: 'https://azure.microsoft.com/en-us/pricing/purchase-options/azure-account'
    }
}, async ({ request }) => {

    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const totalPrice = faker.number.int({ min: 1000, max: 10000 });
    const values = [firstName, lastName, totalPrice];
    const formattedRequest = await formatAPIRequest(
        JSON.stringify(restfulApiData.dynamic_create_booking),
        values,
    );
    const dynamicBooking = JSON.parse(formattedRequest);



    const postAPIResponse = await request.post(apiPathData.booking_path, {
        data: dynamicBooking,
    })
    const postAPIResponseJson = await postAPIResponse.json()
    console.log(postAPIResponseJson);
    expect(postAPIResponse.ok()).toBeTruthy();
    expect(postAPIResponse.status()).toBe(200);
    expect(postAPIResponse.statusText()).toBe('OK');
    expect(postAPIResponseJson).not.toBeNull();
    expect(postAPIResponseJson.bookingid).not.toBeNull();
    expect(postAPIResponseJson.bookingid).toBeGreaterThan(0);
    expect(postAPIResponseJson.booking).toMatchObject(dynamicBooking);
    expect(postAPIResponseJson.booking).toHaveProperty('firstname');
    expect(postAPIResponseJson.booking).toHaveProperty('lastname');
    expect(postAPIResponseJson.booking.totalprice).toBe(totalPrice);
    expect(postAPIResponseJson.booking.bookingdates).toHaveProperty('checkin');
    expect(postAPIResponseJson.booking.bookingdates).toHaveProperty('checkout');
    //expect(postAPIResponseJson.booking.firstname).toBe(restfulApiData.create_booking.firstname);
})

test('Verify that the user is able to create booking using POST API call with dynamic request body using fakerJS and receive valid response', {
    tag: ['@API', '@UAT'],
    annotation: {
        type: 'Test Case Link',
        description: 'https://github.com/patk350442/PlaywrightFramework_UI_API'
    }
}, async ({ request }) => {

    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const totalPrice = faker.number.int({ min: 1000, max: 10000 });
    const depositpaid = true;
    const additionalNeeds = faker.food.fruit();
    const checkin = DateTime.now().toFormat('yyyy-MM-dd');
    const checkout = DateTime.now().plus({ days: 5 }).toFormat('yyyy-MM-dd');
    const postAPIRequestBody =await getPOSTAPIRequestBody(firstName, lastName, totalPrice, depositpaid, additionalNeeds, checkin, checkout);
    const postAPIResponse = await request.post(`${apiPathData.booking_path}`, {
        data: postAPIRequestBody
    })
    const postAPIResponseJson =await postAPIResponse.json();
    console.log(postAPIResponseJson);

    expect(postAPIResponse.ok()).toBeTruthy();
    expect(postAPIResponse.status()).toBe(200);
    expect(postAPIResponse.statusText()).toBe('OK');
    expect(postAPIResponseJson).not.toBeNull();
    expect(postAPIResponseJson.bookingid).toBeGreaterThan(0);
    expect(postAPIResponseJson.booking).toHaveProperty('firstname');
    expect(postAPIResponseJson.booking).toHaveProperty('lastname');
    expect(postAPIResponseJson.booking).toHaveProperty('totalprice');
    expect(postAPIResponseJson.booking.totalprice).toEqual(totalPrice);
    expect(postAPIResponseJson.booking.firstname).toEqual(firstName);
    expect(postAPIResponseJson.booking.bookingdates).toHaveProperty('checkin');
    expect(postAPIResponseJson.booking.bookingdates).toHaveProperty('checkout');
    expect(postAPIResponseJson.booking.bookingdates.checkin).toContain(checkin);
    expect(postAPIResponseJson.booking.bookingdates.checkout).toMatch(checkout);

})