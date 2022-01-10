import * as dotenv from 'dotenv';
import app from './app';

dotenv.config();

const PORT = process.env.APP_PORT || 3333;

app.listen(PORT, () => {
    console.log(`⚡️[server]: Servidor está em execução em https://localhost:${PORT}`);
});