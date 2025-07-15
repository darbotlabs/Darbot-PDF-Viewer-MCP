#!/usr/bin/env node

/**
 * Create sample PDF files for testing
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create simple PDF content using basic PDF structure
function createSimplePDF(content, title = 'Test Document') {
    return `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
/Resources <<
/Font <<
/F1 5 0 R
>>
>>
>>
endobj

4 0 obj
<<
/Length ${content.length + 100}
>>
stream
BT
/F1 12 Tf
50 750 Td
(${title}) Tj
0 -20 Td
(${content}) Tj
ET
endstream
endobj

5 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
endobj

xref
0 6
0000000000 65535 f 
0000000010 00000 n 
0000000053 00000 n 
0000000125 00000 n 
0000000229 00000 n 
0000000435 00000 n 
trailer
<<
/Size 6
/Root 1 0 R
>>
startxref
510
%%EOF`;
}

// Create sample PDFs
const samplePDFs = [
    {
        name: 'simple-text.pdf',
        title: 'Simple Text Document',
        content: 'This is a simple test document with basic text content. It contains multiple sentences for testing text extraction functionality. The document has enough content to test various processing features.'
    },
    {
        name: 'multi-page.pdf',
        title: 'Multi-Page Document',
        content: 'Page 1 content: This is the first page of a multi-page document.\\nPage 2 content: This is the second page with different content.\\nPage 3 content: Final page with conclusion text.'
    },
    {
        name: 'table-document.pdf',
        title: 'Document with Tables',
        content: 'Name\\tAge\\tCity\\nJohn Doe\\t30\\tNew York\\nJane Smith\\t25\\tLos Angeles\\nTotal Records: 2'
    }
];

// Create output directory
const outputDir = path.join(__dirname, 'sample-pdfs');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Generate sample PDFs
for (const pdf of samplePDFs) {
    const pdfContent = createSimplePDF(pdf.content, pdf.title);
    const outputPath = path.join(outputDir, pdf.name);
    
    try {
        fs.writeFileSync(outputPath, pdfContent);
        console.log(`✅ Created sample PDF: ${pdf.name}`);
    } catch (error) {
        console.error(`❌ Failed to create ${pdf.name}:`, error.message);
    }
}

console.log('\n📁 Sample PDFs created in:', outputDir);