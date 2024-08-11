export interface Data<T> {
    limit: number;
    page: number;
    pages: number;
    total: number;
    result: T;
}
