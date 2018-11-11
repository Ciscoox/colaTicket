// conexion socket
let socket = io();


let labellblTicket1 = $("#lblTicket1");
let labellblTicket2 = $("#lblTicket2");
let labellblTicket3 = $("#lblTicket3");
let labellblTicket4 = $("#lblTicket4");


let labellblEscritorio1 = $("#lblEscritorio1");
let labellblEscritorio2 = $("#lblEscritorio2");
let labellblEscritorio3 = $("#lblEscritorio3");
let labellblEscritorio4 = $("#lblEscritorio4");


let labelTck = [labellblTicket1, labellblTicket2, labellblTicket3, labellblTicket4];
let labelEsc = [labellblEscritorio1, labellblEscritorio2, labellblEscritorio3, labellblEscritorio4];


socket.on('estadoActual', function(data) {
    let audio = new Audio('./audio/new-ticket.mp3');
    audio.play();
    actualizaHtml(data.ultimos4);
});

socket.on('utlimos4', function(data) {

    let audio = new Audio('./audio/new-ticket.mp3');
    audio.play();
    actualizaHtml(data.ultimos4);
});

function actualizaHtml(ultimos4) {
    for (let i = 0; i < ultimos4.length; i++) {
        labelTck[i].text('Ticket ' + ultimos4[i].numero);
        labelEsc[i].text('Escritorio ' + ultimos4[i].escritorio);

    }
}