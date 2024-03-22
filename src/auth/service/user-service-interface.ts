import { UserDto } from "../../dto/UserDto";
import { User } from "../model/User";

interface UserService {
    createUser(user: UserDto): void;
    findByUsername(username: string): User | null;
    initSetup(): void;
    getUsers(): User[];
}

export { UserService };
