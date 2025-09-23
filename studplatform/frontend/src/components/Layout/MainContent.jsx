// // frontend/src/components/Layout/MainContent.jsx
// import { motion, AnimatePresence } from "framer-motion";

// export default function MainContent({ children }) {
//   return (
//     <motion.main
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="flex-1 p-6 pt-24 ml-[13%] mt-[9%]"
//       style={{ 
//         background: "linear-gradient(135deg,rgba(27, 27, 27, 0.8) 0%,rgb(29, 29, 29) 100%)",
//         minHeight: "calc(100vh - 9%)"
//       }}
//     >
//       <AnimatePresence mode="wait">
//         <motion.div
//           key={window.location.pathname}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -20 }}
//           transition={{ duration: 0.3 }}
//           className="h-full"
//         >
//           {children}
//         </motion.div>
//       </AnimatePresence>
//     </motion.main>
//   );
// }// frontend/src/components/Layout/MainContent.jsx
// import { motion, AnimatePresence } from "framer-motion";

// export default function MainContent({ children }) {
//   return (
//     <motion.main
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="flex-1 pt-[9%] ml-[13%] px-8 py-6 min-h-screen"
//       style={{
//         background: "linear-gradient(135deg, rgba(27, 27, 27, 0.85) 0%, rgba(29, 29, 29, 1) 100%)",
//       }}
//     >
//       <AnimatePresence mode="wait">
//         <motion.div
//           key={window.location.pathname}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -20 }}
//           transition={{ duration: 0.4 }}
//           className="w-full max-w-[1400px] mx-auto bg-gradient-to-b from-gray-900/60 to-gray-800/40 rounded-2xl p-6 shadow-xl backdrop-blur-md border border-white/10 overflow-hidden"
//         >
//           {children}
//         </motion.div>
//       </AnimatePresence>
//     </motion.main>
//   );
// }// frontend/src/components/Layout/MainContent.jsx

import { motion, AnimatePresence } from "framer-motion";

export default function MainContent({ children }) {
  return (
    <main className="flex-1 pt-24 min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      {/* Decorative gradient blobs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>

      <AnimatePresence mode="wait">
        <motion.div
          key={children?.key || "page"}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative z-10 max-w-7xl mx-auto w-full px-8 py-10"
        >
          <div className="backdrop-blur-xl bg-white/10 rounded-2xl shadow-2xl p-8 min-h-[70vh] border border-white/20">
            {children}
          </div>
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
