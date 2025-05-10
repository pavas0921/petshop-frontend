import React from "react";
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";

// Estilos para el PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
    fontSize: 12,
  },
  header: {
    flexDirection: "row",
    marginBottom: 20,
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingBottom: 10,
  },
  logo: {
    width: 80,
    height: 80,
  },
  companyInfo: {
    textAlign: "right",
  },
  companyName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  companyDetails: {
    fontSize: 9,
    marginTop: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    textDecoration: "underline",
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
    backgroundColor: "#f0f0f0",
    padding: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  label: {
    fontWeight: "bold",
    width: "30%",
  },
  value: {
    width: "70%",
  },
  table: {
    width: "100%",
    marginTop: 10,
    marginBottom: 15,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingBottom: 5,
    marginBottom: 5,
    fontWeight: "bold",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 5,
    marginBottom: 5,
  },
  col1: {
    width: "10%",
  },
  col2: {
    width: "50%",
  },
  col3: {
    width: "15%",
    textAlign: "right",
  },
  col4: {
    width: "25%",
    textAlign: "right",
  },
  totals: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#000",
    paddingTop: 10,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  totalLabel: {
    width: "40%",
    fontWeight: "bold",
    textAlign: "right",
  },
  totalValue: {
    width: "20%",
    textAlign: "right",
  },
  footer: {
    marginTop: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    fontSize: 10,
    textAlign: "center",
    color: "#666",
  },
  barcode: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 10,
  },
});

const SalesPdfReport = ({ saleData }) => {

  console.log("hola", saleData)
  
    // Datos hardcoded (puedes cambiarlos luego)
  const clientData = {
    name: saleData.customer.firstName + " " + saleData.customer.lastName,
    phone: saleData.customer.phone,
    address: saleData.customer.address
  };

  const companyData = {
    name: "Velvet",
    nit: "1128455348-7",
    address: "Medellín, Colombia",
    phone: "3019326311",
    email: "velvet@gmail.com",
  };
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Encabezado con logo e información de la empresa */}
        <View style={styles.header}>
          <Image style={styles.logo} src="https://res.cloudinary.com/dinxdqo76/image/upload/v1746670136/jrnq2jbgullzinbt0fsk.png?height=100&width=100" />
          <View style={styles.companyInfo}>
            <Text style={styles.companyName}>{companyData.name}</Text>
            <Text style={styles.companyDetails}>NIT: {companyData.nit}</Text>
            <Text style={styles.companyDetails}>Dirección: {companyData.address}</Text>
            <Text style={styles.companyDetails}>Teléfono: {companyData.phone}</Text>
            <Text style={styles.companyDetails}>Email: {companyData.email}</Text>
          </View>
        </View>

        {/* Título del documento */}
        <Text style={styles.title}>CUENTA DE COBRO</Text>

        {/* Información de la venta */}
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.label}>Fecha:</Text>
            <Text style={styles.value}>{new Date(saleData.date).toLocaleDateString()}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>No. Factura:</Text>
            <Text style={styles.value}>{saleData._id || "PENDIENTE"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Método de pago:</Text>
            <Text style={styles.value}>{saleData.payMethod}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Estado:</Text>
            <Text style={styles.value}>{saleData.saleType === "pagada" ? "PAGADA" : "PENDIENTE"}</Text>
          </View>
        </View>

        {/* Información del cliente */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Datos del Cliente</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Nombre:</Text>
            <Text style={styles.value}>{clientData.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Teléfono:</Text>
            <Text style={styles.value}>{clientData.phone}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Dirección:</Text>
            <Text style={styles.value}>{clientData.address}</Text>
          </View>
        </View>

        {/* Detalle de productos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Detalle de Productos</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.col1}>Cant.</Text>
              <Text style={styles.col2}>Descripción</Text>
              <Text style={styles.col3}>P. Unitario</Text>
              <Text style={styles.col4}>Total</Text>
            </View>
            
            {saleData.detalleVenta.map((item, index) => (
           
              <View key={index} style={styles.tableRow}>
                <Text style={styles.col1}>{item.qty}</Text>
                <Text style={styles.col2}>{item.productName}</Text>
                <Text style={styles.col3}>${item.unitPrice.toLocaleString()}</Text>
                <Text style={styles.col4}>${item.totalPrice.toLocaleString()}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Totales */}
        <View style={styles.totals}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>SUBTOTAL:</Text>
            <Text style={styles.totalValue}>${saleData.totalVenta.toLocaleString()}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>DESCUENTO:</Text>
            <Text style={styles.totalValue}>$0</Text>
          </View>
          <View style={[styles.totalRow, { marginTop: 5 }]}>
            <Text style={[styles.totalLabel, { fontSize: 14 }]}>TOTAL A PAGAR:</Text>
            <Text style={[styles.totalValue, { fontSize: 14, fontWeight: "bold" }]}>
              ${saleData.totalVenta.toLocaleString()}
            </Text>
          </View>
        </View>

        {/* Método de pago y observaciones */}
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.label}>Método de pago:</Text>
            <Text style={styles.value}>{saleData.payMethod}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Observaciones:</Text>
            <Text style={styles.value}>Gracias por su compra</Text>
          </View>
        </View>

        {/* Pie de página */}
        <View style={styles.footer}>
          <Text>Este documento no es válido como factura de venta</Text>
          <Text>Documento generado el {new Date().toLocaleDateString()} a las {new Date().toLocaleTimeString()}</Text>
        </View>
      </Page>
    </Document>
  );

};

export default SalesPdfReport;
