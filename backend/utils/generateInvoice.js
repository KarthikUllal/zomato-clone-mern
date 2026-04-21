const PDFDocument = require("pdfkit");
const path = require("path");

const generateInvoice = (order, user, restaurantName) => {
    return new Promise((resolve, reject) => {

        const doc = new PDFDocument({ margin: 40 });

        const buffers = [];

        doc.on("data", buffers.push.bind(buffers));

        doc.on("end", () => {
            const pdfBuffer = Buffer.concat(buffers);
            resolve(pdfBuffer);
        });

        const logoPath = path.join(__dirname, "../assets/logo.jpg");
        doc.image(logoPath, 40, 30, { width: 80 });

        doc.fontSize(18).fillColor("#ef4f5f").text("ZOMATO", 130, 40);

        doc.fillColor("#000").fontSize(10)
            .text("Zomato Pvt Ltd", 130, 65)
            .text("GSTIN: 29ABCDE1234F1Z5", 130, 80);

        doc.fontSize(12).text("INVOICE", { align: "right" });

        doc.moveDown(2);

        doc.fontSize(10);
        doc.text(`Invoice ID: INV-${order._id.toString().slice(-6)}`);
        doc.text(`Order ID: ${order._id}`);
        doc.text(`Date: ${new Date(order.createdAt).toLocaleString()}`);

        doc.moveDown();

        doc.fontSize(12).text("Bill To", { underline: true });
        doc.fontSize(10);
        doc.text(user.fullname);
        doc.text(user.email);
        doc.text(order.address);

        doc.moveDown();

        doc.fontSize(12).text("Restaurant", { underline: true });
        doc.fontSize(10);
        doc.text(restaurantName);

        doc.moveDown();

        doc.fontSize(12).text("Order Details", { underline: true });
        doc.moveDown(0.5);

        const tableTop = doc.y;

        doc.fontSize(10);
        doc.text("Item", 40, tableTop);
        doc.text("Qty", 300, tableTop);
        doc.text("Price", 350, tableTop);
        doc.text("Total", 450, tableTop);

        let position = tableTop + 20;

        order.items.forEach((item) => {
            const total = item.quantity * item.price;

            doc.text(item.food?.name || "Item", 40, position);
            doc.text(item.quantity, 300, position);
            doc.text(`₹${item.price}`, 350, position);
            doc.text(`₹${total}`, 450, position);

            position += 20;
        });

        doc.moveTo(40, position).lineTo(550, position).stroke();

        doc.moveDown(2);

        doc.fontSize(12).text("Bill Summary", { underline: true });
        doc.moveDown(0.5);

        doc.fontSize(10);

        doc.text("Subtotal:", 350, doc.y);
        doc.text(`₹${order.subtotal}`, 450, doc.y);

        doc.moveDown();

        doc.text("GST (5%):", 350, doc.y);
        doc.text(`₹${order.gst}`, 450, doc.y);

        doc.moveDown();

        doc.text("Delivery Charge:", 350, doc.y);
        doc.text(`₹${order.deliveryCharge}`, 450, doc.y);

        doc.moveDown();

        doc.fontSize(12).fillColor("#ef4f5f");
        doc.text("Grand Total:", 350, doc.y);
        doc.text(`₹${order.totalAmount}`, 450, doc.y);

        doc.fillColor("#000");

        doc.moveDown(3);

        doc.fontSize(10).text("This is a computer generated invoice.", {
            align: "center",
        });

        doc.text("Thank you for ordering ❤️", {
            align: "center",
        });

        doc.end();
    });
};

module.exports = generateInvoice;