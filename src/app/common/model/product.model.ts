export interface Product {
    id: number;
    categoryId: number;
    pdtName: string;
    pdtNameEng: string;
    pdtCode: string;
    status: string;
    sort: number;
    used: boolean;
    option1: string;
    option2: string;
    option3: string;
    saleStartDate: string;
    saleEndDate: string;
    newStartDate: string;
    newEndDate: string;
    bestStartDate: string;
    bestEndDate: string;
    promotionStartDate: string;
    promotionEndDate: string;
    retailAmt: number;
    tax: number;
    amtId: number;
    supplyAmt: number;
    intro: string;
    introEng: string;
    schedule: string;
    scheduleEng: string;
    policy: string;
    policyEng: string;

}
