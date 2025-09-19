// frontend/src/components/Layout/Sidebar.jsx
import { motion } from 'framer-motion'
import { 
  Home, 
  Users, 
  BookOpen, 
  FileText, 
  MessageSquare, 
  Video 
} from 'lucide-react'

const Sidebar = ({ activePage, setActivePage }) => {
  const menuItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'group-study', icon: Users, label: 'Group Study' },
    { id: 'resources', icon: BookOpen, label: 'Resources' },
    { id: 'previous-year', icon: FileText, label: 'Previous Year' },
    { id: 'chatbot', icon: MessageSquare, label: 'AI Chatbot' },
    { id: 'video-notes', icon: Video, label: 'Video Notes' },
  ]

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 bottom-0 left-0 w-10 bg-secondary text-secondary-foreground flex flex-col items-center py-6 space-y-8 z-40 shadow-lg"
    >
      {menuItems.map((item, index) => (
        <motion.button
          key={item.id}
          onClick={() => setActivePage(item.id)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`p-2 rounded-lg transition-colors ${
            activePage === item.id 
              ? 'bg-primary text-primary-foreground' 
              : 'hover:bg-accent hover:text-accent-foreground'
          }`}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <item.icon size={24} />
          <span className="sr-only">{item.label}</span>
        </motion.button>
      ))}
    </motion.div>
  )
}

export default Sidebar