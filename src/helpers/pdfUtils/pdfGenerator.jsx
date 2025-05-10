import React from "react";
import { Page, Text, View, Document, StyleSheet, pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import { SalesPdfReport } from "../../components/PdfComponent/SalesPdfReport";

// Objeto que mapea los tipos de reportes con sus componentes
const componentSelector = {
    salesReport: (props) => <SalesPdfReport {...props} />, // ✅ Pasamos las props correctamente
  };
  

// Función genérica para generar PDF
export const generatePdf = async (reportType, formData) => {
  console.log("pdf", formData)
  const ReportComponent = componentSelector[reportType];
  

  if (!ReportComponent) {
    console.error("Tipo de reporte no encontrado:", reportType);
    return;
  }

const ReportElement = ReportComponent({ saleData: formData });
const blob = await pdf(ReportElement).toBlob();
saveAs(blob, `${reportType}.pdf`);

};

