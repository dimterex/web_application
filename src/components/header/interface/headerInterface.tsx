import { PageInfo } from "./pageInfo";

export interface HeaderInterface {
    handlerThemeChange: () => void,
    pages: PageInfo[],
}