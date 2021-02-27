import { Router } from 'express';
import UserController from './controllers/UserController';
import SurveyController from './controllers/SurveysController';

const router = Router();

const userController = new UserController();
const surveyController = new SurveyController();

// Users
router.post('/users', userController.create)

// Surveys
router.post('/surveys', surveyController.create)
router.get('/surveys', surveyController.index)

export {
  router,
};
