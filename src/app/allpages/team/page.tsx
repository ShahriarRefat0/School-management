import React from 'react';
import { Github, ExternalLink, Globe } from 'lucide-react'; // আইকনের জন্য lucide-react ব্যবহার করেছি

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  github: string;
  portfolio: string;
  bio: string;
}

const teamData: TeamMember[] = [
  {
    id: 1,
    name: "Ariful Islam",
    role: "Full Stack Developer",
    image: "https://i.pravatar.cc/150?u=1",
    github: "https://github.com",
    portfolio: "https://portfolio.com",
    bio: "Expert in React, Node.js and PostgreSQL database management."
  },
  {
    id: 2,
    name: "Nusrat Jahan",
    role: "UI/UX Designer",
    image: "https://i.pravatar.cc/150?u=2",
    github: "https://github.com",
    portfolio: "https://portfolio.com",
    bio: "Passionate about creating beautiful and functional user interfaces."
  },
  {
    id: 3,
    name: "Rakib Ahmed",
    role: "Backend Engineer",
    image: "https://i.pravatar.cc/150?u=3",
    github: "https://github.com",
    portfolio: "https://portfolio.com",
    bio: "Specializes in API optimization and database architecture."
  },
  {
    id: 4,
    name: "Mehedi Hasan",
    role: "Frontend Specialist",
    image: "https://i.pravatar.cc/150?u=4",
    github: "https://github.com",
    portfolio: "https://portfolio.com",
    bio: "Turning complex designs into interactive web experiences."
  },
  {
    id: 5,
    name: "Sumaiya Akter",
    role: "Database Admin",
    image: "https://i.pravatar.cc/150?u=5",
    github: "https://github.com",
    portfolio: "https://portfolio.com",
    bio: "Managing complex PostgreSQL schemas and ensuring data integrity."
  },
  {
    id: 6,
    name: "Tanvir Hossain",
    role: "DevOps Engineer",
    image: "https://i.pravatar.cc/150?u=6",
    github: "https://github.com",
    portfolio: "https://portfolio.com",
    bio: "Focusing on automation, CI/CD pipelines and cloud infrastructure."
  }
];

const Teampage: React.FC = () => {
  return (
    <div className="min-h-screen py-20 px-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-24">
        <h2 className="text-4xl md:text-5xl mb-6">Our Creative Team</h2>
        <p className="text-lg max-w-2xl mx-auto opacity-80">
          আমরা একদল উদ্যমী ডেভেলপার যারা নতুন কিছু তৈরি করতে ভালোবাসি। আমাদের টিমের প্রতিটি সদস্য তাদের নিজ নিজ ক্ষেত্রে দক্ষ এবং আমরা একসাথে বড় প্রজেক্টগুলো সফলভাবে সম্পন্ন করি।
        </p>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
        {teamData.map((member, index) => (
          <div
            key={member.id}
            className={`
              group relative p-8 rounded-3xl border border-border-light bg-bg-card
              transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10
              ${index % 2 !== 0 ? 'md:translate-y-16' : ''} // Staggered Effect (উঁচু-নিচু)
            `}
          >
            {/* Image Section with Animation */}
            <div className="relative w-24 h-24 mb-6 overflow-hidden rounded-2xl grayscale group-hover:grayscale-0 transition-all duration-500">
              <img 
                src={member.image} 
                alt={member.name} 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* Info */}
            <h3 className="text-2xl mb-1">{member.name}</h3>
            <p className="text-primary font-medium mb-4">{member.role}</p>
            <p className="text-text-muted text-sm leading-relaxed mb-6">
              {member.bio}
            </p>

            {/* Links */}
            <div className="flex gap-4 border-t border-border-light pt-6">
              <a 
                href={member.github} 
                className="p-2 rounded-full hover:bg-primary/10 text-text-muted hover:text-primary transition-colors"
                target="_blank" 
                rel="noreferrer"
              >
                <Github size={20} />
              </a>
              <a 
                href={member.portfolio} 
                className="p-2 rounded-full hover:bg-primary/10 text-text-muted hover:text-primary transition-colors"
                target="_blank" 
                rel="noreferrer"
              >
                <Globe size={20} />
              </a>
            </div>

            {/* Background Decorative Element */}
            <div className="absolute top-0 right-0 -z-10 w-20 h-20 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teampage;