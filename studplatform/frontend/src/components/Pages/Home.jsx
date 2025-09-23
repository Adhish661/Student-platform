import { Link } from 'react-router-dom';
import { FaArrowRight, FaPlay, FaBookOpen, FaUsers, FaRobot, FaVideo } from 'react-icons/fa';

const glass = "bg-white/60 backdrop-blur-md border border-white/40 shadow-sm";

const FeatureCard = ({ title, description, link, icon }) => {
  return (
    <div className={`group relative p-6 rounded-xl ${glass}`}>
      <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
        <span className="text-lg">{icon}</span>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-700 mb-4">{description}</p>
      <Link to={link} className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm">
        Explore
        <span className="ml-2"><FaArrowRight /></span>
      </Link>
    </div>
  );
};

const HeroSection = () => {
  return (
    <div className="text-center mb-16">
      <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">StuD Platform</h1>
      <p className="text-lg text-gray-700 max-w-2xl mx-auto">Your intelligent study companion. Learn smarter, not harder.</p>
      <div className="mt-8">
        <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold inline-flex items-center gap-2">
          <FaPlay className="text-sm" />
          Get Started
        </button>
      </div>
    </div>
  );
};

const StatsSection = () => {
  const stats = [
    { number: '10K+', label: 'Students' },
    { number: '50+', label: 'Subjects' },
    { number: '99%', label: 'Success Rate' },
    { number: '24/7', label: 'AI Support' }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
      {stats.map((stat) => (
        <div key={stat.label} className={`text-center p-6 rounded-xl ${glass}`}>
          <div className="text-2xl font-bold text-gray-900 mb-1">{stat.number}</div>
          <div className="text-gray-700 text-sm font-medium">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

const Home = () => {
  const features = [
    {
      title: 'Group Study',
      description: 'Collaborate with peers in virtual study rooms.',
      link: '/group-study',
      icon: <FaUsers />
    },
    {
      title: 'Smart Resources',
      description: 'Access curated study materials and upload content.',
      link: '/resources',
      icon: <FaBookOpen />
    },
    {
      title: 'Video Notes',
      description: 'Turn educational videos into structured notes.',
      link: '/video-notes',
      icon: <FaVideo />
    },
    {
      title: 'AI Assistant',
      description: 'Ask questions and get personalized help.',
      link: '/chatbot',
      icon: <FaRobot />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <HeroSection />
        <StatsSection />

        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Everything you need to excel</h2>
          <p className="text-gray-700">Powerful tools designed to make learning more effective.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>

        <div className={`mt-16 text-center p-10 rounded-2xl ${glass}`}>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Ready to transform your learning?</h2>
          <p className="text-gray-700 mb-6">Join thousands of students learning smarter with StuD.</p>
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold">Start Learning Now</button>
        </div>
      </div>
    </div>
  );
};

export default Home;