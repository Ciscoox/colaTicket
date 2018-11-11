let socket = io();

socket.on('connect', function() {
    console.log('conectado');
});

socket.on('disconnect', function() {
    console.log('desconexión');
});

let searchParams = new URLSearchParams(window.location.search);


if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

let escritorio = searchParams.get('escritorio');
$("h1").text('Escritorio ' + escritorio);
let label = $('small');

$("button").on('click', function() {

    socket.emit('atenderTicket', {
        escritorio: escritorio
    }, function(data) {
        if (data === 'No hay tickets') {
            label.text(data);
            alert('no hay ticket en colas');
            return;
        }
        label.text(data.numero);
    })

});