import {test as base} from '../fixtures/pom-fixture';
import CommonUtils from '../utils/CommonUtils';

type CommonFixtureType={
    commonUtils: CommonUtils
}

export const test=base.extend<CommonFixtureType>({
    commonUtils: async({},use)=> {
        await use(new CommonUtils());
    }
})
