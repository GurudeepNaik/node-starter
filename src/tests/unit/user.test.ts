import { createUser } from "../../services/user";

test("create a new user", async () => {
  const user = await createUser("test@example.com", "password");
  expect(user).toHaveProperty("email", "test@example.com");
});
