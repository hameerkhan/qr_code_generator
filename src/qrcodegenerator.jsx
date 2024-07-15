// src/QrCodeGenerator.js

import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import { saveAs } from 'file-saver';
import { ChromePicker } from 'react-color';

const QrCodeGenerator = () => {
  const [inputText, setInputText] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState(null);
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [size, setSize] = useState(256);
  const [errorCorrectionLevel, setErrorCorrectionLevel] = useState('L');
  const [gradient, setGradient] = useState(false);
//   const [gradientType, setGradientType] = useState('linear');
  const [gradientColors, setGradientColors] = useState({
    color1: '#000000',
    color2: '#ffffff',
  });

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  const generateQRCode = () => {
    if (inputText.trim()) {
      setQrCodeUrl(
        <QRCode
          value={inputText}
          size={size}
          fgColor={fgColor}
          bgColor={bgColor}
          level={errorCorrectionLevel}
          style={{
            backgroundImage: gradient
              ? `${gradientType}-gradient(${gradientColors.color1}, ${gradientColors.color2})`
              : 'none',
          }}
        />
      );
    }
  };

  const downloadQRCode = (format) => {
    const canvas = document.querySelector('canvas');
    canvas.toBlob((blob) => {
      saveAs(blob, `qrcode.${format}`);
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(inputText);
    alert('Text copied to clipboard!');
  };

  return (
    <div className="App">
      <h1>QR Code Generator</h1>
      <input
        type="text"
        value={inputText}
        onChange={handleChange}
        placeholder="Enter text or URL"
      />
      <div className="color-input-label">
        <label>Foreground Color</label>
        <ChromePicker
          color={fgColor}
          onChangeComplete={(color) => setFgColor(color.hex)}
        />
      </div>
      <div className="color-input-label">
        <label>Background Color</label>
        <ChromePicker
          color={bgColor}
          onChangeComplete={(color) => setBgColor(color.hex)}
        />
      </div>
      <input
        type="number"
        value={size}
        onChange={(e) => setSize(e.target.value)}
        placeholder="Size (e.g., 256)"
        min="50"
        max="1000"
      />
      <select
        value={errorCorrectionLevel}
        onChange={(e) => setErrorCorrectionLevel(e.target.value)}
      >
        <option value="L">Low</option>
        <option value="M">Medium</option>
        <option value="Q">Quartile</option>
        <option value="H">High</option>
      </select>
      <div className="color-input-label">
        <label>Use Gradient?</label>
        <input
          type="checkbox"
          checked={gradient}
          onChange={() => setGradient(!gradient)}
        />
      </div>
      {gradient && (
        <>
          <div className="color-input-label">
            <label>Gradient Type</label>
            <select
              value={gradientType}
              onChange={(e) => setGradientType(e.target.value)}
            >
              <option value="linear">Linear</option>
              <option value="radial">Radial</option>
            </select>
          </div>
          <div className="color-input-label">
            <label>Color 1</label>
            <ChromePicker
              color={gradientColors.color1}
              onChangeComplete={(color) =>
                setGradientColors({ ...gradientColors, color1: color.hex })
              }
            />
          </div>
          <div className="color-input-label">
            <label>Color 2</label>
            <ChromePicker
              color={gradientColors.color2}
              onChangeComplete={(color) =>
                setGradientColors({ ...gradientColors, color2: color.hex })
              }
            />
          </div>
        </>
      )}
      <button onClick={generateQRCode}>Generate QR Code</button>
      {qrCodeUrl && (
        <div className="qr-code-container">
          {qrCodeUrl}
        </div>
      )}
      {qrCodeUrl && (
        <div>
          <span className="download-button" onClick={() => downloadQRCode('png')}>
            Download PNG
          </span>
          {' | '}
          <span className="download-button" onClick={() => downloadQRCode('svg')}>
            Download SVG
          </span>
          {' | '}
          <span className="copy-button" onClick={copyToClipboard}>
            Copy Text
          </span>
        </div>
      )}
    </div>
  );
};

export default QrCodeGenerator;
