import React, { useState } from 'react';
import axios from 'axios';

const QRISDinamisToStatis = () => {
  const [qris, setQris] = useState('');
  const [qty, setQty] = useState('');
  const [fee, setFee] = useState('n');
  const [tipe, setTipe] = useState('p');
  const [admin, setAdmin] = useState('');
  const [img, setImg] = useState('');
  const token = 'QWNA7R8sxgNmA';

  const refresh = () => {
    window.location.reload();
  };

  const handleFeeChange = (val) => {
    setFee(val);
  };

  const handleFileChange = async (event) => {
    const formData = new FormData();
    formData.append('file', event.target.files[0]);

    try {
      setImg('<h1>Mohon ditunggu</h1>');
      const response = await axios.post(`file.php?csrf=${token}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setQris(response.data);
      setImg('');
    } catch (error) {
      alert('Terjadi kesalahan dalam mengupload file.');
      setImg('');
    }
  };

  const createQris = async () => {
    if (qty === '' || qris === '') {
      alert('Qris data dan Nominal tidak boleh kosong');
    } else if (parseInt(qty, 10) >= 10000) {
      try {
        setImg('<h1>Mohon tunggu...</h1>');
        const response = await axios.post('qris.php', {
          csrf: token,
          qris,
          qty,
          fee,
          tipe,
          admin,
        });
        setImg(response.data);
        window.scrollTo(0, document.body.scrollHeight);
      } catch (error) {
        setImg('<h1>Permintaan tidak valid, Silahkan refresh halaman</h1>');
      }
    } else {
      alert('Minimal Nominal adalah 10k');
    }
  };

  return (
    <>
    <div className="container">
      <form>
        <div className="mb-3">
          <label htmlFor="file" className="form-label">
            Qris
          </label>
          <input type="file" id="file" className="form-control" onChange={handleFileChange} />
          <div id="emailHelp" className="form-text">
            Silahkan upload Qris kamu
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="qris" className="form-label">
            Qris Data
          </label>
          <input
            type="text"
            id="qris"
            value={qris}
            placeholder="data text Qris"
            className="form-control"
            onChange={(e) => setQris(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="qty" className="form-label">
            Nominal
          </label>
          <input
            type="number"
            className="form-control"
            placeholder="Nominal Transaksi"
            id="qty"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="fee" className="form-label">
            Fee Transaksi
          </label>
          <select
            id="fee"
            className="form-control"
            value={fee}
            onChange={(e) => handleFeeChange(e.target.value)}
          >
            <option value="y">YA</option>
            <option value="n">Tidak</option>
          </select>
        </div>
        {fee === 'y' && (
          <div id="fetrx">
            <div className="mb-3">
              <label htmlFor="tipe" className="form-label">
                Tipe Fee Transaksi
              </label>
              <select
                id="tipe"
                className="form-control"
                value={tipe}
                onChange={(e) => setTipe(e.target.value)}
              >
                <option value="p">Persen</option>
                <option value="r">Rupiah</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="admin" className="form-label">
                Biaya Admin
              </label>
              <input
                type="number"
                id="admin"
                className="form-control"
                value={admin}
                onChange={(e) => setAdmin(e.target.value)}
              />
            </div>
          </div>
        )}
        <button type="button" onClick={createQris} className="btn btn-success">
          Submit
        </button>
        <button type="button" onClick={refresh} className="btn btn-primary">
          Refresh
        </button>
      </form>
      <input type="hidden" id="token" value={token} />
      <div className="mb-3">
        <div id="img" dangerouslySetInnerHTML={{ __html: img }}></div>
      </div>
    </div>




    
    </>
    
    
  );
};

export default QRISDinamisToStatis;
