export interface Candidate {
  id: string
  name: string
  skills: string[]
  experience: number
  location: string
  matchScore: number
  interestScore: number
  finalScore: number
  whyThisCandidate: string
}

export interface ChatMessage {
  id: string
  sender: "recruiter" | "candidate"
  text: string
  timestamp: string
  sentiment?: "interested" | "neutral" | "not_interested"
}

export const mockCandidates: Candidate[] = [
  {
    id: "1",
    name: "Sarah Chen",
    skills: ["React", "TypeScript", "Next.js", "GraphQL", "Node.js"],
    experience: 6,
    location: "San Francisco, CA",
    matchScore: 97,
    interestScore: 91,
    finalScore: 94,
    whyThisCandidate: "Strong React and TypeScript expertise with 6 years of experience. Previously led frontend teams at two startups and has open-source contributions to popular React libraries."
  },
  {
    id: "2",
    name: "Michael Rodriguez",
    skills: ["React", "JavaScript", "Vue.js", "CSS", "Webpack"],
    experience: 4,
    location: "Austin, TX",
    matchScore: 78,
    interestScore: 94,
    finalScore: 85,
    whyThisCandidate: "Highly motivated developer actively seeking new opportunities. Recent experience with modern frontend architecture and performance optimization."
  },
  {
    id: "3",
    name: "Emily Johnson",
    skills: ["React", "TypeScript", "Redux", "Testing", "Figma"],
    experience: 5,
    location: "New York, NY",
    matchScore: 85,
    interestScore: 62,
    finalScore: 74,
    whyThisCandidate: "Excellent technical skills with strong design sensibility. Has worked on large-scale applications and has experience bridging design and development teams."
  },
  {
    id: "4",
    name: "David Kim",
    skills: ["Angular", "TypeScript", "RxJS", "Node.js"],
    experience: 7,
    location: "Seattle, WA",
    matchScore: 58,
    interestScore: 79,
    finalScore: 67,
    whyThisCandidate: "Experienced developer looking to transition from Angular to React. Strong TypeScript foundation and enthusiasm for learning new frameworks."
  },
  {
    id: "5",
    name: "Jessica Williams",
    skills: ["React", "Python", "Django", "PostgreSQL"],
    experience: 3,
    location: "Denver, CO",
    matchScore: 64,
    interestScore: 38,
    finalScore: 52,
    whyThisCandidate: "Full-stack developer with growing frontend expertise. Good problem-solving skills but may need mentorship for advanced React patterns."
  },
  {
    id: "6",
    name: "Alex Thompson",
    skills: ["HTML", "CSS", "jQuery", "Bootstrap"],
    experience: 2,
    location: "Chicago, IL",
    matchScore: 32,
    interestScore: 96,
    finalScore: 58,
    whyThisCandidate: "Highly enthusiastic junior developer eager to learn modern frameworks. Shows potential but lacks direct experience with required technologies."
  }
]

export const mockChatMessages: Record<string, ChatMessage[]> = {
  "1": [
    {
      id: "1-1",
      sender: "recruiter",
      text: "Hi Sarah! I came across your profile and was impressed by your React and TypeScript expertise. We have an exciting Senior Frontend Developer position that I think would be a great fit for you.",
      timestamp: "10:30 AM"
    },
    {
      id: "1-2",
      sender: "candidate",
      text: "Hi! Thanks for reaching out. I've actually been following your company's work on the developer tools space. Could you tell me more about the role?",
      timestamp: "10:45 AM",
      sentiment: "interested"
    },
    {
      id: "1-3",
      sender: "recruiter",
      text: "Absolutely! You'd be leading our frontend architecture initiatives and working on our next-generation dashboard. The tech stack is React, TypeScript, and Next.js - right up your alley!",
      timestamp: "10:48 AM"
    },
    {
      id: "1-4",
      sender: "candidate",
      text: "That sounds really interesting! I'd love to learn more about the team and the technical challenges you're tackling. Would it be possible to schedule a call this week?",
      timestamp: "11:00 AM",
      sentiment: "interested"
    }
  ],
  "2": [
    {
      id: "2-1",
      sender: "recruiter",
      text: "Hello Michael! Your frontend experience caught my attention. We're looking for developers passionate about building great user experiences.",
      timestamp: "2:00 PM"
    },
    {
      id: "2-2",
      sender: "candidate",
      text: "Hey! Thanks for the message. I'm definitely open to new opportunities. What kind of projects would I be working on?",
      timestamp: "2:15 PM",
      sentiment: "interested"
    },
    {
      id: "2-3",
      sender: "recruiter",
      text: "You'd be working on our AI-powered recruitment platform, building intuitive interfaces for both recruiters and candidates. Lots of complex state management and real-time features.",
      timestamp: "2:18 PM"
    },
    {
      id: "2-4",
      sender: "candidate",
      text: "Real-time features sound exciting! I've been wanting to dive deeper into WebSockets and server-sent events. When can we talk more?",
      timestamp: "2:30 PM",
      sentiment: "interested"
    }
  ],
  "3": [
    {
      id: "3-1",
      sender: "recruiter",
      text: "Hi Emily! Your combination of technical skills and design experience is exactly what we're looking for. Would you be interested in a Senior Frontend role?",
      timestamp: "9:00 AM"
    },
    {
      id: "3-2",
      sender: "candidate",
      text: "Hi there. Thanks for reaching out. I'm currently pretty happy in my role, but I'm always curious to hear about interesting opportunities.",
      timestamp: "11:30 AM",
      sentiment: "neutral"
    },
    {
      id: "3-3",
      sender: "recruiter",
      text: "I completely understand! This role offers the chance to shape our entire design system and work closely with our product team. Would you be open to a brief chat to learn more?",
      timestamp: "11:35 AM"
    },
    {
      id: "3-4",
      sender: "candidate",
      text: "Design systems are definitely my passion. Sure, I'd be open to a brief conversation to learn more about what you're building.",
      timestamp: "12:00 PM",
      sentiment: "interested"
    }
  ],
  "4": [
    {
      id: "4-1",
      sender: "recruiter",
      text: "Hello David! I see you have strong TypeScript experience. We're building something exciting and think your skills could be valuable.",
      timestamp: "3:00 PM"
    },
    {
      id: "4-2",
      sender: "candidate",
      text: "Thanks for the message. I noticed the role requires React - I've been primarily working with Angular. Is that a dealbreaker?",
      timestamp: "3:30 PM",
      sentiment: "neutral"
    },
    {
      id: "4-3",
      sender: "recruiter",
      text: "Not at all! Your TypeScript foundation is solid, and many concepts transfer. We're happy to support your transition to React. What matters most is your engineering mindset.",
      timestamp: "3:35 PM"
    },
    {
      id: "4-4",
      sender: "candidate",
      text: "That's great to hear! I've actually been learning React in my spare time and I'm excited about the ecosystem. Let's definitely talk more.",
      timestamp: "3:45 PM",
      sentiment: "interested"
    }
  ],
  "5": [
    {
      id: "5-1",
      sender: "recruiter",
      text: "Hi Jessica! Your full-stack background is interesting. We have a frontend-focused role that might help you specialize further.",
      timestamp: "4:00 PM"
    },
    {
      id: "5-2",
      sender: "candidate",
      text: "Hi. I appreciate you reaching out, but I'm actually looking to move more into backend development, not frontend.",
      timestamp: "5:00 PM",
      sentiment: "not_interested"
    },
    {
      id: "5-3",
      sender: "recruiter",
      text: "I understand! If your interests change or we have backend roles open up, I'd love to stay in touch. Best of luck with your career goals!",
      timestamp: "5:05 PM"
    },
    {
      id: "5-4",
      sender: "candidate",
      text: "Thanks for understanding. I'll keep you in mind if my priorities shift. Good luck with the search!",
      timestamp: "5:30 PM",
      sentiment: "neutral"
    }
  ],
  "6": [
    {
      id: "6-1",
      sender: "recruiter",
      text: "Hello Alex! I see you're early in your career. We have a Junior Frontend position that could be a great learning opportunity.",
      timestamp: "1:00 PM"
    },
    {
      id: "6-2",
      sender: "candidate",
      text: "Hi! Thanks so much for reaching out! I've been self-teaching React and would LOVE the opportunity to work with modern technologies professionally!",
      timestamp: "1:05 PM",
      sentiment: "interested"
    },
    {
      id: "6-3",
      sender: "recruiter",
      text: "That enthusiasm is great! Tell me more about what you've been building while learning React.",
      timestamp: "1:10 PM"
    },
    {
      id: "6-4",
      sender: "candidate",
      text: "I've built a few personal projects including a task manager and a weather app. I know I have a lot to learn but I'm committed to growing!",
      timestamp: "1:20 PM",
      sentiment: "interested"
    }
  ]
}
