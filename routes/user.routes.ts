import { Router } from 'express';
import { getUser, createUser } from '../controllers/user.controller';

const router = Router();

router.get('/', getUser);
router.post('/', createUser);
// Другие методы...

export default router;