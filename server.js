const dgram = require('dgram');
const server = dgram.createSocket('udp4');

const HOST = 'localhost';
const PORT = 6000;

server.on('message', (message, rinfo) => {
    console.log(`\nMensagem recebida de ${rinfo.address}:${rinfo.port}`);
    console.log(`Mensagem: ${message.toString()}`);
    
    const response = 'Msg Recebida!';
    server.send(response, rinfo.port, rinfo.address, (err) => {
        if (err) {
            console.error(`Erro ao enviar resposta: ${err}`);
        }
    });
});

server.on('error', (err) => {
    console.error(`Erro do servidor UDP: ${err}`);
    server.close();
});

server.bind(PORT, HOST, () => {
    console.log(`\nServidor UDP ouvindo em ${HOST}:${PORT}`);
});
