import {test as base} from '../fixtures/pom-fixture';
import CommonApiUtils from '../utils/CommonApiUtils';
import CommonUtils from '../utils/CommonUtils';

type CommonFixtureType={
    commonUtils: CommonUtils,
    commonApiUtils : CommonApiUtils
}

export const test=base.extend<CommonFixtureType>({
    commonUtils: async({},use)=> {
        await use(new CommonUtils());
    },

    commonApiUtils: async ({request},use)=>{
        use(new CommonApiUtils(request));
    }
})
