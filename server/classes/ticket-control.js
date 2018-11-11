const fs = require('fs');

class Ticket {

    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}



class TicketControl {
    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.lastfour = [];


        let data = require('../data/data.json');

        if (data.hoy === this.hoy) {

            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.lastfour = data.lastfour;

        } else {
            this.reiniciaConteo();
        }
    }

    siguiente() {

        this.ultimo += 1;

        let ticket = new Ticket(this.ultimo, null);

        this.tickets.push(ticket);

        this.grabarArchivo();

        return `Ticket ${this.ultimo}`;

    }

    getUltimoTicket() {

        return `Ticket ${this.ultimo}`;
    }

    getUltimo4() {

        return this.lastfour;
    }

    atenderTicket(escritorio) {

        if (this.tickets.length === 0) {
            return 'No hay tickets';
        }

        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift();

        let atenderTicket = new Ticket(numeroTicket, escritorio);

        this.lastfour.unshift(atenderTicket);
        if (this.lastfour.length > 4) {
            this.lastfour.splice(-1, 1);
        }

        this.grabarArchivo()

        return atenderTicket;
    }


    reiniciaConteo() {

        this.ultimo = 0;
        this.tickets = [];
        this.lastfour = [];
        this.grabarArchivo();

    }

    grabarArchivo() {

        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            lastfour: this.lastfour,
        };

        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataString);

    }
}



module.exports = {
    TicketControl
}