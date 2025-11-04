export const getUsers = (req, res) => {
  res.json([{ id: 1, name: "John Doe" }]);
};

export const createUser = (req, res) => {
  const { name } = req.body;
  res.status(201).json({ id: Date.now(), name });
};
