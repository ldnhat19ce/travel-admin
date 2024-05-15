import { Data } from "./data.model";

export interface Response<T> {
    code: number;
    data: Data<T>;
}
