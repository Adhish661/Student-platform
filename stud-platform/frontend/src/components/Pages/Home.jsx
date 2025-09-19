// frontend/src/components/Pages/Home.jsx
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const Section = ({ title, content, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="bg-card text-card-foreground p-6 rounded-lg shadow-md mb-6"
    >
      <h2 className="text-2xl font-bold mb-3 text-primary">{title}</h2>
      <p className="text-muted-foreground">{content}</p>
    </motion.section>
  )
}

const Home = () => {
  const sections = [
    {
      title: 'Welcome to StuD',
      content: 'Your all-in-one platform for collaborative learning, resource sharing, and AI-powered study assistance.'
    },
    {
      title: 'Group Study Made Easy',
      content: 'Connect with classmates and mentors in our virtual study rooms with real-time collaboration tools.'
    },
    {
      title: 'Rich Resource Library',
      content: 'Access and share study materials, previous year questions, and educational content in PDF format.'
    },
    {
      title: 'AI-Powered Assistance',
      content: 'Get instant help from our intelligent chatbot and generate organized notes from educational videos.'
    },
    {
      title: 'Smart Video Processing',
      content: 'Upload educational videos and automatically generate structured notes tailored to your subject.'
    }
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold mb-8 text-center text-primary"
      >
        Enhance Your Learning Experience
      </motion.h1>
      
      <div className="space-y-6">
        {sections.map((section, index) => (
          <Section key={index} {...section} index={index} />
        ))}
      </div>
    </div>
  )
}

export default Home