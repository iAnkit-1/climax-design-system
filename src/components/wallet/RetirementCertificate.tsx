import { format } from "date-fns";

interface RetirementCertificateData {
  certificateId: string;
  holderName: string;
  organization: string;
  quantity: number;
  reason: string;
  retirementDate: Date;
  blockchainHash: string;
}

export const generateRetirementCertificate = (data: RetirementCertificateData) => {
  const certificateHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Carbon Credit Retirement Certificate - ${data.certificateId}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    body {
      font-family: 'Georgia', serif;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
    }
    
    .certificate {
      background: white;
      max-width: 800px;
      width: 100%;
      padding: 60px;
      border: 3px solid #0D6E6E;
      box-shadow: 0 20px 60px rgba(0,0,0,0.15);
      position: relative;
    }
    
    .certificate::before {
      content: '';
      position: absolute;
      top: 20px;
      left: 20px;
      right: 20px;
      bottom: 20px;
      border: 1px solid #8FB43E;
      pointer-events: none;
    }
    
    .header {
      text-align: center;
      margin-bottom: 40px;
    }
    
    .logo {
      width: 80px;
      height: 80px;
      background: linear-gradient(135deg, #0D6E6E 0%, #8FB43E 100%);
      border-radius: 50%;
      margin: 0 auto 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 32px;
      font-weight: bold;
    }
    
    .title {
      font-size: 36px;
      color: #0D6E6E;
      text-transform: uppercase;
      letter-spacing: 4px;
      margin-bottom: 10px;
    }
    
    .subtitle {
      font-size: 14px;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 2px;
    }
    
    .content {
      text-align: center;
      margin: 40px 0;
    }
    
    .statement {
      font-size: 16px;
      color: #333;
      line-height: 1.8;
      margin-bottom: 30px;
    }
    
    .highlight {
      font-size: 48px;
      font-weight: bold;
      color: #8FB43E;
      margin: 20px 0;
    }
    
    .unit {
      font-size: 18px;
      color: #666;
    }
    
    .details {
      background: #f9fafb;
      padding: 30px;
      margin: 30px 0;
      border-radius: 8px;
    }
    
    .detail-row {
      display: flex;
      justify-content: space-between;
      padding: 12px 0;
      border-bottom: 1px solid #e5e7eb;
    }
    
    .detail-row:last-child {
      border-bottom: none;
    }
    
    .detail-label {
      color: #666;
      font-size: 14px;
    }
    
    .detail-value {
      color: #333;
      font-weight: 600;
      font-size: 14px;
      text-align: right;
      max-width: 60%;
      word-break: break-all;
    }
    
    .blockchain-section {
      background: linear-gradient(135deg, #0D6E6E 0%, #0a5555 100%);
      color: white;
      padding: 20px;
      margin: 30px 0;
      border-radius: 8px;
      text-align: center;
    }
    
    .blockchain-title {
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 1px;
      opacity: 0.8;
      margin-bottom: 10px;
    }
    
    .blockchain-hash {
      font-family: 'Courier New', monospace;
      font-size: 12px;
      word-break: break-all;
      background: rgba(255,255,255,0.1);
      padding: 10px;
      border-radius: 4px;
    }
    
    .footer {
      text-align: center;
      margin-top: 40px;
      padding-top: 30px;
      border-top: 2px solid #e5e7eb;
    }
    
    .seal {
      width: 100px;
      height: 100px;
      border: 3px solid #8FB43E;
      border-radius: 50%;
      margin: 0 auto 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #0D6E6E;
    }
    
    .seal-text {
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    
    .seal-icon {
      font-size: 24px;
      margin: 5px 0;
    }
    
    .signature-line {
      width: 200px;
      border-top: 1px solid #333;
      margin: 30px auto 10px;
    }
    
    .signature-text {
      font-size: 12px;
      color: #666;
    }
    
    .disclaimer {
      font-size: 10px;
      color: #999;
      margin-top: 30px;
      line-height: 1.6;
    }
    
    .qr-placeholder {
      width: 80px;
      height: 80px;
      background: #f0f0f0;
      margin: 20px auto;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      color: #999;
      border: 1px dashed #ccc;
    }
    
    @media print {
      body { background: white; }
      .certificate { box-shadow: none; }
    }
  </style>
</head>
<body>
  <div class="certificate">
    <div class="header">
      <div class="logo">C</div>
      <h1 class="title">Certificate of Retirement</h1>
      <p class="subtitle">Carbon Credits Permanently Retired</p>
    </div>
    
    <div class="content">
      <p class="statement">This certifies that</p>
      <h2 style="font-size: 24px; color: #0D6E6E; margin: 15px 0;">${data.holderName}</h2>
      <p class="statement">representing <strong>${data.organization}</strong></p>
      <p class="statement">has permanently retired</p>
      <div class="highlight">${data.quantity.toLocaleString()}</div>
      <p class="unit">tonnes of CO₂ equivalent (tCO₂e)</p>
    </div>
    
    <div class="details">
      <div class="detail-row">
        <span class="detail-label">Certificate ID</span>
        <span class="detail-value">${data.certificateId}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Retirement Date</span>
        <span class="detail-value">${format(data.retirementDate, "dd MMMM yyyy, HH:mm:ss")}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Purpose</span>
        <span class="detail-value">${data.reason || "Voluntary Carbon Offset"}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Registry</span>
        <span class="detail-value">ClimaX Carbon Registry (India)</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Standard</span>
        <span class="detail-value">Indian Carbon Market (ICM) Compliant</span>
      </div>
    </div>
    
    <div class="blockchain-section">
      <p class="blockchain-title">Blockchain Verification (Polygon Network)</p>
      <p class="blockchain-hash">${data.blockchainHash}</p>
    </div>
    
    <div class="footer">
      <div class="seal">
        <span class="seal-text">Verified</span>
        <span class="seal-icon">✓</span>
        <span class="seal-text">ClimaX</span>
      </div>
      
      <div class="signature-line"></div>
      <p class="signature-text">Authorized Signatory - ClimaX Registry</p>
      
      <div class="qr-placeholder">
        Scan QR to verify
      </div>
      
      <p class="disclaimer">
        This certificate confirms the permanent retirement of carbon credits from circulation.
        Retired credits cannot be transferred, sold, or used again. The retirement is recorded
        on the Polygon blockchain for immutable verification. For verification, visit
        polygonscan.com and search for the transaction hash above.
      </p>
    </div>
  </div>
</body>
</html>`;

  // Create blob and download
  const blob = new Blob([certificateHTML], { type: "text/html" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `Retirement-Certificate-${data.certificateId}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
};

export const generateCertificateId = () => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `RET-${timestamp}-${random}`;
};

export const generateBlockchainHash = () => {
  const chars = "0123456789abcdef";
  let hash = "0x";
  for (let i = 0; i < 64; i++) {
    hash += chars[Math.floor(Math.random() * chars.length)];
  }
  return hash;
};