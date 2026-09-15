export async function formatAPIRequest(template: string, values: any[]): Promise<string> {
    return template.replace(/"\{\{(\d+)\}\}"|\{\{(\d+)\}\}/g, (match, quotedIndex, rawIndex) => {
        const index = parseInt(quotedIndex ?? rawIndex, 10);
        if (index >= values.length) {
            return match;
        }

        return JSON.stringify(values[index]);
    });
}

export async function getPOSTAPIRequestBody(fname: string, lname: string, price: number, depositpaid: boolean, additionalneeds: string, checkin: string, checkout: string) {

    const apiRequestBody: BookingAPI = {
        firstname: fname,
        lastname: lname,
        totalprice: price,
        depositpaid: depositpaid,
        additionalneeds: additionalneeds,
        bookingdates: {
            checkin: checkin,
            checkout: checkout
        }



    }
    return apiRequestBody;

}