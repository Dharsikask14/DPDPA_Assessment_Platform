const brandName = "Hackers Infotech";
const brandLine = "360° Cyber defence for digital Landscape";

export function generateCertificateId() {
  const stamp = new Date().toISOString().replace(/\D/g, "").slice(0, 14);
  const random = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `DPDPA-${stamp}-${random}`;
}

export async function downloadCertificate({ details, roleLabel, results, logoSrc, certificateId }) {
  const doc = await buildCertificatePdf({ details, roleLabel, results, logoSrc, certificateId });
  doc.save(`DPDPA-Certificate-${slug(details.name)}-${certificateId}.pdf`);
}

export async function downloadReport({ details, roleLabel, results, certificateId }) {
  const doc = await buildReportPdf({ details, roleLabel, results, certificateId });
  doc.save(`DPDPA-Report-${slug(details.name)}-${certificateId}.pdf`);
}

export async function prepareEmailPackage({ details, roleLabel, results, logoSrc, certificateId }) {
  await downloadCertificate({ details, roleLabel, results, logoSrc, certificateId });

  const subject = encodeURIComponent(`DPDPA Assessment Certificate - ${certificateId}`);
  const body = encodeURIComponent(
    `Dear ${details.name},\n\nYour DPDPA assessment certificate has been generated.\n\nCertificate ID: ${certificateId}\nAssessment: ${roleLabel}\nScore: ${results.score}%\nGrade: ${results.grade}\nStatus: ${results.status}\n\nPlease attach the downloaded certificate PDF before sending. Browser-only React cannot attach files automatically without a backend email service.\n\nRegards,\n${brandName}`
  );

  window.location.href = `mailto:${details.email}?subject=${subject}&body=${body}`;
}

async function buildCertificatePdf({ details, roleLabel, results, logoSrc, certificateId }) {
  const [{ default: jsPDF }, { default: QRCode }] = await Promise.all([import("jspdf"), import("qrcode")]);
  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const today = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const qrPayload = getCertificatePayload({ details, roleLabel, results, certificateId });
  const qrDataUrl = await QRCode.toDataURL(qrPayload, { margin: 1, width: 220 });

  // Premium Background
  doc.setFillColor(252, 253, 255);
  doc.rect(0, 0, pageWidth, pageHeight, "F");

  // Sophisticated Corner Accents
  doc.setFillColor(30, 58, 138); // Deep Navy
  doc.triangle(0, 0, 60, 0, 0, 60, "F");
  doc.triangle(pageWidth, pageHeight, pageWidth - 60, pageHeight, pageWidth, pageHeight - 60, "F");
  
  doc.setFillColor(59, 130, 246); // Primary Blue
  doc.triangle(pageWidth, 0, pageWidth - 40, 0, pageWidth, 40, "F");
  doc.triangle(0, pageHeight, 40, pageHeight, 0, pageHeight - 40, "F");

  // Double Border Frame
  doc.setDrawColor(30, 58, 138);
  doc.setLineWidth(1.5);
  doc.rect(10, 10, pageWidth - 20, pageHeight - 20);
  
  doc.setDrawColor(191, 219, 254);
  doc.setLineWidth(0.5);
  doc.rect(12, 12, pageWidth - 24, pageHeight - 24);

  // Decorative Patterns
  addProfessionalPattern(doc, pageWidth, pageHeight);

  // Logo Placeholder - Smaller HI box
  const logoSize = 22;
  const logoY = 22;
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(pageWidth / 2 - logoSize/2, logoY, logoSize, logoSize, 4, 4, "F");
  doc.setDrawColor(59, 130, 246);
  doc.setLineWidth(0.6);
  doc.roundedRect(pageWidth / 2 - logoSize/2, logoY, logoSize, logoSize, 4, 4);
  
  doc.setTextColor(30, 58, 138);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("HI", pageWidth / 2, logoY + 14, { align: "center" });

  // Brand Header
  doc.setTextColor(17, 24, 39);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text(brandName.toUpperCase(), pageWidth / 2, 55, { align: "center" });
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(107, 114, 128);
  doc.text(brandLine, pageWidth / 2, 62, { align: "center" });

  // Certificate Title Area
  doc.setTextColor(30, 58, 138);
  doc.setFont("times", "bold");
  doc.setFontSize(36);
  doc.text("CERTIFICATE", pageWidth / 2, 85, { align: "center" });
  doc.setFontSize(16);
  doc.setFont("times", "italic");
  doc.text("of Achievement", pageWidth / 2, 93, { align: "center" });

  // QR Code on the Right with Layout (Frame)
  const qrX = pageWidth / 2 + 75;
  const qrY = 70;
  const qrSize = 28;
  doc.setFillColor(255, 255, 255);
  doc.rect(qrX - 2, qrY - 2, qrSize + 4, qrSize + 4, "F");
  doc.setDrawColor(191, 219, 254);
  doc.setLineWidth(0.5);
  doc.rect(qrX - 2, qrY - 2, qrSize + 4, qrSize + 4);
  doc.addImage(qrDataUrl, "PNG", qrX, qrY, qrSize, qrSize);
  doc.setFontSize(6);
  doc.setTextColor(107, 114, 128);
  doc.text("SCAN TO VERIFY", qrX + qrSize / 2, qrY + qrSize + 4, { align: "center" });

  // Recipient Area
  doc.setTextColor(17, 24, 39);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(13);
  doc.text("PROUDLY PRESENTED TO", pageWidth / 2, 112, { align: "center" });

  doc.setTextColor(30, 58, 138);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(28);
  doc.text(details.name.toUpperCase(), pageWidth / 2, 128, { align: "center", charSpace: 1.5 });

  // Divider
  doc.setDrawColor(59, 130, 246);
  doc.setLineWidth(0.4);
  doc.line(pageWidth / 2 - 40, 132, pageWidth / 2 + 40, 132);

  // Completion Text
  // Completion Text
  doc.setTextColor(17, 24, 39);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  const desc = `For successfully completing the DPDPA Assessment.`;
  doc.text(desc, pageWidth / 2, 145, { align: "center" });

  // Performance Score Line - With layout (pill background)
  const scoreText = `SCORE: ${results.score}%    |    GRADE: ${results.grade}    |    STATUS: ${results.status}`;
  doc.setFillColor(243, 244, 246);
  doc.roundedRect(pageWidth / 2 - 65, 153, 130, 8, 2, 2, "F");
  doc.setTextColor(30, 58, 138);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text(scoreText, pageWidth / 2, 158.5, { align: "center" });

  // Signature / Date Area
  doc.setTextColor(17, 24, 39);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setDrawColor(17, 24, 39);
  doc.setLineWidth(0.5);

  // Date of Issue (Left)
  const leftX = pageWidth / 4 + 10;
  const bottomY = 185;
  doc.line(leftX - 25, bottomY - 5, leftX + 25, bottomY - 5);
  doc.text("Date of Issue", leftX, bottomY, { align: "center" });
  doc.setFont("helvetica", "bold");
  doc.text(today, leftX, bottomY - 8, { align: "center" });

  // Authorized Signatory (Right)
  const rightX = (pageWidth / 4) * 3 - 10;
  doc.line(rightX - 25, bottomY - 5, rightX + 25, bottomY - 5);
  doc.text("Authorized Signatory", rightX, bottomY, { align: "center" });
  doc.setFont("helvetica", "bold");
  doc.setTextColor(30, 58, 138);
  doc.setFontSize(10);
  doc.text(brandName.toUpperCase(), rightX, bottomY - 8, { align: "center" });

  // Metadata Footer - One line
  doc.setTextColor(107, 114, 128);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  const metadataText = `Certificate ID: ${certificateId}    |    Organization: ${details.company || "Individual participant"}`;
  doc.text(metadataText, 20, pageHeight - 12);

  return doc;
}

function addProfessionalPattern(doc, pageWidth, pageHeight) {
  doc.setDrawColor(219, 234, 254);
  doc.setLineWidth(0.05); // Reduced thickness
  for (let i = 0; i < pageWidth; i += 20) {
    doc.line(i, 0, i, pageHeight);
  }
  for (let i = 0; i < pageHeight; i += 20) {
    doc.line(0, i, pageWidth, i);
  }
  
  doc.setDrawColor(239, 246, 255);
  doc.setLineWidth(0.5); // Reduced thickness
  doc.circle(20, 20, 50);
  doc.circle(pageWidth - 20, pageHeight - 20, 50);
}

async function buildReportPdf({ details, roleLabel, results, certificateId }) {
  const { default: jsPDF } = await import("jspdf");
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 16;
  let y = 18;

  const addHeader = () => {
    doc.setFillColor(30, 58, 138);
    doc.rect(0, 0, pageWidth, 24, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text("DPDPA Assessment Report", margin, 15);
    doc.setFontSize(8);
    doc.text(certificateId, pageWidth - margin, 15, { align: "right" });
    doc.setTextColor(17, 24, 39);
    y = 36;
  };

  const ensureSpace = (needed = 20) => {
    if (y + needed > 282) {
      doc.addPage();
      addHeader();
    }
  };

  addHeader();
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text(`${details.name} | ${roleLabel}`, margin, y);
  y += 8;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  [
    `Email: ${details.email}`,
    `Contact: +91 ${details.phone}`,
    `Company: ${details.company || "Individual"}`,
    `Score: ${results.score}% | Grade: ${results.grade} | Status: ${results.status}`,
  ].forEach((line) => {
    doc.text(line, margin, y);
    y += 6;
  });

  y += 10;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("SECTION SCORES", margin, y);
  y += 8;

  results.sections.forEach((section) => {
    ensureSpace(15);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(`${section.title}: ${section.score}%`, margin, y);
    
    // Progress Bar
    doc.setFillColor(243, 244, 246);
    doc.rect(margin, y + 2, 100, 3, "F");
    doc.setFillColor(59, 130, 246);
    doc.rect(margin, y + 2, 100 * (section.score / 100), 3, "F");
    
    y += 12;
  });

  y += 5;
  ensureSpace(20);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("CRITICAL WARNINGS & RECOMMENDATIONS", margin, y);
  y += 8;

  if (!results.warnings.length) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text("No critical warnings found. Your cyber hygiene practices are within acceptable limits.", margin, y);
    return doc;
  }

  results.warnings.forEach((item, index) => {
    const lines = [
      `${index + 1}. ${item.section}: ${item.question}`,
      `ISSUE: ${item.warning}`,
      `ACTION: ${item.action}`,
    ];

    lines.forEach((line, lineIndex) => {
      const split = doc.splitTextToSize(line, pageWidth - margin * 2);
      ensureSpace(split.length * 5 + 2);
      doc.setFont("helvetica", lineIndex === 0 ? "bold" : "normal");
      doc.setFontSize(8.5);
      if (lineIndex > 0) doc.setTextColor(75, 85, 99);
      else doc.setTextColor(17, 24, 39);
      
      doc.text(split, margin, y);
      y += split.length * 5;
    });
    y += 4;
  });

  return doc;
}

function getCertificatePayload({ details, roleLabel, results, certificateId }) {
  return [
    `ID: ${certificateId}`,
    `NAME: ${details.name}`,
    `ASSESSMENT: ${roleLabel}`,
    `SCORE: ${results.score}%`,
    `ISSUER: ${brandName}`,
  ].join("\n");
}

function slug(value) {
  return value.trim().replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "") || "participant";
}
