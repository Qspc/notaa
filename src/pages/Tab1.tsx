import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import { useState } from 'react';

const Tab1: React.FC = () => {
  const [data, setData]: any[] = useState([]);
  //   const sum = data.nominal.reduce((partialSum, a) => partialSum + a, 0);
  const [kebutuhan, setKebutuhan] = useState('');
  const [nominal, setNominal] = useState('');
  const [updateNominal, setUpdateNominal] = useState('');
  const [pickIndex, setPickIndex] = useState(99);
  const [showInput, setShowInput] = useState(true);
  const [hideUpdate, setHideUpdate] = useState(true);
  const handleInput = () => {
    setShowInput(!showInput);
  };
  const handleSubmit = () => {
    if (kebutuhan === '' || nominal === '') {
      return;
    }
    const newData: any = [
      ...data,
      {
        kebutuhan: kebutuhan,
        nominal: nominal,
      },
    ];
    setKebutuhan('');
    setNominal('');
    setShowInput(!showInput);
    setData(newData);
  };
  const handleShowUpdate = (id: any) => {
    setHideUpdate(!hideUpdate);
    setPickIndex(id);
  };
  const handleUpdate = (id: any) => {
    if (Number(updateNominal) === 40000) {
      return;
    } else {
      const newData = [...data];
      newData[id].nominal = Number(updateNominal) + Number(newData[id].nominal);
      setData(newData);

      setHideUpdate(!hideUpdate);
      setUpdateNominal('');
      setPickIndex(99);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div>
          <div className="section-1">
            <div style={{ margin: '10px 0px' }}>
              <button className="button" type="button" style={{ marginBottom: '1rem' }} onClick={handleInput}>
                Tambah Keperluan
              </button>
            </div>
            <div style={{ display: showInput ? 'none' : '' }}>
              <input style={{ marginRight: '10px' }} className="input" type="text" value={kebutuhan} onChange={(e) => setKebutuhan(e.target.value)} placeholder="Keperluan" />
              <input style={{ marginRight: '10px' }} className="input" type="number" value={nominal} onChange={(e) => setNominal(e.target.value)} placeholder="Nominal" />
              <button style={{ margin: '0.5rem 10rem 0rem 0rem' }} className="button" type="button" onClick={handleSubmit}>
                Tambahkan
              </button>
            </div>
          </div>

          <div className="section-2">
            {data.length === 0 ? (
              <div style={{ fontWeight: 'bold', fontSize: '28px' }}>Data kosong</div>
            ) : (
              <>
                <table style={{ marginBottom: '1rem' }}>
                  <thead>
                    <tr style={{}}>
                      <td id="padding">Keperluan</td>
                      <td id="padding">Nominal</td>
                      <td id="padding">Persentase</td>
                      <td id="padding">Action</td>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item: any, index: any) => (
                      <tr key={index} style={{}}>
                        <td id="padding"> {item.kebutuhan} </td>
                        <td id="padding"> {item.nominal} </td>
                        <td id="padding"> {((item.nominal / data.reduce((a: any, v: any) => (a = a + Number(v.nominal)), 0)) * 100).toFixed(2)}%</td>
                        <td id="padding">
                          <button className="button" type="button" style={{ display: Number(pickIndex) !== index ? '' : 'none', position: 'absolute' }} onClick={() => handleShowUpdate(index)}>
                            update
                          </button>
                          <input
                            className="input-2"
                            style={{ visibility: hideUpdate === true || Number(pickIndex) !== index ? 'hidden' : 'visible' }}
                            value={updateNominal}
                            onChange={(e) => setUpdateNominal(e.target.value)}
                            placeholder="Tambahkan nominal"
                            type="number"
                          />
                          <button className="button" style={{ visibility: hideUpdate === true || Number(pickIndex) !== index ? 'hidden' : 'visible', marginTop: '0.5rem' }} type="button" onClick={() => handleUpdate(index)}>
                            Tambahkan
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div>
                  <strong> Total:</strong> {data.reduce((a: number, v: any) => (a = a + Number(v.nominal)), 0)}
                </div>
              </>
            )}
          </div>
        </div>

        {/* <ExploreContainer name="Tab 1 page" /> */}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
