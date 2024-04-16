
import * as jwt from 'jsonwebtoken';
import { User } from '../model/User';
import { Roles } from '../../enums/Roles';

class JwtTokenUtil {
    private tokenValidity: number;
    private tokenSigningKey: string;
    private tokenIssuer: string;

    constructor(tokenValidity: number, tokenSigningKey: string, tokenIssuer: string) {
        this.tokenValidity = tokenValidity;
        this.tokenSigningKey = tokenSigningKey;
        this.tokenIssuer = tokenIssuer;
    }

    getUsernameFromToken(token: string): string {
        return this.getClaimFromToken(token, (claims) => claims.sub);
    }

    getExpirationDateFromToken(token: string): Date {
        return this.getClaimFromToken(token, (claims) => new Date(claims.exp * 1000));
    }

    getClaimFromToken<T>(token: string, claimsResolver: (claims: any) => T): T {
        const claims = this.getAllClaimsFromToken(token);
        return claimsResolver(claims);
    }

    getAllClaimsFromToken(token: string) {
        try {
            return jwt.verify(token, this.tokenSigningKey);
        } catch (expiredJwtException) {
            throw new Error("Jwt auth token is expired");
        }
    }

    isTokenExpired(token: string): boolean {
        const expiration: Date = this.getExpirationDateFromToken(token);
        return expiration.getTime() < new Date().getTime();
    }

    generateToken(user: User): string {
        return this.doGenerateToken(user.username, user.role);
    }

    

    private doGenerateToken(subject: string, roles: Roles[]): string {
        const claims: any = { sub: subject };
        if (roles && roles.length > 0) {
            claims.roles = roles.map(role =>({ authority : role.toString()}))
        }

        return jwt.sign(claims, this.tokenSigningKey, {
            issuer: this.tokenIssuer,
            expiresIn: this.tokenValidity / 1000 // Convert milliseconds to seconds
        });
    }

    validateToken(token: string, userDetails: any): boolean {
        if (!userDetails) {
            return !this.isTokenExpired(token);
        }
        const username: string = this.getUsernameFromToken(token);
        return username === userDetails.username && !this.isTokenExpired(token);
    }
}

export { JwtTokenUtil };
