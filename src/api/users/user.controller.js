import { Router } from "express";
import { getUserById, addUser } from "./user.service.js";
import UsersValidator from "../../validator/users/index.js";

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    UsersValidator.validateUserPayload(req.body);

    const { username, password, fullname } = req.body;
    const userId = await addUser({ username, password, fullname });
    res.status(201).send({
      status: "success",
      message: "New user created",
      data: { userId },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await getUserById(userId);
    res.send({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;