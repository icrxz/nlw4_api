import { Request, Response } from 'express';
import { resolve } from 'path';
import { getCustomRepository } from 'typeorm';
import SurveysRepository from '../repositories/SurveysRepository';
import SurveysUsersRepository from '../repositories/SurveysUsersRepository';
import UserRepository from '../repositories/UserRepository';
import SendMailService from '../services/SendMailService';

export default class SendMailController {
  async execute(request: Request, response: Response) {
    const { email, survey_id } = request.body;

    const usersRepository = getCustomRepository(UserRepository);
    const surveysRepository = getCustomRepository(SurveysRepository);
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const user = await usersRepository.findOne({ email })

    if(!user)
      return response.status(400).json({ error: "User don't exists" })

    const survey = await surveysRepository.findOne({ id: survey_id })

    if(!survey)
      return response.status(400).json({ error: "Survey don't exists" })

    const surveyUserAlreadyExists = await surveysUsersRepository.findOne({
      where: [{user_id: user.id}, {value: null}],
      relations: ['user', 'survey'],
    });

    const npsPath = resolve(__dirname, '..', 'views', 'emails', 'npsMail.hbs')
    const variables = {
      name: user.name,
      title: survey.title,
      description: survey.description,
      user_id: user.id,
      link: process.env.URL_MAIL
    };

    if(surveyUserAlreadyExists) {
      await SendMailService.execute(email, survey.title, variables, npsPath);

      return response.status(200).json(surveyUserAlreadyExists)
    }

    const surveyUser = surveysUsersRepository.create({
      user_id: user.id,
      survey_id: survey.id,
    })

    await surveysUsersRepository.save(surveyUser);

    await SendMailService.execute(email, survey.title, variables, npsPath);

    return response.status(201).json(surveyUser);
  }
}
