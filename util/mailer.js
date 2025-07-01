import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import { config } from 'dotenv';
config();

const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

export const sendVerificationEmail = async (email, localToken) => {
    try {
        const accesToken = await oAuth2Client.getAccessToken();
        const token=accesToken.token;
        if (!token){
            console.log("No se pudo obteber el token");
            return;
        }
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: "OAuth2",
                user: process.env.EMAIL_FROM,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken: token
            }
        });
        const verificationLink = `${process.env.BASE_URL}/users/verify/${localToken}`;
        await transporter.sendMail({
            from: `Reaparapp <${process.env.EMAIL_FROM}>`,
            to: email,
            subject: "Verifica tu cuenta",
            html: `<p>Haz click para verificar tu cuenta:</p>
        <a href="${verificationLink}">${verificationLink}</a>`
        });

    } catch (error) {
        console.log(error.response);
    }
}