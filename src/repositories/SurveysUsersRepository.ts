import { EntityRepository, Repository } from "typeorm";

import { SurveyUser } from "../models/SurveyUser.model";

@EntityRepository(SurveyUser)
class SurveysUsersRepository extends Repository<SurveyUser> {
  constructor() {
    super();
  }
};

export default SurveysUsersRepository;
