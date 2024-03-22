import { Model } from "mongoose";
import logger from "../../common/logger";
import { UserDto } from "../../dto/UserDto";
import { Roles } from "../../enums/Roles";
import { User, UserModel } from "../model/User";
import bcrypt from "bcrypt";

class UserService {
  private userRepository: Model<User>;
  private adminusername: string;
  private adminPass: string;
  private runPostConstructScript: string;

  constructor(
    userRepository: Model<User>,
    adminusername: string,
    adminPass: string,
    runPostConstructScript: string
  ) {
    this.userRepository = userRepository;
    // this.bcryptEncoder = bcryptEncoder;
    this.adminusername = adminusername;
    this.adminPass = adminPass;
    this.runPostConstructScript = runPostConstructScript;
    // this.mongoTemplate = mongoTemplate;
  }
  isRole(role: string): role is Roles {
    return Object.values(Roles).includes(role as Roles);
  }
  async createUser(userdto: UserDto) {
    logger.debug("Creating user ");

    const existingUser: any = await this.findByUsername(userdto.username);
    console.log(existingUser)
    if (existingUser !== null) {
      logger.info("User already present with username " + userdto.username);
    } else {
      const user = {} as User;
      user.username = userdto.username;
      user.password = bcrypt.hashSync(userdto.password ?? "", 10);
      if (userdto.role !== null && userdto.role.length > 0) {
        const roles: any = userdto.role.map((role) => role.toUpperCase());
        user.role = roles;
      }
      user.description = userdto.description;
      user.created = new Date();
      user.lastModified = new Date();
      const newUser = new UserModel({
        ...user,
      });

      newUser.save();
      logger.info("User created ");
    }
  }

   async findByUsername(username: string):Promise<User> {
    console.log(username)
    const result = await this.userRepository.find({ username: username })
    console.log(result)
    const doc = result[0]
    if(!doc){
      logger.warn(`No document found for the given username : ${username}`)
      
    }
    return {
      id: doc._id.toString(),
      username: doc.username,
      password: doc.password,
      role: doc.role,
      created: doc.created,
      lastModified: doc.lastModified,
    }
    
  }

//   initSetup() {
//     if (Boolean(this.runPostConstructScript)) {
//       try {
//         const user = {} as UserDto;
//         user.username = this.adminusername;
//         user.password = this.adminPass;

//         user.role = [Roles.ADMIN.toString()];
//         this.createUser(user);
//       } catch (e) {
//         logger.error(e);
//       }
//     }
//   }

  // getUsers(): User[] {
  //     Logger.debug("Getting users ");

  //     const query: Query = new Query();

  //     query.fields().exclude("password");

  //     let users: User[] = this.mongoTemplate.find(query, User);

  //     const userLastModifiedDateComparator: Comparator<User> = Comparator.comparing<User, LocalDateTime>(user => user.lastModified).reversed();
  //     users.sort(userLastModifiedDateComparator);

  //     Logger.debug("Got users ", users);

  //     return users;
  // }
}

export { UserService };
