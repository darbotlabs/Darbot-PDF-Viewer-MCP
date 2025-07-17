import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a very minimal but valid PDF for testing
const minimalPDF = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>
endobj
4 0 obj
<< /Length 44 >>
stream
BT /F1 12 Tf 100 700 Td (Hello World Test PDF) Tj ET
endstream
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000244 00000 n 
0000000338 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
408
%%EOF`;

// Save the PDF
const outputPath = path.join(__dirname, 'sample-pdfs', 'test-document.pdf');
fs.writeFileSync(outputPath, minimalPDF);
console.log('Created test-document.pdf');

// Create a simple text file to test error handling
const textContent = "This is a text file, not a PDF. Used for testing error handling.";
const textPath = path.join(__dirname, 'sample-pdfs', 'not-a-pdf.txt');
fs.writeFileSync(textPath, textContent);
console.log('Created not-a-pdf.txt for error testing');