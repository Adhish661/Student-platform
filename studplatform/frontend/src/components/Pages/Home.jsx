// import { Link } from "react-router-dom";
// import {
//   FaArrowRight,
//   FaPlay,
//   FaBookOpen,
//   FaUsers,
//   FaRobot,
//   FaVideo,
// } from "react-icons/fa";

// const glass =
//   "bg-white/30 backdrop-blur-xl border border-gray-200 shadow-md hover:shadow-xl transition transform hover:-translate-y-1";

// // Hero Section
// const HeroSection = () => {
//   return (
//     <div className="relative mb-20">
//       <div className="relative z-10 text-center py-24 px-6">
//         <h1 className="text-6xl md:text-7xl font-extrabold text-gray-900">
//           StuD Platform
//         </h1>
//         <p className="mt-6 text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
//           Your intelligent study companion. <br />
//           Learn smarter, not harder.
//         </p>
//         <div className="mt-10 flex justify-center">
//           <button className="px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg inline-flex items-center gap-2 text-lg">
//             <FaPlay className="text-sm" />
//             Get Started
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Stats Section
// const StatsSection = () => {
//   const stats = [
//     { number: "10K+", label: "Students" },
//     { number: "50+", label: "Subjects" },
//     { number: "99%", label: "Success Rate" },
//     { number: "24/7", label: "AI Support" },
//   ];

//   return (
//     <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
//       {stats.map((stat) => (
//         <div
//           key={stat.label}
//           className="rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white p-6 shadow-md text-center"
//         >
//           <div className="text-3xl font-extrabold mb-2">{stat.number}</div>
//           <div className="text-sm tracking-wide uppercase">{stat.label}</div>
//         </div>
//       ))}
//     </div>
//   );
// };

// // Feature Card
// const FeatureCard = ({ title, description, link, icon }) => {
//   return (
//     <div className={`p-8 rounded-2xl ${glass}`}>
//       <div className="w-14 h-14 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6 text-2xl">
//         {icon}
//       </div>
//       <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
//       <p className="text-gray-700 mb-6 leading-relaxed">{description}</p>
//       <Link
//         to={link}
//         className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold text-base"
//       >
//         Explore
//         <span className="ml-2">
//           <FaArrowRight />
//         </span>
//       </Link>
//     </div>
//   );
// };

// // Home Page
// const Home = () => {
//   const features = [
//     {
//       title: "Group Study",
//       description: "Collaborate with peers in immersive virtual study rooms.",
//       link: "/group-study",
//       icon: <FaUsers />,
//     },
//     {
//       title: "Smart Resources",
//       description: "Access curated materials and upload your own content.",
//       link: "/resources",
//       icon: <FaBookOpen />,
//     },
//     {
//       title: "Video Notes",
//       description: "Convert educational videos into structured notes instantly.",
//       link: "/video-notes",
//       icon: <FaVideo />,
//     },
//     {
//       title: "AI Assistant",
//       description: "Ask anything, get instant, personalized academic help.",
//       link: "/chatbot",
//       icon: <FaRobot />,
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-white">
//       <div className="max-w-7xl mx-auto px-6 py-16">
//         <HeroSection />
//         <StatsSection />

//         <div className="mb-16 text-center">
//           <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
//             Tools Built for the Future of Learning
//           </h2>
//           <p className="text-gray-700 max-w-xl mx-auto">
//             Explore features that transform the way you study, collaborate, and
//             grow.
//           </p>
//         </div>

//         <div className="grid md:grid-cols-2 gap-10">
//           {features.map((feature) => (
//             <FeatureCard key={feature.title} {...feature} />
//           ))}
//         </div>

//         <div className={`mt-20 text-center p-12 rounded-3xl ${glass}`}>
//           <h2 className="text-4xl font-bold text-gray-900 mb-4">
//             Ready to transform your learning?
//           </h2>
//           <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
//             Join thousands of students already learning smarter with StuD.
//           </p>
//           <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold text-lg shadow-lg">
//             Start Learning Now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaPlay,
  FaBookOpen,
  FaUsers,
  FaRobot,
  FaVideo,
} from "react-icons/fa";

// Hero Section
const HeroSection = () => {
  return (
    <div className="relative mb-20">
      <div className="relative z-10 text-center py-24 px-6">
        <h1 className="text-6xl md:text-7xl font-extrabold text-gray-900">
          StuD Platform
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
          Your intelligent study companion. <br />
          Learn smarter, not harder.
        </p>
        <div className="mt-10 flex justify-center">
          <button className="px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg inline-flex items-center gap-2 text-lg">
            <FaPlay className="text-sm" />
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

// Stats Section
const StatsSection = () => {
  const stats = [
    { number: "10K+", label: "Students" },
    { number: "50+", label: "Subjects" },
    { number: "99%", label: "Success Rate" },
    { number: "24/7", label: "AI Support" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
      {stats.map((stat) => (
        <div key={stat.label} className="card p-6 text-center">
          <div className="text-3xl font-extrabold mb-2 text-blue-600">
            {stat.number}
          </div>
          <div className="text-sm tracking-wide uppercase">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

// Feature Card
const FeatureCard = ({ title, description, link, icon }) => {
  return (
    <div className="card p-8 rounded-2xl">
      <div className="w-14 h-14 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6 text-2xl">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-700 mb-6 leading-relaxed">{description}</p>
      <Link
        to={link}
        className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold text-base"
      >
        Explore
        <span className="ml-2">
          <FaArrowRight />
        </span>
      </Link>
    </div>
  );
};

// Home Page
const Home = () => {
  const features = [
    {
      title: "Group Study",
      description: "Collaborate with peers in immersive virtual study rooms.",
      link: "/group-study",
      icon: <FaUsers />,
    },
    {
      title: "Smart Resources",
      description: "Access curated materials and upload your own content.",
      link: "/resources",
      icon: <FaBookOpen />,
    },
    {
      title: "Video Notes",
      description: "Convert educational videos into structured notes instantly.",
      link: "/video-notes",
      icon: <FaVideo />,
    },
    {
      title: "AI Assistant",
      description: "Ask anything, get instant, personalized academic help.",
      link: "/chatbot",
      icon: <FaRobot />,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <HeroSection />
        <StatsSection />

        <div className="mb-16 text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            Tools Built for the Future of Learning
          </h2>
          <p className="text-gray-700 max-w-xl mx-auto">
            Explore features that transform the way you study, collaborate, and
            grow.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 mb-20">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>

        <div className="card mt-20 text-center p-12 rounded-3xl">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Ready to transform your learning?
          </h2>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
            Join thousands of students already learning smarter with StuD.
          </p>
          <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold text-lg shadow-lg">
            Start Learning Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
