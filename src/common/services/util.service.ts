import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UtilService {

    constructor(private readonly jwtSvc: JwtService) {}
    
    public async hash(password: string) {
        return await bcrypt.hash(password, 10);
    }

    public async checkPassword(password: string, encriptedPassword: string) {
        return await bcrypt.compareSync(password, encriptedPassword);
    }   

    public async comparePassword(password: string,hashedPassword: string,): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword);
    }

    public async generateJWT(payload: any, expiresIn: any = '60s') {
        return await this.jwtSvc.signAsync(payload, {
            expiresIn: expiresIn
        }); 
    }

    public async getPayload(token: string) {
        return await this.jwtSvc.verifyAsync(token);
    }
  
}