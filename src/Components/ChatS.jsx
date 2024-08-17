import React, { useEffect, useState } from 'react';
import { client } from '@xmpp/client';
import xml from '@xmpp/xml';

function JabberClient() {
  const [isConnected, setIsConnected] = useState(false);
  const [messageToSend, setMessageToSend] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const xmppClient = client({
      service: 'wss://jabbim.com:5281/xmpp-websocket', // URL WebSocket server pengirim
      domain: 'jabbim.com', // Domain server pengirim
      resource: 'react-client', // Nama resource (bebas)
      username: 'iwak',
      password: 'Doltopup1', // Password akun pengirim
    });

    xmppClient.on('online', (address) => {
      console.log(`Connected as ${address}`);
      setIsConnected(true);
    });

    xmppClient.on('message', (msg) => {
      const body = msg.getChildText('body');
      if (body) {
        setMessages((prevMessages) => [...prevMessages, body]);
      }
    });

    xmppClient.on('error', (err) => {
      console.error('Connection Error:', err);
    });

    xmppClient.start().catch(console.error);

    return () => {
      xmppClient.stop().catch(console.error);
    };
  }, []);

  const sendMessage = async () => {
    if (isConnected && messageToSend) {
      const message = xml(
        'message',
        { type: 'chat', to: 'jabber1@digiflazz.net' }, // Tujuan penerima
        xml('body', {}, messageToSend)
      );
      xmppClient.send(message);
      setMessages((prevMessages) => [...prevMessages, messageToSend]);
      setMessageToSend('');
    }
  };

  return (
    <div>
      <h1>XMPP Client</h1>
      {isConnected ? (
        <div>
          <p>Connected to Jabber server as iwak@jabbim.com!</p>
          <div>
            <input
              type="text"
              value={messageToSend}
              onChange={(e) => setMessageToSend(e.target.value)}
              placeholder="Type a message"
            />
            <button onClick={sendMessage}>Send</button>
          </div>
          <ul>
            {messages.map((message, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Connecting...</p>
      )}
    </div>
  );
}

export default JabberClient;
