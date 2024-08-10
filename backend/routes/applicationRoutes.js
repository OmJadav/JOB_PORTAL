import express from 'express'
import { authMiddleware, roleCheck } from '../middlewares/authMiddleware.js';
import { deleteApplication, employerGetAllApplication, jobSeekerGetAllApplication, postApplication } from '../controllers/applicationController.js';
const router = express.Router();


router.post('/post/:id', authMiddleware, roleCheck('job seeker'), postApplication)
router.get('/employer/all', authMiddleware, roleCheck('employer'), employerGetAllApplication)
router.get('/job-seeker/all', authMiddleware, roleCheck('job seeker'), jobSeekerGetAllApplication)
router.delete('/delete/:id', authMiddleware, deleteApplication)

export default router;
