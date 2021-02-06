import React , { useState, useEffect }  from 'react'
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:5000";

function Test() {
    console.log(1);
    const [response, setResponse] = useState("");
    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on("FromAPI", data => {
            setResponse(data);
        });
    }, []);
    console.log(response);

    return (
        <div>
            
        </div>
    )
}

export default Test;