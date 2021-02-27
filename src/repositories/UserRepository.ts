import { EntityRepository, Repository } from "typeorm";

import { User } from "../models/User.model";

@EntityRepository(User)
class UserRepository extends Repository<User> {
  constructor() {
    super();
  }
};

export default UserRepository;
