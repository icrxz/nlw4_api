import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import SurveysRepository from '../repositories/SurveysRepository';

export default class SurveysController {
  async create(request: Request, response: Response) {
    const { title, description } = request.body;

    const surveysRepository = getCustomRepository(SurveysRepository);

    const survey = surveysRepository.create({ title, description });

    await surveysRepository.save(survey);

    return response.status(201).json(survey);
  }

  async index(request: Request, response: Response) {
    const surveysRepository = getCustomRepository(SurveysRepository);

    const allSurveys = await surveysRepository.find();

    return response.status(200).json(allSurveys);
  }
}
