export async function ingreso(req, res) {
  const userId = req.params.userId;
  try {
    const user = await userModel.findById(userId);
    if (!user) {
      res.status(202).json({ message: "User not found with ID: " + userId });
    }
    res.json(user);
  } catch (error) {
    console.error("Error consultando el usuario con ID: " + userId);
  }
}
