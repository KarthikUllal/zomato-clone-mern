const PDFDocument = require("pdfkit");
const cloudinary = require("../utils/cloudinary");

const generateInvoice = (order, user, restaurantName) => {
    return new Promise((resolve, reject) => {

        const doc = new PDFDocument();

        const buffers = [];

        doc.on("data", buffers.push.bind(buffers));

        doc.on("end", async () => {
            try {
                const pdfBuffer = Buffer.concat(buffers);

                const stream = cloudinary.uploader.upload_stream(
                    {
                        resource_type: "raw",
                        folder: "invoices"
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

        doc.fontSize(20).text("Invoice", { align: "center" })
        doc.moveDown()

        doc.text(`Order ID: ${order._id}`)
        doc.text(`Date: ${new Date(order.createdAt).toLocaleString()}`)

        doc.moveDown()
        doc.text(`Customer: ${user.fullname}`)
        doc.text(`Email: ${user.email}`)
        doc.text(`Address: ${order.address}`)

        doc.moveDown()
        doc.text(`Restaurant: ${restaurantName}`)

        order.items.forEach((item) => {
            doc.text(
                `Qty: ${item.quantity} × ₹${item.price} = ₹${item.quantity * item.price}`
            )
        });

        doc.moveDown()
        doc.text(`Subtotal: ₹${order.subtotal}`)
        doc.text(`GST: ₹${order.gst}`)
        doc.text(`Delivery: ₹${order.deliveryCharge}`)
        doc.text(`Total: ₹${order.totalAmount}`)

        doc.end()

    })
}

module.exports = generateInvoice;