import app from './app';

const PORT = 3333;

app.listen(PORT, () => {
    console.log(`⚡️[server]: Servidor está em execução em https://localhost:${PORT}`);
});