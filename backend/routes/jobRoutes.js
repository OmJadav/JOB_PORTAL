import express from 'express'
import { authMiddleware, roleCheck } from '../middlewares/authMiddleware.js';
import { deleteJob, getAllJobs, getSingleJob, myPostedJobs, postJob } from '../controllers/jobController.js';
const router = express.Router();


router.post('/post-job', authMiddleware, roleCheck('employer'), postJob)
router.post('/getalljobs', getAllJobs)
router.post('/mypostedjob', authMiddleware, roleCheck('employer'), myPostedJobs)
router.delete('/deletejob/:id', authMiddleware, roleCheck('employer'), deleteJob)
router.get('/singlejob/:id', authMiddleware, getSingleJob)


export default router;
