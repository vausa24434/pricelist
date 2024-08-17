import React, { useEffect, useState } from 'react';
import { $msg, Strophe } from 'strophe.js';

const ChatS = () => {
  const [connection, setConnection] = useState(null);
  const [status, setStatus] = useState('Connecting...');
  const BOSH_SERVICE = 'https://muvausastore.vercel.app/http-bind/';

  useEffect(() => {
    const conn = new Strophe.Connection(BOSH_SERVICE);
    setConnection(conn);

    conn.connect('iwak@jabbim.com', 'Doltopup1', (status) => {
      if (status === Strophe.Status.CONNECTING) {
        setStatus('Connecting...');
      } else if (status === Strophe.Status.CONNFAIL) {
        setStatus('Failed to connect.');
      } else if (status === Strophe.Status.AUTHFAIL) {
        setStatus('Authentication failed.');
      } else if (status === Strophe.Status.CONNECTED) {
        setStatus('Connected!');
        conn.send($pres().tree()); // Mengirim presence setelah terhubung

        // Menangani pesan masuk
        conn.addHandler((message) => {
          const from = message.getAttribute('from');
          const body = message.getElementsByTagName('body')[0]?.textContent;
          console.log(`Pesan dari ${from}: ${body}`);
          return true;
        }, null, 'message', 'chat');
      } else if (status === Strophe.Status.DISCONNECTED) {
        setStatus('Disconnected.');
      }
    });

    // Membersihkan koneksi saat komponen di-unmount
    return () => {
      conn.disconnect();
    };
  }, [BOSH_SERVICE]);

  const sendMessage = () => {
    if (connection) {
      const message = $msg({
        to: 'jabber1@digiflazz.net',
        type: 'chat'
      }).c('body').t('Halo, ini pesan dari React.js!');

      connection.send(message.tree());
    }
  };

  return (
    <div>
      <h1>Status: {status}</h1>
      <button onClick={sendMessage} disabled={!connection || status !== 'Connected!'}>
        Kirim Pesan
      </button>
    </div>
  );
};

export default ChatS;
