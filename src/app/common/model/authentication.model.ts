export interface Authentication {
    token: string;
    expired: number;
    refreshToken: string;
    userId: number;
    tokenType: string;
    admin: boolean;
}
