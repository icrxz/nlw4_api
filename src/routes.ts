import { Router } from 'express';
import UserController from './controllers/UserController';
import SurveyController from './controllers/SurveysController';
import SendMailController from './controllers/SendMailController';

const router = Router();

const userController = new UserController();
const surveyController = new SurveyController();
const sendMailController = new SendMailController();

// Users
router.post('/users', userController.create)

// Surveys
router.post('/surveys', surveyController.create)
router.get('/surveys', surveyController.index)

// SendMail
router.post('/sendMail', sendMailController.execute)

export {
  router,
};
