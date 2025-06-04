export const createServiceMiddleaware = async (req, res, next) => {
    const { name, description, user_id } = req.body;
    const Authorization = req.header("Authorization");
    const token = Authorization.split("Bearer ")[1];
    const url = req.url;
    console.log(`Fecha de la consulta: ${new Date()}; URL consultada: ${url}; Datos recibidas: `, req.body);
    try {

        if (!token) {
            return res.status(404).json({ message: 'Usuario no autorizado' });
        }else if(!name.trim() || !description.trim() || isNaN(user_id)){
            return res.status(400).json({ message: 'Todos los campos deben ser completados' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    req.data={
        name,
        description,
        user_id
    }
    next();
}