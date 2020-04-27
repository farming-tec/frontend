import { hot } from 'react-hot-loader/root';
import React, { useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import mqtt from 'mqtt'
import { Home  } from './pages/Home'
import { Hola  } from './pages/Hola'
import { Sensor  } from './pages/Sensor'

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

        const topic = 'myfirsttopic';
        const topic2 = 'myfirsttopic2';

        client.on('connect', () => {
            client.subscribe(topic, (e)=>{
                if(!e) console.log("Subscribed", topic);
            })
            client.subscribe(topic2, (e)=>{
                if(!e) console.log("Subscribed");
            })

            client.publish(topic, 'Hola mundo');
        });

        
        client.on("message", (tc, msg) =>{
            if(tc === topic) console.log(msg.toString());
        });


    }, []);

    return <Router>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/hola">Hello!</Link></li>
            <li><Link to="/sensors">Sensores</Link></li>
        </ul>
        
        <Switch>
            <Route path="/hola">
                <Hola />
            </Route>
            <Route path="/sensors">
                <Sensor />
            </Route>
            <Route path="/">
                <Home />
            </Route>
        </Switch>
    </Router>
    
};

export default hot(App);