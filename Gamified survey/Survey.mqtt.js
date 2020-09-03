// SETUP MQTT ------------------------------------------
/*  der findes flere gratis brokers, som man kan bruge fra github*/
const broker = "influx.itu.dk";
const port = 9002; 
const secured = true; 
const topic="ituF2020/EXPD/Group31"; //Det topic, som der skal referes til. Det som gruppe kan abonneres på. Brug et topic, som er unikt. Bare husk at ænder toppic, så vi snakker sammen!
const myID = "id" + parseInt(Math.random() * 100000, 10); //Dette tilfælde er vores ID et tilfædligt nummer. Vi bruger det ikke så meget, vi kunne bruge det, hvis i ønsker at finde ud af, hvem der har sendt det.

// CONNECT ----------------------------------------------
//Vi connecter og sørger for at connecte til den rigtige - ikke tænk på dette)
let mqttClient = new Paho.MQTT.Client( broker, port, myID);

mqttClient.connect({onSuccess: onConnect, useSSL:secured});
mqttClient.onConnectionLost = conLost;
mqttClient.onMessageArrived = receiveMessage;

// MQTT Handler functions--------------------------------
// Vi skal ikke rode med funktionerne, men det er en call-back funktioner. Så 1) vi laver et ny connect, 2) hvis det lykkes, så kan vi abonnere på det.
function onConnect() 
{
	console.log("Connected");
	mqttClient.subscribe(topic); 
};

// Denne funktion gør, at vi laver en besked, som består af ID og den besked sendes videre i funktionen, ved at lave den om til stringify og det ender med at sende en besked, som er connected med et unikt ID og toppic.
function sendMQTT(message) 
{
	console.log("sending");
	let  mOBJ = {deviceID:myID, content:message};
	let mSend = new Paho.MQTT.Message(JSON.stringify(mOBJ));
	mSend.destinationName = topic;
	mqttClient.send(mSend);
};

// Denne funktion, må vi godt rører ved! Denne funktion udpakker den sendte besked, altså tekststrengen og så skriver den ud i consollen, hvad beskeden var. Her kan vi besluttet, hvad skal der ske med den modtagende besked.
function receiveMessage(message) 
{
	console.log("message received");
	let mUnpack = JSON.parse(message.payloadString);
	let senderID = mUnpack.deviceID; 
	let receivedMessage  = mUnpack.content;
  
    //do stuff with the message - her hvor vi skriver, hvad der skal ske med beskeden.
    console.log(receivedMessage);
    //Forsøger at gøre, så vi skifter farve på alle vores devicet, som har aboneret.
    document.bgColor = receiveMessage;


}

function conLost() 
{
	console.log("Lost connection");
}