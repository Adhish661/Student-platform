// // // // frontend/src/components/Layout/Sidebar.jsx
// // // import { motion } from "framer-motion";
// // // import { Link, useLocation } from "react-router-dom";
// // // import { useState } from "react";

// // // // Icons
// // // import { FaUsers, FaBook, FaHistory, FaVideo, FaRobot, FaHome } from "react-icons/fa";

// // // export default function Sidebar() {
// // //   const location = useLocation();
// // //   const [hoveredItem, setHoveredItem] = useState(null);

// // //   const links = [
// // //     { name: "Home", path: "/", icon: <FaHome className="text-2xl" /> },
// // //     { name: "Group Study", path: "/group-study", icon: <FaUsers className="text-2xl" /> },
// // //     { name: "Resources", path: "/resources", icon: <FaBook className="text-2xl" /> },
// // //     { name: "Previous Year", path: "/previous-year", icon: <FaHistory className="text-2xl" /> },
// // //     { name: "Video Notes", path: "/video-notes", icon: <FaVideo className="text-2xl" /> },
// // //     { name: "AI Chatbot", path: "/chatbot", icon: <FaRobot className="text-2xl" /> },
// // //   ];

// // //   return (
// // //     <motion.aside
// // //       initial={{ x: -200, opacity: 0 }}
// // //       animate={{ x: 0, opacity: 1 }}
// // //       transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
// // //       className="fixed top-0 left-0 bottom-0 w-[10%] h-full py-6 bg-gradient-to-b from-purple-900 via-indigo-800 to-blue-900 backdrop-blur-md border-r border-white/30 shadow-2xl z-10"
// // //     >
// // //       <motion.div 
// // //         initial={{ opacity: 0 }}
// // //         animate={{ opacity: 1 }}
// // //         transition={{ delay: 0.3, duration: 0.8 }}
// // //         className="flex justify-center mb-8"
// // //       >
// // //         <motion.h1 
// // //           className="text-2xl font-bold text-white"
// // //           whileHover={{ scale: 1.1, color: "#f0f0ff" }}
// // //         >
// // //           StuD
// // //         </motion.h1>
// // //       </motion.div>
      
// // //       <ul className="space-y-8 px-2">
// // //         {links.map((link, idx) => {
// // //           const isActive = location.pathname === link.path;
// // //           return (
// // //             <motion.li 
// // //               key={idx}
// // //               initial={{ opacity: 0, x: -20 }}
// // //               animate={{ opacity: 1, x: 0 }}
// // //               transition={{ delay: 0.1 * idx, duration: 0.5 }}
// // //               onHoverStart={() => setHoveredItem(idx)}
// // //               onHoverEnd={() => setHoveredItem(null)}
// // //             >
// // //               <Link
// // //                 to={link.path}
// // //                 className="relative flex flex-col items-center justify-center p-3 rounded-lg font-medium text-white/80 hover:text-white transition-all duration-300"
// // //               >
// // //                 <motion.div
// // //                   whileHover={{ 
// // //                     scale: 1.2,
// // //                     rotate: [0, -10, 10, -5, 5, 0],
// // //                     transition: { duration: 0.5 }
// // //                   }}
// // //                   className={`mb-1 ${isActive ? "text-yellow-300" : ""}`}
// // //                 >
// // //                   {link.icon}
// // //                 </motion.div>
                
// // //                 <motion.span 
// // //                   className={`text-xs ${isActive ? "text-yellow-300" : ""}`}
// // //                   animate={{ scale: hoveredItem === idx ? 1.1 : 1 }}
// // //                   transition={{ duration: 0.2 }}
// // //                 >
// // //                   {link.name}
// // //                 </motion.span>
                
// // //                 {isActive && (
// // //                   <motion.div
// // //                     layoutId="activeIndicator"
// // //                     className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-yellow-300 rounded-l-md"
// // //                     initial={{ opacity: 0 }}
// // //                     animate={{ opacity: 1 }}
// // //                     transition={{ duration: 0.3 }}
// // //                   />
// // //                 )}
// // //               </Link>
// // //             </motion.li>
// // //           );
// // //         })}
// // //       </ul>
// // //     </motion.aside>
// // //   );
// // // }
// // // frontend/src/components/Layout/Sidebar.jsx
// // import { motion } from "framer-motion";
// // import { Link, useLocation } from "react-router-dom";

// // import { FaUsers, FaBook, FaHistory, FaVideo, FaRobot, FaHome } from "react-icons/fa";

// // export default function Sidebar() {
// //   const location = useLocation();

// //   const links = [
// //     { name: "Home", path: "/", icon: <FaHome /> },
// //     { name: "Group Study", path: "/group-study", icon: <FaUsers /> },
// //     { name: "Resources", path: "/resources", icon: <FaBook /> },
// //     { name: "Previous Year", path: "/previous-year", icon: <FaHistory /> },
// //     { name: "Video Notes", path: "/video-notes", icon: <FaVideo /> },
// //     { name: "AI Chatbot", path: "/chatbot", icon: <FaRobot /> },
// //   ];

// //   return (
// //     <aside className="fixed top-0 left-0 bottom-0 w-16 h-full bg-indigo-700 text-white shadow-md z-20 flex flex-col items-center py-4">
// //       {/* Logo */}
// //       <motion.div
// //         className="mb-6 text-xl font-bold cursor-pointer"
// //         initial={{ opacity: 0, y: -10 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         transition={{ duration: 0.3 }}
// //       >
// //         StuD
// //       </motion.div>

// //       {/* Navigation */}
// //       <ul className="flex flex-col space-y-6 w-full items-center">
// //         {links.map((link, idx) => {
// //           const isActive = location.pathname === link.path;
// //           return (
// //             <motion.li
// //               key={idx}
// //               initial={{ opacity: 0, x: -10 }}
// //               animate={{ opacity: 1, x: 0 }}
// //               transition={{ duration: 0.3, delay: idx * 0.05 }}
// //               className="w-full"
// //             >
// //               <Link
// //                 to={link.path}
// //                 className={`flex flex-col items-center justify-center py-2 w-full rounded hover:bg-indigo-600 transition-colors duration-200 ${
// //                   isActive ? "bg-indigo-800" : ""
// //                 }`}
// //               >
// //                 <motion.div
// //                   whileHover={{ scale: 1.2 }}
// //                   className="text-2xl mb-1"
// //                 >
// //                   {link.icon}
// //                 </motion.div>
// //                 <motion.span
// //                   className="text-xs text-center"
// //                   whileHover={{ scale: 1.1 }}
// //                   transition={{ duration: 0.2 }}
// //                 >
// //                   {link.name}
// //                 </motion.span>
// //               </Link>
// //             </motion.li>
// //           );
// //         })}
// //       </ul>
// //     </aside>
// //   );
// // }
// // frontend/src/components/Layout/Navbar.jsx
// import { motion } from "framer-motion";
// import { Link, useLocation } from "react-router-dom";
// import { FaUsers, FaBook, FaHistory, FaVideo, FaRobot, FaHome } from "react-icons/fa";

// export default function Navbar() {
//   const location = useLocation();

//   const links = [
//     { name: "Home", path: "/", icon: <FaHome /> },
//     { name: "Group Study", path: "/group-study", icon: <FaUsers /> },
//     { name: "Resources", path: "/resources", icon: <FaBook /> },
//     { name: "Previous Year", path: "/previous-year", icon: <FaHistory /> },
//     { name: "Video Notes", path: "/video-notes", icon: <FaVideo /> },
//     { name: "AI Chatbot", path: "/chatbot", icon: <FaRobot /> },
//   ];

//   return (
//     <motion.nav
//       initial={{ y: -80, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
//       className="fixed top-[9%] left-0 w-full h-16 bg-indigo-700 text-white shadow-md z-20 flex justify-center items-center"
//     >
//       <ul className="flex justify-center items-center w-full max-w-6xl">
//         {links.map((link, idx) => {
//           const isActive = location.pathname === link.path;
//           return (
//             <motion.li
//               key={idx}
//               className="mx-4"
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.3, delay: idx * 0.05 }}
//             >
//               <Link
//                 to={link.path}
//                 className={`flex flex-col items-center justify-center py-2 px-4 rounded transition-all duration-200 ${
//                   isActive ? "bg-indigo-800" : "hover:bg-indigo-600"
//                 }`}
//               >
//                 <motion.div whileHover={{ scale: 1.2 }} className="text-2xl mb-1">
//                   {link.icon}
//                 </motion.div>
//                 <motion.span whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
//                   {link.name}
//                 </motion.span>
//               </Link>
//             </motion.li>
//           );
//         })}
//       </ul>
//     </motion.nav>
//   );
// }
