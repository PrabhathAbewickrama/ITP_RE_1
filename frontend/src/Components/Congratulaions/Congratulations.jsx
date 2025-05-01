import React, { useEffect } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { jsPDF } from "jspdf";

const confetti = {
  light: {
    color: "var(--color-confetti)",
    size: 16,
    animate: {
      y: [0, 600],
      x: [-100, 100],
      scale: [0, 1, 0.3, 0],
      rotate: [-120, 120],
    },
    transition: {
      duration: 4,
      repeat: Infinity,
      repeatDelay: 0.2,
      ease: "easeOut",
    },
  },
};

function Confetti({ count = 100 }) {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-gradient-to-br from-cyan-400 via-purple-400 to-pink-400 rounded-full"
          style={{
            top: Math.random() * -100 + "%",
            left: Math.random() * 100 + "%",
            width: confetti.light.size,
            height: confetti.light.size,
          }}
          animate={confetti.light.animate}
          transition={{
            ...confetti.light.transition,
            delay: Math.random() * 4,
          }}
        />
      ))}
    </div>
  );
}

function FloatingStars() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white rounded-full"
          style={{
            top: Math.random() * 100 + "%",
            left: Math.random() * 100 + "%",
            filter: "blur(1px)",
          }}
          animate={{
            scale: [0.5, 1, 0.5],
            opacity: [0.2, 0.8, 0.2],
            filter: ["blur(2px)", "blur(0px)", "blur(2px)"],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
}

function Sparkles() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-4"
          style={{
            top: Math.random() * 100 + "%",
            left: Math.random() * 100 + "%",
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            rotate: [0, 180],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-full h-full text-yellow-400"
          >
            <path
              d="M12 0L14 9L23 12L14 15L12 24L10 15L1 12L10 9L12 0Z"
              fill="currentColor"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

function Congratulations({ orderId, total, onContinueShopping, onViewOrder }) {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      scale: [0.3, 1.2, 0.9, 1.1, 1],
      rotate: [0, -10, 10, -5, 0],
      transition: { duration: 2, times: [0, 0.2, 0.5, 0.8, 1] },
    });
  }, [controls]);

  const downloadOrderPDF = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;

    // Add gradient header background
    doc.setFillColor(33, 150, 243);
    doc.rect(0, 0, pageWidth, 40, "F");
    doc.setFillColor(25, 118, 210);
    doc.rect(0, 40, pageWidth, 5, "F");

    // Add white logo/text in header
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(28);
    doc.setFont("helvetica", "bold");
    doc.text("Order Confirmation", pageWidth / 2, 25, { align: "center" });

    // Add order details section
    doc.setFontSize(14);
    doc.setTextColor(60, 60, 60);
    doc.setFont("helvetica", "normal");

    // Add decorative line
    doc.setDrawColor(33, 150, 243);
    doc.setLineWidth(0.5);
    doc.line(margin, 60, pageWidth - margin, 60);

    // Order information
    doc.setFont("helvetica", "bold");
    doc.text("Order Details", margin, 75);
    doc.setFont("helvetica", "normal");
    doc.text(`Order ID: ${orderId}`, margin, 85);
    doc.text(
      `Date: ${new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })}`,
      margin,
      95
    );
    doc.text(`Time: ${new Date().toLocaleTimeString("en-US")}`, margin, 105);

    // Add amount section with box
    doc.setDrawColor(200, 200, 200);
    doc.setFillColor(250, 250, 250);
    doc.roundedRect(margin, 115, pageWidth - margin * 2, 30, 3, 3, "FD");

    doc.setFont("helvetica", "bold");
    doc.text("Total Amount:", margin + 5, 130);
    doc.setTextColor(33, 150, 243);
    doc.setFontSize(18);
    doc.text(`$${total.toFixed(2)}`, pageWidth - margin - 5, 130, {
      align: "right",
    });

    // Add thank you message
    doc.setTextColor(60, 60, 60);
    doc.setFontSize(14);
    doc.text("Thank you for your purchase!", pageWidth / 2, 160, {
      align: "center",
    });

    // Add footer
    doc.setFillColor(245, 245, 245);
    doc.rect(0, pageHeight - 30, pageWidth, 30, "F");
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(
      "This is an automatically generated document.",
      pageWidth / 2,
      pageHeight - 20,
      { align: "center" }
    );
    doc.text(
      "For questions, please contact support@example.com",
      pageWidth / 2,
      pageHeight - 15,
      { align: "center" }
    );

    // Add QR code placeholder
    doc.setDrawColor(200, 200, 200);
    doc.setFillColor(250, 250, 250);
    doc.roundedRect(margin, pageHeight - 80, 50, 50, 3, 3, "FD");
    doc.setFontSize(8);
    doc.text("Scan to track order", margin + 25, pageHeight - 25, {
      align: "center",
    });

    // Save the PDF
    doc.save(`order-${orderId}.pdf`);
  };

  return (
    <motion.div
      className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Confetti />
      <FloatingStars />
      <Sparkles />

      <motion.div
        className="w-40 h-40 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mb-12 relative"
        initial={{ y: -1000, scale: 0, rotate: -360 }}
        animate={{
          y: 0,
          scale: 1,
          rotate: 0,
          transition: {
            type: "spring",
            stiffness: 200,
            damping: 20,
            duration: 2,
          },
        }}
      >
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 opacity-50 blur-2xl"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.svg
          className="w-20 h-20 text-white relative z-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 1 }}
        >
          <motion.path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M5 13l4 4L19 7"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 1 }}
          />
        </motion.svg>
      </motion.div>

      <motion.div
        className="relative mb-12"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={controls}
      >
        <motion.div
          className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 opacity-75 blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.h2
          className="relative text-6xl font-bold text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          Congratulations!
        </motion.h2>
      </motion.div>

      <motion.p
        className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-12 font-medium"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
      >
        Your order has been successfully placed
      </motion.p>

      <motion.div
        className="bg-gray-800/50 rounded-2xl p-8 backdrop-blur-xl max-w-md w-full mb-12 border border-gray-700/50
                   shadow-[0_0_50px_rgba(0,255,255,0.15)]"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
          delay: 1.6,
        }}
      >
        <motion.div
          className="flex justify-between items-center mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.8 }}
        >
          <span className="text-gray-400 text-xl">Order ID:</span>
          <motion.span
            className="text-white font-mono text-xl bg-gray-700/50 px-6 py-3 rounded-xl border border-gray-600/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            {orderId}
          </motion.span>
        </motion.div>
        <motion.div
          className="flex justify-between items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2 }}
        >
          <span className="text-gray-400 text-xl">Total Amount:</span>
          <motion.span
            className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
              delay: 2.2,
            }}
          >
            ${total.toFixed(2)}
          </motion.span>
        </motion.div>
      </motion.div>

      <motion.div
        className="p-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl border border-green-500/30 mb-12 max-w-md w-full
                   shadow-[0_0_50px_rgba(0,255,128,0.15)]"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.3 }}
      >
        <motion.div
          className="flex items-center gap-4 text-green-400 text-xl"
          animate={{
            scale: [1, 1.03, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <svg
            className="w-8 h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          <span>Order confirmation email sent!</span>
        </motion.div>
      </motion.div>

      <motion.div
        className="flex gap-4 max-w-md w-full flex-wrap"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.4 }}
      >
        <motion.button
          className="flex-1 min-w-[200px] bg-gradient-to-r from-cyan-600 to-cyan-500 text-white py-4 px-8 rounded-xl font-medium text-lg
                    shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 relative overflow-hidden group"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={onContinueShopping}
        >
          <span className="relative z-10">Continue Shopping</span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-cyan-300"
            initial={{ x: "100%" }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>

        <motion.button
          className="flex-1 min-w-[200px] bg-gradient-to-r from-purple-600 to-purple-500 text-white py-4 px-8 rounded-xl font-medium text-lg
                    shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 relative overflow-hidden group"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={onViewOrder}
        >
          <span className="relative z-10">View Order</span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-300"
            initial={{ x: "100%" }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>

        <motion.button
          className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-4 px-8 rounded-xl font-medium text-lg
                    shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 relative overflow-hidden group"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={downloadOrderPDF}
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Download Order PDF
          </span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-300"
            initial={{ x: "100%" }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default Congratulations;
