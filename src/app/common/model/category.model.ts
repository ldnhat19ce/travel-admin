export interface Category {
    id: number;
    name: string;
    nameEng: string;
    level: number;
    sort: number;
    type: string;
    parentId: number;
    modifiedAt: string;
    hasChild: number;
    url: string;
    nameOrg: string;
    nameEngOrg: string;
    mainPostId: number;
    imageUrl: string;
    description: string;
    descriptionEng: string;
    typeName: string;
    availableHomePage: boolean;
    used: boolean;
}
