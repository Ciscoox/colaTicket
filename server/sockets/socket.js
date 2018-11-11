const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');


const ticketControl = new TicketControl();

io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.emit('enviarMensaje', {
        usuario: 'Administrador',
        mensaje: 'Bienvenido a esta aplicación'
    });



    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    // Escuchar el cliente
    client.on('siguienteTicket', (data, callback) => {

        let siguiente = ticketControl.siguiente();
        callback(siguiente);

    });

    // emitir el ultimo número
    let actual = ticketControl.getUltimoTicket();
    let ultimos4 = ticketControl.getUltimo4();
    client.emit('estadoActual', {
        actual: actual,
        ultimos4: ultimos4
    });


    client.on('atenderTicket', (data, callback) => {

        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'el escritorio es necesario'
            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        callback(atenderTicket);
    });

    client.broadcast.emit('ultimos4', {
        ultimos4: ticketControl.getUltimo4()
    });

});