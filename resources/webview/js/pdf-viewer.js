// PDF Viewer JavaScript
(function() {
    const vscode = acquireVsCodeApi();
    let currentZoom = 100;
    
    function zoomIn() {
        currentZoom = Math.min(currentZoom + 25, 500);
        updateZoom();
    }
    
    function zoomOut() {
        currentZoom = Math.max(currentZoom - 25, 25);
        updateZoom();
    }
    
    function fitToPage() {
        currentZoom = 100;
        updateZoom();
    }
    
    function updateZoom() {
        const zoomLevelElement = document.getElementById('zoomLevel');
        const pdfObject = document.getElementById('pdfObject');
        
        if (zoomLevelElement) {
            zoomLevelElement.textContent = currentZoom + '%';
        }
        
        if (pdfObject) {
            pdfObject.style.transform = 'scale(' + (currentZoom / 100) + ')';
            pdfObject.style.transformOrigin = 'center top';
        }
    }
    
    function downloadPdf() {
        // The PDF URL will be injected by the provider
        const pdfObject = document.getElementById('pdfObject');
        if (pdfObject && pdfObject.data) {
            const link = document.createElement('a');
            link.href = pdfObject.data;
            link.download = '';
            link.click();
        }
    }
    
    // Initialize
    document.addEventListener('DOMContentLoaded', function() {
        vscode.postMessage({
            command: 'log',
            text: 'PDF viewer initialized'
        });
    });
    
    // Expose functions globally for onclick handlers
    window.zoomIn = zoomIn;
    window.zoomOut = zoomOut;
    window.fitToPage = fitToPage;
    window.downloadPdf = downloadPdf;
})();