//  let APIURL = 'https://arcane-tor-58586.herokuapp.com/https://ism-journal-server.herokuapp.com';
let APIURL; 

switch(window.location.hostname){
    case 'localhost' || '127.0.0.1':
        APIURL = 'http://localhost:4000';
        break;

    case 'ism-journal-server.herokuapp.com':
        APIURL = 'https://arcane-tor-58586.herokuapp.com/https://ism-journal-server.herokuapp.com'
    break;

    default:
        APIURL = 'https://arcane-tor-58586.herokuapp.com/https://ism-journal-server.herokuapp.com'
    break;

}

export default APIURL;