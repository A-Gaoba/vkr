import { Router } from 'express';
import { assignTeachersToClasses } from '../controllers/assignments';

const router = Router();

router.post('/', assignTeachersToClasses);

export default router;
