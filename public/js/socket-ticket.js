// establecer conexión con el servidor

let socket = io();

let label = $("#lblNuevoTicket");

socket.on('connect', function() {

});

socket.on('disconnect', function() {

});


socket.on('estadoActual', function(data) {
    label.text(data.actual);
});

$("button").on('click', function() {

    socket.emit('siguienteTicket', null, function(ticket) {
        label.text(ticket);
    });

})