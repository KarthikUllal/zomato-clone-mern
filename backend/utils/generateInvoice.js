const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path")
const claudinary = require("../utils/cloudinary")


const generatInvoice = (order, user, restaurantName) => {
    return new Promise((resolve, reject) => {
        const filePath = path.join(__dirname, `../temp/${order._id}.pdf`)

        const doc = new PDFDocument();
        const stream = fs.createWriteStream(filePath);

        doc.pipe(stream);

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

        stream.on("finish", async () => {
            const result = await cloudinary.uploader.upload(filePath, {
                resource_type: "raw",
                folder: "invoices"
            })

            fs.unlinkSync(filePath)
            resolve(result.secure_url)
        })

        stream.on("error", reject)

    })
}

module.exports = generatInvoice