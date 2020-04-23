import { hot } from 'react-hot-loader/root';
import React, { useEffect } from 'react';
import mqtt from 'mqtt'

const App = () => {
    useEffect(()=>{
        console.log("Loaded");
        // const client  = mqtt.connect('ws://localhost:15675/ws');
        // const host = 'localhost:15675/ws'
        // const client = mqtt.connect('ws://localhost:15675/ws', {
        const client = mqtt.connect('ws://172.31.255.8:15675/ws', {
            port: 15675,
            clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
            username: "guestuser",
            password: "guestuser"
        })
        // const client  = mqtt.connect('mqtt://broker.mqttdashboard.com:1883');
        const topic = 'hola';

        client.on('connect', function () {
            console.log("suscribed")

            client.subscribe(topic, err=> {
              if (!err) {
                client.publish(topic, 'presence of react')
              }
            })
        });

        client.on('message', function (topic, message) {
            console.log('arrived:', topic, message.toString())
        });

    }, []);

    return <div className="App">
        Hello World from React!
    </div>
};

export default hot(App);