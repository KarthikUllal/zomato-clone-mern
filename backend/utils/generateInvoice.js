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

        // HEADER BOX
        doc.rect(40, 30, 520, 70).stroke("#eeeeee");

        doc.image(logoPath, 50, 40, { width: 60 });

        doc
            .fillColor("#ef4f5f")
            .fontSize(18)
            .text("ZOMATO", 120, 45);

        doc
            .fillColor("#555")
            .fontSize(10)
            .text("Zomato Pvt Ltd", 120, 65)
            .text("GSTIN: 29ABCDE1234F1Z5", 120, 78);

        doc
            .fillColor("#000")
            .fontSize(14)
            .text("INVOICE", 400, 50);

        doc.moveDown(4);

        // ORDER INFO BOX
        const orderTop = doc.y;

        doc.rect(40, orderTop, 520, 60).stroke("#eeeeee");

        doc.fontSize(10).fillColor("#000");

        doc.text(`Invoice ID: INV-${order._id.toString().slice(-6)}`, 50, orderTop + 10);
        doc.text(`Order ID: ${order._id}`, 50, orderTop + 25);

        doc.text(`Date: ${new Date(order.createdAt).toLocaleString()}`, 350, orderTop + 10);

        doc.moveDown(4);

        // CUSTOMER + RESTAURANT
        const infoTop = doc.y;

        doc.rect(40, infoTop, 520, 80).stroke("#eeeeee");

        doc.fontSize(11).text("Billed To", 50, infoTop + 10);
        doc.fontSize(10).fillColor("#555");

        doc.text(user.fullname, 50, infoTop + 25);
        doc.text(user.email, 50, infoTop + 40);
        doc.text(order.address, 50, infoTop + 55, { width: 250 });

        doc.fillColor("#000").fontSize(11).text("Restaurant", 320, infoTop + 10);
        doc.fontSize(10).fillColor("#555");
        doc.text(restaurantName, 320, infoTop + 30);

        doc.moveDown(5);

        // TABLE HEADER
        doc.moveTo(40, doc.y).lineTo(560, doc.y).stroke();

        doc.fontSize(11).fillColor("#000");
        doc.text("Item", 50, doc.y + 5);
        doc.text("Qty", 300, doc.y + 5);
        doc.text("Price", 360, doc.y + 5);
        doc.text("Total", 450, doc.y + 5);

        doc.moveDown(1.5);
        doc.moveTo(40, doc.y).lineTo(560, doc.y).stroke();

        // ITEMS
        let position = doc.y + 5;

        order.items.forEach((item) => {
            const total = item.quantity * item.price;

            doc.fontSize(10).fillColor("#555");

            doc.text(item.food?.name || "Item", 50, position);
            doc.text(item.quantity, 300, position);
            doc.text(`₹${item.price}`, 360, position);
            doc.text(`₹${total}`, 450, position);

            position += 20;
        });

        doc.moveTo(40, position).lineTo(560, position).stroke();

        doc.moveDown(2);

        // BILL SUMMARY BOX
        const billTop = doc.y;

        doc.rect(300, billTop, 260, 110).stroke("#eeeeee");

        doc.fontSize(11).fillColor("#000").text("Bill Summary", 310, billTop + 10);

        doc.fontSize(10).fillColor("#555");

        doc.text("Subtotal:", 310, billTop + 30);
        doc.text(`₹${order.subtotal}`, 470, billTop + 30);

        doc.text("GST (5%):", 310, billTop + 50);
        doc.text(`₹${order.gst}`, 470, billTop + 50);

        doc.text("Delivery:", 310, billTop + 70);
        doc.text(`₹${order.deliveryCharge}`, 470, billTop + 70);

        doc.moveTo(310, billTop + 90).lineTo(560, billTop + 90).stroke();

        doc.fontSize(12).fillColor("#ef4f5f");

        doc.text("Total:", 310, billTop + 95);
        doc.text(`₹${order.totalAmount}`, 470, billTop + 95);

        doc.fillColor("#000");

        doc.moveDown(6);

        // FOOTER
        doc.fontSize(10).fillColor("#888").text(
            "This is a computer generated invoice.",
            { align: "center" }
        );

        doc.moveDown(0.5);

        doc.fontSize(10).fillColor("#ef4f5f").text(
            "Thank you for ordering with Zomato ❤️",
            { align: "center" }
        );

        doc.end();
    });
};

module.exports = generateInvoice;