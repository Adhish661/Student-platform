// frontend/src/components/Pages/PreviousYear.jsx
import { motion } from "framer-motion";

const papers = [
  { subject: "Mathematics", year: "2024", link: "#" },
  { subject: "Physics", year: "2024", link: "#" },
  { subject: "Chemistry", year: "2024", link: "#" },
  { subject: "Computer Science", year: "2024", link: "#" },
];

export default function PreviousYear() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-extrabold text-center text-gray-800"
      >
        Previous Year Papers
      </motion.h1>

      {/* Papers Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {papers.map((paper, idx) => (
          <motion.a
            key={idx}
            href={paper.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.2 }}
            className="p-6 bg-white/40 backdrop-blur-lg border border-gray-200 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-500 block"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              {paper.subject}
            </h2>
            <p className="text-gray-700">Year: {paper.year}</p>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
