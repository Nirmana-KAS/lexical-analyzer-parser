import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';

export const exportParseTreeToPDF = async (
  elementId: string, 
  expression: string,
  filename: string = 'parse-tree.pdf'
) => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error('Element not found');
    return;
  }

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: '#ffffff',
      logging: false,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
      unit: 'px',
      format: [canvas.width + 40, canvas.height + 100]
    });
    
    // Add input expression - BIG SIZE 20 + BOLD
    pdf.setFontSize(40);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`Input Expression: ${expression}`, 20, 60);
    
    // Add image below text
    pdf.addImage(imgData, 'PNG', 20, 80, canvas.width, canvas.height);
    pdf.save(filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
};

export const exportSymbolTableToPDF = async (
  elementId: string,
  expression: string,
  filename: string = 'symbol-table.pdf'
) => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error('Element not found');
    return;
  }

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: '#ffffff',
      logging: false,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: 'a4'
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const imgHeight = (canvas.height * (pdfWidth - 40)) / canvas.width;

    // Add title - BIGGER
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Symbol Table', 20, 35);
    
    // Add input expression - BIGGER SIZE 16 + BOLD
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`Input Expression: ${expression}`, 20, 60);
    
    // Add image below text
    pdf.addImage(imgData, 'PNG', 20, 80, pdfWidth - 40, imgHeight);
    pdf.save(filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
};
