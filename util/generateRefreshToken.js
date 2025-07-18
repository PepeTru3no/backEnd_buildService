import { oAuth2Client } from "./generateAuthorizationUrl.js";

export const oAuth2Callback = async (req, res) => {
    const {code} = req.query;
    if (!code){
        return res.status(400).send("No tiene codigo de autorizacion");
    }

    try {
        const {tokens}=await oAuth2Client.getToken(code);
        oAuth2Client.setCredentials(tokens);
        const refreshToken= tokens.refresh_token;
        res.status(200).json({message:"refresh token creado", refresh_token:refreshToken});
    } catch (error) {
        res.status(500).json({message:error});
    }
}