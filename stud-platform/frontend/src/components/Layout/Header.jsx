// frontend/src/components/Layout/Header.jsx
import { motion } from 'framer-motion'

const Header = () => {
  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120 }}
      className="fixed top-0 right-0 left-0 w-full h-9 bg-primary text-primary-foreground flex items-center justify-center px-4 z-50 shadow-md"
    >
      <h1 className="text-xl font-bold">StuD - Multi-Purpose Educational Platform</h1>
    </motion.header>
  )
}

export default Header