export interface Candidate {
  id: string
  name: string
  role: string
  skills: string[]
  matchedSkills: string[]
  missingSkills: string[]
  experience: number
  location: string
  avatar?: string
  skillMatchScore: number
  experienceMatchScore: number
  locationMatchScore: number
  matchScore: number
  interestScore: number
  finalScore: number
  whyThisCandidate: string
  interestAssessment: string
  chatSimulation: {
    recruiterMessage: string
    candidateReply: string
    interestLevel: "High" | "Medium" | "Low"
  }
}

export interface ChatMessage {
  id: string
  sender: "recruiter" | "candidate"
  text: string
  timestamp: string
  sentiment?: "interested" | "neutral" | "not_interested"
}

export const pipelineSteps = [
  { id: 1, text: "Parsing job description...", duration: 400 },
  { id: 2, text: "Extracting required skills...", duration: 500 },
  { id: 3, text: "Generating candidate pool...", duration: 600 },
  { id: 4, text: "Filtering irrelevant candidates...", duration: 400 },
  { id: 5, text: "Scoring candidates...", duration: 700 },
  { id: 6, text: "Ranking candidates...", duration: 300 },
  { id: 7, text: "Validation complete", duration: 200 },
]

export const extractedSkills = [
  "React", "TypeScript", "Node.js", "MongoDB", "GraphQL", "REST APIs", "Git", "Agile"
]

export const mockCandidates: Candidate[] = [
  {
    id: "1",
    name: "Sarah Chen",
    role: "Senior Frontend Developer",
    skills: ["React", "TypeScript", "Next.js", "GraphQL", "Node.js", "Jest"],
    matchedSkills: ["React", "TypeScript", "Node.js", "GraphQL"],
    missingSkills: ["MongoDB"],
    experience: 6,
    location: "San Francisco, CA",
    skillMatchScore: 92,
    experienceMatchScore: 95,
    locationMatchScore: 100,
    matchScore: 94,
    interestScore: 91,
    finalScore: 93,
    whyThisCandidate: "Strong React and TypeScript expertise with 6 years of experience. Previously led frontend teams at two startups and has open-source contributions to popular React libraries. Perfect alignment with technical requirements.",
    interestAssessment: "Showed strong enthusiasm during initial outreach. Currently exploring senior roles and mentioned interest in AI-powered products.",
    chatSimulation: {
      recruiterMessage: "Hi Sarah! Your React expertise and leadership experience caught our attention. Would you be interested in a Senior Frontend role?",
      candidateReply: "Thanks for reaching out! I've been following your company's work in the AI space. I'd love to learn more about the role and team.",
      interestLevel: "High"
    }
  },
  {
    id: "2",
    name: "Marcus Johnson",
    role: "Full Stack Developer",
    skills: ["React", "Node.js", "Express", "MongoDB", "PostgreSQL", "AWS"],
    matchedSkills: ["React", "Node.js", "MongoDB"],
    missingSkills: ["TypeScript", "GraphQL"],
    experience: 5,
    location: "Austin, TX",
    skillMatchScore: 78,
    experienceMatchScore: 85,
    locationMatchScore: 90,
    matchScore: 82,
    interestScore: 88,
    finalScore: 85,
    whyThisCandidate: "Solid full-stack experience with strong backend skills. MongoDB expertise is valuable. Minor gap in TypeScript but shows quick learning ability based on recent certifications.",
    interestAssessment: "Actively job searching and responded within hours. Expressed excitement about the role scope and company culture.",
    chatSimulation: {
      recruiterMessage: "Hello Marcus! Your full-stack background looks impressive. We have an exciting opportunity that combines frontend and backend work.",
      candidateReply: "Hey! I'm definitely interested. I've been wanting to work on more frontend-heavy projects. What's the tech stack like?",
      interestLevel: "High"
    }
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    role: "Backend Developer",
    skills: ["Node.js", "Express", "MongoDB", "Redis", "Docker", "Kubernetes"],
    matchedSkills: ["Node.js", "MongoDB"],
    missingSkills: ["React", "TypeScript", "GraphQL"],
    experience: 4,
    location: "New York, NY",
    skillMatchScore: 55,
    experienceMatchScore: 75,
    locationMatchScore: 95,
    matchScore: 68,
    interestScore: 72,
    finalScore: 70,
    whyThisCandidate: "Strong backend fundamentals with DevOps experience. Would need frontend training but has expressed interest in transitioning to full-stack role.",
    interestAssessment: "Open to the opportunity but mentioned preference for backend-focused roles. Willing to consider if growth path includes backend work.",
    chatSimulation: {
      recruiterMessage: "Hi Emily! Your backend expertise is impressive. We're looking for someone who could grow into a full-stack role.",
      candidateReply: "Thanks for the message. I'm interested in expanding my skills, though my passion is really backend architecture. Can we discuss the balance?",
      interestLevel: "Medium"
    }
  },
  {
    id: "4",
    name: "David Park",
    role: "Data Scientist",
    skills: ["Python", "TensorFlow", "PyTorch", "SQL", "Machine Learning", "NLP"],
    matchedSkills: [],
    missingSkills: ["React", "TypeScript", "Node.js", "MongoDB", "GraphQL"],
    experience: 3,
    location: "Seattle, WA",
    skillMatchScore: 25,
    experienceMatchScore: 60,
    locationMatchScore: 85,
    matchScore: 42,
    interestScore: 65,
    finalScore: 52,
    whyThisCandidate: "Wrong skill set for this role but strong analytical background. Could be valuable for future ML/AI positions. Python experience could transfer to Node.js with training.",
    interestAssessment: "Interested in the company but acknowledged the role isn't aligned with current expertise. Open to future opportunities.",
    chatSimulation: {
      recruiterMessage: "Hello David! While this role is frontend-focused, your ML background is valuable. Would you consider a hybrid role?",
      candidateReply: "I appreciate the outreach! I'm primarily focused on data science roles, but I'd be happy to stay connected for future opportunities.",
      interestLevel: "Low"
    }
  },
  {
    id: "5",
    name: "Priya Patel",
    role: "DevOps Engineer",
    skills: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD", "Python"],
    matchedSkills: ["Git"],
    missingSkills: ["React", "TypeScript", "Node.js", "MongoDB", "GraphQL"],
    experience: 7,
    location: "Denver, CO",
    skillMatchScore: 20,
    experienceMatchScore: 90,
    locationMatchScore: 80,
    matchScore: 45,
    interestScore: 35,
    finalScore: 41,
    whyThisCandidate: "Excellent DevOps expertise but not aligned with frontend development requirements. Strong experience could be valuable for infrastructure roles.",
    interestAssessment: "Politely declined due to role mismatch. Would prefer to stay in DevOps/SRE domain.",
    chatSimulation: {
      recruiterMessage: "Hi Priya! Your infrastructure experience is impressive. We have a role that could use your expertise.",
      candidateReply: "Thank you, but I'm really focused on DevOps and platform engineering. This doesn't seem like the right fit for me.",
      interestLevel: "Low"
    }
  },
  {
    id: "6",
    name: "James Wilson",
    role: "UI/UX Designer",
    skills: ["Figma", "Sketch", "HTML", "CSS", "JavaScript", "Design Systems"],
    matchedSkills: ["JavaScript"],
    missingSkills: ["React", "TypeScript", "Node.js", "MongoDB", "GraphQL"],
    experience: 5,
    location: "Portland, OR",
    skillMatchScore: 30,
    experienceMatchScore: 80,
    locationMatchScore: 85,
    matchScore: 52,
    interestScore: 78,
    finalScore: 63,
    whyThisCandidate: "Strong design background with some frontend coding experience. Could potentially grow into a design engineer role with proper mentorship.",
    interestAssessment: "Interested in transitioning from pure design to more technical work. Eager to learn React and modern frontend development.",
    chatSimulation: {
      recruiterMessage: "Hello James! Your design expertise combined with coding skills is valuable. Would you be interested in a design engineer role?",
      candidateReply: "That sounds interesting! I've been wanting to bridge the gap between design and development. Tell me more about the technical expectations.",
      interestLevel: "Medium"
    }
  },
  {
    id: "7",
    name: "Lisa Thompson",
    role: "QA Engineer",
    skills: ["Selenium", "Jest", "Cypress", "JavaScript", "Agile", "JIRA"],
    matchedSkills: ["JavaScript", "Agile"],
    missingSkills: ["React", "TypeScript", "Node.js", "MongoDB", "GraphQL"],
    experience: 4,
    location: "Chicago, IL",
    skillMatchScore: 35,
    experienceMatchScore: 70,
    locationMatchScore: 75,
    matchScore: 50,
    interestScore: 82,
    finalScore: 64,
    whyThisCandidate: "Testing expertise could be valuable for quality assurance needs. JavaScript knowledge provides foundation for frontend transition if desired.",
    interestAssessment: "Very enthusiastic about moving into development. Has been self-studying React and TypeScript in free time.",
    chatSimulation: {
      recruiterMessage: "Hi Lisa! Your QA background and JavaScript skills are interesting. We have a frontend role that values quality-focused developers.",
      candidateReply: "I've been hoping for an opportunity like this! I've built a few personal React projects and would love to make the transition.",
      interestLevel: "High"
    }
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
      text: "Hello Marcus! Your full-stack experience caught my attention. We're looking for developers who can work across the entire stack.",
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
      text: "You'd be working on our AI-powered recruitment platform, building features for both recruiters and candidates. Lots of complex state management and real-time features.",
      timestamp: "2:18 PM"
    },
    {
      id: "2-4",
      sender: "candidate",
      text: "Real-time features sound exciting! I've been wanting to dive deeper into WebSockets. When can we talk more?",
      timestamp: "2:30 PM",
      sentiment: "interested"
    }
  ],
  "3": [
    {
      id: "3-1",
      sender: "recruiter",
      text: "Hi Emily! Your backend expertise is impressive. We have a role that could help you expand into full-stack development.",
      timestamp: "9:00 AM"
    },
    {
      id: "3-2",
      sender: "candidate",
      text: "Hi there. Thanks for reaching out. I'm open to hearing more, though my strength is really on the backend side.",
      timestamp: "11:30 AM",
      sentiment: "neutral"
    },
    {
      id: "3-3",
      sender: "recruiter",
      text: "I completely understand! This role does have significant backend work as well. Would you be open to a brief chat?",
      timestamp: "11:35 AM"
    },
    {
      id: "3-4",
      sender: "candidate",
      text: "Sure, I'd be open to learning more about the backend aspects and how the role could evolve.",
      timestamp: "12:00 PM",
      sentiment: "interested"
    }
  ],
  "4": [
    {
      id: "4-1",
      sender: "recruiter",
      text: "Hello David! Your data science background is impressive. We're building AI-powered products and value ML expertise.",
      timestamp: "3:00 PM"
    },
    {
      id: "4-2",
      sender: "candidate",
      text: "Thanks for the message. I noticed the role is frontend-focused - is there an ML component I'm missing?",
      timestamp: "3:30 PM",
      sentiment: "neutral"
    },
    {
      id: "4-3",
      sender: "recruiter",
      text: "This particular role is more frontend, but we'd love to keep you in mind for future data science positions.",
      timestamp: "3:35 PM"
    },
    {
      id: "4-4",
      sender: "candidate",
      text: "I appreciate that. Please do keep me posted on any ML/AI roles that open up!",
      timestamp: "3:45 PM",
      sentiment: "neutral"
    }
  ],
  "5": [
    {
      id: "5-1",
      sender: "recruiter",
      text: "Hi Priya! Your DevOps experience is top-notch. We're looking at infrastructure needs as well.",
      timestamp: "4:00 PM"
    },
    {
      id: "5-2",
      sender: "candidate",
      text: "Hi. I appreciate you reaching out, but this seems like a frontend role. I'm focused on staying in DevOps.",
      timestamp: "5:00 PM",
      sentiment: "not_interested"
    },
    {
      id: "5-3",
      sender: "recruiter",
      text: "I understand! If we have infrastructure roles open up, I'd love to connect. Best of luck!",
      timestamp: "5:05 PM"
    },
    {
      id: "5-4",
      sender: "candidate",
      text: "Thanks for understanding. Good luck with the search!",
      timestamp: "5:30 PM",
      sentiment: "neutral"
    }
  ],
  "6": [
    {
      id: "6-1",
      sender: "recruiter",
      text: "Hello James! Your design skills combined with frontend knowledge are exactly what we need for a design engineer role.",
      timestamp: "1:00 PM"
    },
    {
      id: "6-2",
      sender: "candidate",
      text: "Hi! That's interesting. I've been wanting to get more into the technical side. What would the role entail?",
      timestamp: "1:15 PM",
      sentiment: "interested"
    },
    {
      id: "6-3",
      sender: "recruiter",
      text: "You'd be building and maintaining our design system in code, working closely with both design and engineering teams.",
      timestamp: "1:20 PM"
    },
    {
      id: "6-4",
      sender: "candidate",
      text: "That sounds like a great growth opportunity. I'd like to discuss the technical expectations further.",
      timestamp: "1:30 PM",
      sentiment: "interested"
    }
  ],
  "7": [
    {
      id: "7-1",
      sender: "recruiter",
      text: "Hi Lisa! Your QA background and JavaScript skills are interesting. We have a frontend role that values quality-focused developers.",
      timestamp: "11:00 AM"
    },
    {
      id: "7-2",
      sender: "candidate",
      text: "Hi! I've been hoping for an opportunity like this! I've built a few personal React projects and would love to make the transition.",
      timestamp: "11:10 AM",
      sentiment: "interested"
    },
    {
      id: "7-3",
      sender: "recruiter",
      text: "That's great to hear! We value candidates who understand testing and quality from day one.",
      timestamp: "11:15 AM"
    },
    {
      id: "7-4",
      sender: "candidate",
      text: "Exactly! I think my QA background gives me a unique perspective on building reliable software. When can we chat?",
      timestamp: "11:25 AM",
      sentiment: "interested"
    }
  ]
}
