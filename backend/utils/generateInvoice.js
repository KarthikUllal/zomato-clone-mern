const PDFDocument = require("pdfkit");
const cloudinary = require("../utils/cloudinary");

const generateInvoice = (order, user, restaurantName) => {
    return new Promise((resolve, reject) => {

        const doc = new PDFDocument({ margin: 40 });

        const buffers = [];

        doc.on("data", buffers.push.bind(buffers));

        doc.on("end", async () => {
            try {
                const pdfBuffer = Buffer.concat(buffers);

                const stream = cloudinary.uploader.upload_stream(
                    {
                        resource_type: "raw",
                        folder: "invoices",
                        format: "pdf",
                    },
                    (error, result) => {
                        if (error) return reject(error);
                        resolve(result.secure_url);
                    }
                );

                stream.end(pdfBuffer);

            } catch (err) {
                reject(err);
            }
        });

        // HEADER
        doc
            .fillColor("#ef4f5f")
            .fontSize(22)
            .text("ZOMATO", { align: "left" });

        doc
            .fillColor("#000")
            .fontSize(12)
            .text("Food Delivery Invoice", { align: "right" });

        doc.moveDown();

        // ORDER INFO
        doc.fontSize(10);
        doc.text(`Order ID: ${order._id}`);
        doc.text(`Date: ${new Date(order.createdAt).toLocaleString()}`);

        doc.moveDown();

        // CUSTOMER DETAILS
        doc.fontSize(12).text("Customer Details", { underline: true });
        doc.fontSize(10);
        doc.text(`Name: ${user.fullname}`);
        doc.text(`Email: ${user.email}`);
        doc.text(`Address: ${order.address}`);

        doc.moveDown();

        // RESTAURANT
        doc.fontSize(12).text("Restaurant", { underline: true });
        doc.fontSize(10);
        doc.text(restaurantName);

        doc.moveDown();

        // ITEMS TABLE HEADER
        doc.fontSize(12).text("Order Summary", { underline: true });
        doc.moveDown(0.5);

        const tableTop = doc.y;

        doc.fontSize(10);
        doc.text("Item", 40, tableTop);
        doc.text("Qty", 300, tableTop);
        doc.text("Price", 350, tableTop);
        doc.text("Total", 450, tableTop);

        doc.moveDown();

        // ITEMS
        let position = doc.y;

        order.items.forEach((item) => {
            const itemTotal = item.quantity * item.price;

            doc.text(item.food?.name || "Item", 40, position);
            doc.text(item.quantity, 300, position);
            doc.text(`₹${item.price}`, 350, position);
            doc.text(`₹${itemTotal}`, 450, position);

            position += 20;
        });

        doc.moveTo(40, position).lineTo(550, position).stroke();

        doc.moveDown();

        // BILL SUMMARY
        doc.moveDown();
        doc.fontSize(12).text("Bill Details", { underline: true });

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
        doc.text("Total:", 350, doc.y);
        doc.text(`₹${order.totalAmount}`, 450, doc.y);

        doc.fillColor("#000");

        doc.moveDown(2);

        // FOOTER
        doc.fontSize(10).text("Thank you for ordering with Zomato ❤️", {
            align: "center",
        });

        doc.end();

    });
};

module.exports = generateInvoice;