import { Router } from 'express';
import { AccountsService } from '../services/AccountsService';

const router = Router();
const accountService = new AccountsService();

router.get('/accounts', async (req, res) => {
  try {
    const accounts = await accountService.getAllAccounts();
    res.json({ accounts , "message": "Accounts fetched successfully!" });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching accounts', error });
  }
});

export default router;