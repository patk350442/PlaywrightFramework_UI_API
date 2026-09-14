# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ..\api-tests\restful-booker-api-module.spec.ts >> [Restful Booking > Booking Verify that user is able to delete the booking using DELETE API and receive valid response]
- Location: tests\api-tests\restful-booker-api-module.spec.ts:106:5

# Error details

```
Error: expect(received).toBeTruthy()

Received: false
```

# Test source

```ts
  20  |     expect(getAPIResponse.headers()['content-type']).toBe(restfulApiData.content_type);
  21  |     expect(getAPIResponseJson).not.toBeNull()
  22  | })
  23  | 
  24  | test('[Restful -Booker > Booking] Verify that the user is able to fetch booking details for a specific booking ID using GET API and receives a valid response', {
  25  |     tag:['@API','@UAT'],
  26  |     annotation:{
  27  |         type:'Test Case Link',
  28  |         description:'https://azure.microsoft.com/en-us/pricing/purchase-options/azure-account'
  29  |     }
  30  | }, async ({request})=>{
  31  | 
  32  |     const getAPIResponse1=await request.get(`${apiPathData.booking_path}/${restfulApiData.booking_id}`);
  33  |     const getAPIResponseJson=await getAPIResponse1.json();
  34  |     console.log(getAPIResponseJson);
  35  |     expect(getAPIResponse1.ok()).toBeTruthy();
  36  |     expect(getAPIResponse1.status()).toBe(200);
  37  |     expect(getAPIResponse1.statusText()).toBe('OK');
  38  |     expect(getAPIResponseJson).not.toBeNull();
  39  |     expect(getAPIResponseJson.firstname).toEqual(restfulApiData.firstname);
  40  | })
  41  | 
  42  | test('[Restful Booker > booking] Verify that the user is able to create to new booking using POST API and receive valid response',{
  43  |     tag:['@API','@UAT'],
  44  |     annotation:{
  45  |         type:'Test Case Link',
  46  |         description:'https://azure.microsoft.com/en-us/pricing/purchase-options/azure-account'
  47  |     }
  48  | }, async ({request})=>{
  49  |     const postAPIResponse=await request.post(apiPathData.booking_path,{
  50  |         data:restfulApiData.create_booking,
  51  |     })
  52  |     const postAPIResponseJson=await postAPIResponse.json()
  53  |     expect(postAPIResponse.ok()).toBeTruthy();
  54  |     expect(postAPIResponse.status()).toBe(200);
  55  |     expect(postAPIResponse.statusText()).toBe('OK');
  56  |     expect(postAPIResponseJson).not.toBeNull();
  57  |     expect(postAPIResponseJson.bookingid).not.toBeNull();
  58  |     expect(postAPIResponseJson.booking).toMatchObject(restfulApiData.create_booking);
  59  |     //expect(postAPIResponseJson.booking.firstname).toBe(restfulApiData.create_booking.firstname);
  60  | })
  61  | 
  62  | test('[Restful Booker > Booking] Verify that the user is able to update the existing booking using PUT API call and receive the updated booking response',{
  63  |         tag:['@API','@UAT'],
  64  |         annotation:{
  65  |             type:'Test Case Link',
  66  |             description: 'https://azure.microsoft.com/en-us/pricing/purchase-options/azure-account'
  67  |         }
  68  | }, async ({request,commonApiUtils})=>{
  69  |         const tokenVal= await commonApiUtils.createToken();
  70  |         console.log('token is '+tokenVal)
  71  |         const putAPIResponse=await request.put(`${apiPathData.booking_path}/${restfulApiData.booking_id_PUT}`,{
  72  |             headers:{
  73  |                 Cookie:`token=${tokenVal}`
  74  |             },
  75  |             data: restfulApiData.update_booking
  76  |         });
  77  |         const putAPIResponseJson=await putAPIResponse.json()
  78  |         expect(putAPIResponse.ok()).toBeTruthy();
  79  |         expect(putAPIResponse.status()).toBe(200);
  80  |         expect(putAPIResponseJson).toMatchObject(restfulApiData.update_booking);
  81  | })
  82  | 
  83  | test('[Restful booking > Booking] Verify that the user is able to partially update the booking using PATCH API and receive valid response',{
  84  |     tag:['@API','@UAT'],
  85  |     annotation:{
  86  |         type:'Test Case Link',
  87  |         description: 'https://azure.microsoft.com/en-us/pricing/purchase-options/azure-account'
  88  |     }
  89  | }, async ({request,commonApiUtils})=>{
  90  |     const tokenVal=await commonApiUtils.createToken();
  91  |     const patchAPIResponse=await request.patch(`${apiPathData.booking_path}/${restfulApiData.booking_id_PATCH}`,{
  92  |         headers:{
  93  |             Cookie: `token=${tokenVal}`
  94  |         },
  95  |         data:restfulApiData.partial_update_booking
  96  |     })
  97  |     const patchAPIResponseJson=await patchAPIResponse.json();
  98  |     expect(patchAPIResponse.status()).toBe(200);
  99  |     expect(patchAPIResponse.ok()).toBeTruthy();
  100 |     expect(patchAPIResponseJson).not.toBeNull();
  101 |     expect(patchAPIResponseJson.firstname).toMatch(restfulApiData.partial_update_booking.firstname);
  102 |     expect(patchAPIResponseJson.lastname).toMatch(restfulApiData.partial_update_booking.lastname);
  103 | 
  104 | })
  105 | 
  106 | test('[Restful Booking > Booking Verify that user is able to delete the booking using DELETE API and receive valid response]',{
  107 |     tag:['@UAT','@API'],
  108 |     annotation:{
  109 |         type:'Test Case Link',
  110 |         description:'https://azure.microsoft.com/en-us/pricing/purchase-options/azure-account'
  111 |     }
  112 | }, async ({request,commonApiUtils})=>{
  113 |     const tokenVal=await commonApiUtils.createToken();
  114 |     const deleteAPIResponse=await request.delete(`${apiPathData.booking_path}/${restfulApiData.booking_id_DELETE}`,{
  115 |         headers:{
  116 |             Cookie:`token=${tokenVal}`
  117 |         }
  118 |     })
  119 |     
> 120 |     expect(deleteAPIResponse.ok()).toBeTruthy();
      |                                    ^ Error: expect(received).toBeTruthy()
  121 |     expect(deleteAPIResponse.status()).toBe(201);
  122 |     expect(deleteAPIResponse.statusText()).toBe('Created');
  123 |     const getAPIResponseAfterDeletion=await request.get(`${apiPathData.booking_path}/${restfulApiData.booking_id_DELETE}`)
  124 |     expect(getAPIResponseAfterDeletion.status()).toBe(404);
  125 |     expect(getAPIResponseAfterDeletion.statusText()).toBe('Not Found');
  126 | })
```