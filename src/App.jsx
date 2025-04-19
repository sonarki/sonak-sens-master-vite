import { useState } from 'react';

const dpiList = [400, 800, 1200, 1600, 3200];

export default function SonakSensMaster() {
  const [baseDpi, setBaseDpi] = useState(400);
  const [sens, setSens] = useState({
    general: '',
    vertical: '',
    ads: '',
    scope: '',
  });
  const [adjustADS, setAdjustADS] = useState(true);

  const handleInput = (e) => {
    setSens({ ...sens, [e.target.name]: e.target.value });
  };

  const calculate = (targetDpi) => {
    const g = parseFloat(sens.general) || 0;
    const v = parseFloat(sens.vertical) || 1;
    const a = parseFloat(sens.ads) || 0;
    const s = parseFloat(sens.scope) || 0;
    const dpiRatio = baseDpi / targetDpi;

    const newG = (g * dpiRatio).toFixed(2);
    const newS = (s * (v !== 0 ? (1 / v) : 1) * dpiRatio).toFixed(2);
    const newA = adjustADS ? (a * (1 + ((1 / v - 1) * 0.3)) * dpiRatio).toFixed(2) : (a * dpiRatio).toFixed(2);

    return { dpi: targetDpi, general: newG, ads: newA, scope: newS };
  };

  const result = dpiList.map((dpi) => calculate(dpi));

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '1rem' }}>
        소낙의 감도사
      </h1>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
        {dpiList.map((dpi) => (
          <button
            key={dpi}
            onClick={() => setBaseDpi(dpi)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              border: '1px solid #ccc',
              backgroundColor: baseDpi === dpi ? '#3B82F6' : '#fff',
              color: baseDpi === dpi ? '#fff' : '#000',
              cursor: 'pointer',
            }}
          >
            {dpi} DPI
          </button>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
        <input name="general" value={sens.general} onChange={handleInput} placeholder="일반 감도" />
        <input name="vertical" value={sens.vertical} onChange={handleInput} placeholder="수직 감도" />
        <input name="ads" value={sens.ads} onChange={handleInput} placeholder="조준 감도" />
        <input name="scope" value={sens.scope} onChange={handleInput} placeholder="스코프 감도" />
      </div>
      <label style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
        <input type="checkbox" checked={adjustADS} onChange={(e) => setAdjustADS(e.target.checked)} />
        <span style={{ marginLeft: '0.5rem' }}>조준 감도에 30%만 체감 보정 적용하기</span>
      </label>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
        <thead style={{ backgroundColor: '#f3f4f6' }}>
          <tr>
            <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>DPI</th>
            <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>일반 감도</th>
            <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>조준 감도</th>
            <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>스코프 감도</th>
          </tr>
        </thead>
        <tbody>
          {result.map((row) => (
            <tr key={row.dpi}>
              <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{row.dpi}</td>
              <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{row.general}</td>
              <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{row.ads}</td>
              <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{row.scope}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}