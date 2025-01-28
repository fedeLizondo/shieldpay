export default interface TokenRepository {
    generateToken(payload: any): Promise<String>;
    verifyToken(token: string): any;
    invalidateToken(token: string, userId:string): void;
}