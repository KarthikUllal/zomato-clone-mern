const PDFDocument = require("pdfkit");
const path = require("path");

const generateInvoice = (order, user, restaurantName) => {
    return new Promise((resolve, reject) => {

        const doc = new PDFDocument({ 
            margin: 40,
            size: 'A4',
            layout: 'portrait'
        });

        const buffers = [];

        doc.on("data", buffers.push.bind(buffers));
        doc.on("end", () => {
            const pdfBuffer = Buffer.concat(buffers);
            resolve(pdfBuffer);
        });

        const logoPath = path.join(__dirname, "../assets/logo.jpg");
        
        // Helper function for currency formatting - FIXED
        const formatCurrency = (amount) => {
            // Ensure amount is a number and properly formatted
            const numAmount = typeof amount === 'number' ? amount : parseFloat(amount);
            if (isNaN(numAmount)) return `₹0.00`;
            return `₹${numAmount.toFixed(2)}`;
        };

        
        let yPos = 40;
        
        // Top border line
        doc.moveTo(40, yPos).lineTo(560, yPos).lineWidth(2).stroke("#ef4f5f");
        
        // Logo and Company Info - Removed ZOMATO text
        try {
            doc.image(logoPath, 50, yPos + 10, { width: 60 });
        } catch(e) {
            // Fallback if logo doesn't exist - using a simple box instead of text
            doc.rect(50, yPos + 10, 60, 50).fill("#ef4f5f");
            doc.fillColor("#ffffff")
               .fontSize(12)
               .text("LOGO", 65, yPos + 32, { align: "center" });
        }
        
        doc.fontSize(9)
            .fillColor("#666666")
            .text("Zomato Private Limited", 120, yPos + 25)
            .text("GSTIN: 29ABCDE1234F1Z5", 120, yPos + 40)
            .text("FSSAI License: 11520034000982", 120, yPos + 55);
        
        // Invoice Title Box
        doc.rect(400, yPos + 10, 180, 70)
            .fillAndStroke("#ef4f5f", "#ef4f5f");
        
        doc.fillColor("#ffffff")
            .fontSize(16)
            .text("INVOICE", 420, yPos + 30, { align: "center" });
        
        doc.fontSize(9)
            .text("TAX INVOICE", 420, yPos + 52, { align: "center" });
        
        yPos += 100;
        
        // Invoice Details Box
        doc.rect(40, yPos, 520, 55)
            .fill("#f9f9f9")
            .stroke("#e0e0e0");
        
        doc.fillColor("#333333")
            .fontSize(9);
        
        // Left column
        doc.text("Invoice Number:", 55, yPos + 12)
            .fillColor("#666666")
            .text(`INV-${order._id.toString().slice(-8)}`, 160, yPos + 12);
        
        doc.fillColor("#333333")
            .text("Invoice Date:", 55, yPos + 28)
            .fillColor("#666666")
            .text(new Date(order.createdAt).toLocaleDateString('en-IN'), 160, yPos + 28);
        
        // Right column
        doc.fillColor("#333333")
            .text("Order Number:", 340, yPos + 12)
            .fillColor("#666666")
            .text(order._id.toString().slice(-10), 440, yPos + 12);
        
        doc.fillColor("#333333")
            .text("Order Date:", 340, yPos + 28)
            .fillColor("#666666")
            .text(new Date(order.createdAt).toLocaleString('en-IN'), 440, yPos + 28);
        
        yPos += 75;
        
        // Bill To Section
        doc.rect(40, yPos, 250, 90)
            .fill("#ffffff")
            .stroke("#e0e0e0");
        
        doc.fillColor("#ef4f5f")
            .fontSize(10)
            .text("BILL TO", 55, yPos + 8);
        
        doc.fillColor("#333333")
            .fontSize(10)
            .text(user.fullname, 55, yPos + 25);
        
        doc.fillColor("#666666")
            .fontSize(9)
            .text(user.email, 55, yPos + 42)
            .text(order.address, 55, yPos + 58, { width: 220 });
        
        // Restaurant Section
        doc.rect(310, yPos, 250, 90)
            .fill("#ffffff")
            .stroke("#e0e0e0");
        
        doc.fillColor("#ef4f5f")
            .fontSize(10)
            .text("RESTAURANT DETAILS", 325, yPos + 8);
        
        doc.fillColor("#333333")
            .fontSize(10)
            .text(restaurantName, 325, yPos + 25);
        
        doc.fillColor("#666666")
            .fontSize(9)
            .text("Delivery Partner: Zomato Delivery", 325, yPos + 42)
            .text(`Delivery Charge: ${formatCurrency(order.deliveryCharge)}`, 325, yPos + 58);
        
        yPos += 110;
        
        // Table Header
        const tableTop = yPos;
        
        doc.rect(40, tableTop, 520, 30)
            .fill("#ef4f5f");
        
        doc.fillColor("#ffffff")
            .fontSize(10)
            .text("ITEM DESCRIPTION", 50, tableTop + 8, { bold: true })
            .text("QTY", 340, tableTop + 8, { align: "center" })
            .text("UNIT PRICE", 400, tableTop + 8, { align: "center" })
            .text("TOTAL", 490, tableTop + 8, { align: "center" });
        
        yPos = tableTop + 30;
        
        // Table Rows
        order.items.forEach((item, index) => {
            const total = item.quantity * item.price;
            const rowHeight = 25;
            
            // Alternate row colors
            if (index % 2 === 0) {
                doc.rect(40, yPos, 520, rowHeight)
                    .fill("#fafafa");
            }
            
            doc.fillColor("#333333")
                .fontSize(9)
                .text(item.food?.name || "Item", 50, yPos + 6)
                .text(item.quantity.toString(), 345, yPos + 6, { align: "center" })
                .text(formatCurrency(item.price), 405, yPos + 6, { align: "center" })
                .text(formatCurrency(total), 495, yPos + 6, { align: "center" });
            
            yPos += rowHeight;
        });
        
        // Table Bottom Border
        doc.moveTo(40, yPos).lineTo(560, yPos).lineWidth(1).stroke("#e0e0e0");
        
        yPos += 15;
        
        // Bill Summary Box
        const summaryTop = yPos;
        
        // Summary Box
        doc.rect(350, summaryTop, 210, 130)
            .fill("#ffffff")
            .stroke("#e0e0e0");
        
        doc.fillColor("#ef4f5f")
            .fontSize(11)
            .text("BILL SUMMARY", 365, summaryTop + 10);
        
        doc.moveTo(365, summaryTop + 28).lineTo(545, summaryTop + 28).stroke("#e0e0e0");
        
        let summaryY = summaryTop + 38;
        
        doc.fillColor("#555555")
            .fontSize(9)
            .text("Subtotal:", 365, summaryY)
            .text(formatCurrency(order.subtotal), 520, summaryY, { align: "right" });
        
        summaryY += 22;
        
        doc.text("GST (5%):", 365, summaryY)
            .text(formatCurrency(order.gst), 520, summaryY, { align: "right" });
        
        summaryY += 22;
        
        doc.text("Delivery Charge:", 365, summaryY)
            .text(formatCurrency(order.deliveryCharge), 520, summaryY, { align: "right" });
        
        summaryY += 22;
        
        doc.moveTo(365, summaryY).lineTo(545, summaryY).stroke("#e0e0e0");
        
        summaryY += 12;
        
        doc.fillColor("#ef4f5f")
            .fontSize(12)
            .text("TOTAL AMOUNT:", 365, summaryY)
            .text(formatCurrency(order.totalAmount), 520, summaryY, { align: "right" });
        
        yPos = summaryTop + 150;
        
        // Payment Status Badge
        if (order.paymentStatus === 'completed') {
            doc.rect(40, yPos - 40, 120, 25)
                .fill("#4caf50");
            doc.fillColor("#ffffff")
                .fontSize(9)
                .text("PAID", 100, yPos - 33, { align: "center" });
        } else if (order.paymentStatus === 'pending') {
            doc.rect(40, yPos - 40, 120, 25)
                .fill("#ff9800");
            doc.fillColor("#ffffff")
                .fontSize(9)
                .text("PENDING", 100, yPos - 33, { align: "center" });
        }
        
        // Footer
        // Bottom border line
        doc.moveTo(40, 750).lineTo(560, 750).lineWidth(1).stroke("#e0e0e0");
        
        doc.fontSize(8)
            .fillColor("#999999")
            .text("This is a computer generated invoice and does not require a physical signature.", 
                40, 760, { align: "center", width: 520 });
        
        doc.fontSize(9)
            .fillColor("#ef4f5f")
            .text("Thank you for ordering with Zomato!", 
                40, 780, { align: "center", width: 520 });
        
        doc.fontSize(7)
            .fillColor("#aaaaaa")
            .text("For any queries, please contact support@zomato.com | +91-80-12345678", 
                40, 800, { align: "center", width: 520 });
        
        doc.end();
    });
};

module.exports = generateInvoice;