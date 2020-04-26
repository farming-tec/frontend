import { hot } from 'react-hot-loader/root';
import React, { useEffect } from 'react';
import mqtt from 'mqtt'

const App = () => {
    useEffect(()=>{
        const host = MQTT_SERVICE

        const client = mqtt.connect(`${host.ws}://${host.name}:${host.port}/${host.ws}`, {
            port: host.port,
            clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
            username: "guestuser",
            password: "guestuser",
            rejectUnauthorized: false
        })

    }, []);

    return <div className="App">
        Hello World React!
    </div>
};

export default hot(App);