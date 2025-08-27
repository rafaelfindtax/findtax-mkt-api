import { Router } from "express";
import { AccountsService } from "../services/AccountsService";
import { authMiddleware, AuthenticatedRequest } from "../middleware/auth";
const bcrypt = require("bcrypt");

const router = Router();
const accountService = new AccountsService();

router.get("/accounts", async (req, res) => {
  try {
    const accounts = await accountService.getAllAccounts();
    res.json({ accounts, message: "Accounts fetched successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error fetching accounts", error });
  }
});

router.get("/account/:uuid", async (req, res) => {
  try {
    const { uuid } = req.params; // Pega o uuid da URL
    const account = await accountService.getAccountByUuid(uuid);

    if (account) {
      res.json({ account, message: "Account fetched successfully!" });
    } else {
      res.status(404).json({ message: `Account with UUID ${uuid} not found` });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching account", error });
  }
});

router.get("/accounts/email/:email", async (req: AuthenticatedRequest, res) => {
  try {
    const { email } = req.params;

    const account = await accountService.getAccountByEmail(email);

    if (account) {
      res.json({ account, message: "Account fetched successfully by email!" });
    } else {
      res
        .status(404)
        .json({ message: `Account with email ${email} not found` });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching account by email", error });
  }
});

router.put(
  "/accounts/email/:email",
  async (req: AuthenticatedRequest, res): Promise<void> => {
    try {
      const { email } = req.params;
      const updatedAccount = await accountService.updateAccountByEmail(
        email,
        req.body
      );

      if (!updatedAccount) {
        res.status(404).json({ message: "Account not found" });
        return;
      }

      res.json({
        account: updatedAccount,
        message: "Account updated successfully!",
      });
    } catch (error) {
      res.status(500).json({ message: "Error updating account", error });
    }
  }
);


router.post("/accounts", async (req, res) => {
  try {
    let accountData = req.body;
    if (accountData.password) {
      const saltRounds = 10;
      accountData.password = await bcrypt.hash(
        accountData.password,
        saltRounds
      );
    }
    const createdAccount = await accountService.createAccount(accountData);
    res.status(201).json({
      account: createdAccount,
      message: "Account created successfully!",
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating account", error });
  }
});

router.get(
  "/accounts/:email/provider",
  async (req: AuthenticatedRequest, res) => {
    try {
      const { email } = req.params;

      const appProvider = await accountService.getAppProviderByAccountEmail(
        email
      );

      if (!appProvider) {
        res.status(404).json({
          message: `AppProvider not found for account with email ${email}`,
        });
        return;
      }

      res.json({
        appProvider,
        message: "AppProvider fetched successfully by account email!",
      });
    } catch (error) {
      res.status(500).json({
        message: "Error fetching AppProvider by account email",
        error,
      });
    }
  }
);

export default router;
