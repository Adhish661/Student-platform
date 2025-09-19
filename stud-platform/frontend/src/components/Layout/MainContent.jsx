// frontend/src/components/Layout/MainContent.jsx
import { AnimatePresence, motion } from 'framer-motion'
import Home from '../Pages/Home'
import GroupStudy from '../Pages/GroupStudy'
import Resources from '../Pages/Resources'
import PreviousYear from '../Pages/PreviousYear'
import Chatbot from '../Pages/Chatbot'
import VideoNotes from '../Pages/VideoNotes'

const pageComponents = {
  home: Home,
  'group-study': GroupStudy,
  resources: Resources,
  'previous-year': PreviousYear,
  chatbot: Chatbot,
  'video-notes': VideoNotes,
}

const MainContent = ({ activePage }) => {
  const PageComponent = pageComponents[activePage] || Home

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mt-9 ml-13 p-6 h-[calc(100vh-9rem)] overflow-y-auto"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activePage}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <PageComponent />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}

export default MainContent