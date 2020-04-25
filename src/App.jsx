import { hot } from 'react-hot-loader/root';
import React, { useEffect } from 'react';
import mqtt from 'mqtt'

const App = () => {
    useEffect(()=>{
        console.log("Loaded");

        // const client = mqtt.connect('ws://localhost:15675/ws');
        // const client = mqtt.connect('ws://localhost:15675/ws');
        // const client = mqtt.connect('ws://172.31.255.8:15675/ws');
        // const client = mqtt.connect('ws://localhost:15675/ws', {
        const client = mqtt.connect('wss://172.31.255.8:15673/ws', {
            port: 15673,
            clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
            username: "guestuser",
            password: "guestuser",
            rejectUnauthorized: false
        })

        const topic = 'world';

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
        Hello World React!
    </div>
};

export default hot(App);