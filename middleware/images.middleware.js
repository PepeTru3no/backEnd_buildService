export const createImageMiddleware= async (req, res, next) => {
    console.log(`id: ${req.params.id}`);
    console.log(req.body);
    return res.send(req.body);
}