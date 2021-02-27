import { EntityRepository, Repository } from "typeorm";

import { Survey } from "../models/Survey.model";

@EntityRepository(Survey)
class SurveysRepository extends Repository<Survey> {
  constructor() {
    super();
  }
};

export default SurveysRepository;
