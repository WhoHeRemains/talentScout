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
  recommendation: "Highly Recommended" | "Recommended" | "Maybe" | "Not Recommended"
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
  { id: 1, text: "Parsing job description", duration: 400 },
  { id: 2, text: "Extracting required skills", duration: 500 },
  { id: 3, text: "Generating candidate pool (55 candidates)", duration: 600 },
  { id: 4, text: "Filtering irrelevant candidates", duration: 400 },
  { id: 5, text: "Scoring candidates", duration: 700 },
  { id: 6, text: "Ranking by final score", duration: 300 },
  { id: 7, text: "Validation complete", duration: 200 },
]

export const extractedSkills = [
  "React", "TypeScript", "Node.js", "MongoDB", "GraphQL", "REST APIs", "Git", "Agile"
]

const firstNames = [
  "Sarah", "Marcus", "Emily", "David", "Priya", "James", "Lisa", "Michael",
  "Jennifer", "Robert", "Amanda", "Christopher", "Jessica", "Daniel", "Ashley",
  "Matthew", "Nicole", "Andrew", "Stephanie", "Joshua", "Melissa", "Ryan",
  "Elizabeth", "Brandon", "Rachel", "Kevin", "Laura", "Justin", "Michelle",
  "Brian", "Kimberly", "Eric", "Angela", "Steven", "Rebecca", "Timothy",
  "Samantha", "Jason", "Heather", "Jeffrey", "Katherine", "Adam", "Christina",
  "Nathan", "Brittany", "Benjamin", "Lauren", "Patrick", "Andrea", "Tyler",
  "Danielle", "Alexander", "Megan", "Nicholas", "Victoria", "Aaron"
]

const lastNames = [
  "Chen", "Johnson", "Rodriguez", "Park", "Patel", "Wilson", "Thompson",
  "Martinez", "Williams", "Brown", "Davis", "Garcia", "Miller", "Anderson",
  "Taylor", "Thomas", "Moore", "Jackson", "White", "Harris", "Martin",
  "Lee", "Clark", "Lewis", "Walker", "Hall", "Allen", "Young", "King",
  "Wright", "Scott", "Green", "Baker", "Adams", "Nelson", "Hill", "Campbell",
  "Mitchell", "Roberts", "Carter", "Phillips", "Evans", "Turner", "Torres",
  "Parker", "Collins", "Edwards", "Stewart", "Morris", "Murphy", "Rivera"
]

const roles = [
  "Senior Frontend Developer", "Full Stack Developer", "Backend Developer",
  "React Developer", "Software Engineer", "Frontend Engineer", "UI Developer",
  "JavaScript Developer", "TypeScript Developer", "Node.js Developer",
  "Staff Engineer", "Lead Developer", "Principal Engineer", "Tech Lead",
  "Application Developer", "Platform Engineer", "Web Developer"
]

const locations = [
  "San Francisco, CA", "New York, NY", "Austin, TX", "Seattle, WA",
  "Denver, CO", "Boston, MA", "Chicago, IL", "Los Angeles, CA",
  "Portland, OR", "Miami, FL", "Atlanta, GA", "Remote", "Dallas, TX",
  "Phoenix, AZ", "San Diego, CA", "Philadelphia, PA", "Minneapolis, MN"
]

const allSkills = [
  "React", "TypeScript", "JavaScript", "Node.js", "MongoDB", "GraphQL",
  "REST APIs", "Git", "Agile", "Next.js", "Vue.js", "Angular", "Python",
  "AWS", "Docker", "Kubernetes", "PostgreSQL", "Redis", "Jest", "Cypress",
  "Tailwind CSS", "CSS", "HTML", "Express", "NestJS", "Prisma", "Redux",
  "React Query", "Webpack", "Vite", "CI/CD", "Terraform", "MySQL", "Firebase"
]

const requiredSkills = ["React", "TypeScript", "Node.js", "MongoDB", "GraphQL", "REST APIs", "Git", "Agile"]

function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

function getRandomItems<T>(array: T[], min: number, max: number): T[] {
  const count = Math.floor(Math.random() * (max - min + 1)) + min
  const shuffled = [...array].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

function generateCandidate(id: number): Candidate {
  const firstName = getRandomItem(firstNames)
  const lastName = getRandomItem(lastNames)
  const name = `${firstName} ${lastName}`
  const role = getRandomItem(roles)
  const location = getRandomItem(locations)
  const experience = Math.floor(Math.random() * 12) + 1
  
  // Generate skills with some overlap with required skills
  const candidateSkills = getRandomItems(allSkills, 4, 8)
  const matchedSkills = candidateSkills.filter(s => requiredSkills.includes(s))
  const missingSkills = requiredSkills.filter(s => !candidateSkills.includes(s))
  
  // Calculate scores based on skill match and other factors
  const skillMatchScore = Math.round((matchedSkills.length / requiredSkills.length) * 100)
  const experienceMatchScore = Math.min(100, Math.round(experience * 12 + Math.random() * 20))
  const locationMatchScore = location === "Remote" ? 100 : Math.floor(Math.random() * 30) + 70
  
  // Weight the scores
  const matchScore = Math.round(skillMatchScore * 0.6 + experienceMatchScore * 0.25 + locationMatchScore * 0.15)
  const interestScore = Math.floor(Math.random() * 60) + 40
  const finalScore = Math.round(matchScore * 0.6 + interestScore * 0.4)
  
  let recommendation: Candidate["recommendation"]
  if (finalScore >= 80) recommendation = "Highly Recommended"
  else if (finalScore >= 65) recommendation = "Recommended"
  else if (finalScore >= 50) recommendation = "Maybe"
  else recommendation = "Not Recommended"
  
  let interestLevel: "High" | "Medium" | "Low"
  if (interestScore >= 75) interestLevel = "High"
  else if (interestScore >= 55) interestLevel = "Medium"
  else interestLevel = "Low"
  
  return {
    id: id.toString(),
    name,
    role,
    skills: candidateSkills,
    matchedSkills,
    missingSkills,
    experience,
    location,
    skillMatchScore,
    experienceMatchScore,
    locationMatchScore,
    matchScore,
    interestScore,
    finalScore,
    recommendation,
    whyThisCandidate: `${name} brings ${experience} years of experience with ${matchedSkills.length > 0 ? matchedSkills.slice(0, 3).join(", ") : "relevant skills"}. ${matchedSkills.length >= 4 ? "Strong alignment with technical requirements." : missingSkills.length > 3 ? "Would need training on some core technologies." : "Shows potential with some skill gaps to address."}`,
    interestAssessment: interestScore >= 75 
      ? "Highly responsive and enthusiastic about the opportunity. Quick response time and asked detailed questions."
      : interestScore >= 55
      ? "Moderately interested. Willing to explore but has some reservations about the role scope."
      : "Limited interest shown. May be passively looking or not aligned with role expectations.",
    chatSimulation: {
      recruiterMessage: `Hi ${firstName}! Your experience with ${matchedSkills[0] || "software development"} caught our attention. Would you be interested in discussing a ${role} opportunity?`,
      candidateReply: interestLevel === "High"
        ? "Thanks for reaching out! I've been looking for exactly this kind of opportunity. When can we talk?"
        : interestLevel === "Medium"
        ? "Thanks for the message. I'm open to hearing more about the role and team."
        : "I appreciate the outreach, but I'm not actively looking at the moment.",
      interestLevel
    }
  }
}

// Generate 55 candidates
export const mockCandidates: Candidate[] = Array.from({ length: 55 }, (_, i) => generateCandidate(i + 1))
  .sort((a, b) => b.finalScore - a.finalScore)

// Generate chat messages for top candidates
export const mockChatMessages: Record<string, ChatMessage[]> = {}

mockCandidates.slice(0, 15).forEach(candidate => {
  const sentiment = candidate.interestScore >= 75 ? "interested" : candidate.interestScore >= 55 ? "neutral" : "not_interested"
  mockChatMessages[candidate.id] = [
    {
      id: `${candidate.id}-1`,
      sender: "recruiter",
      text: candidate.chatSimulation.recruiterMessage,
      timestamp: "10:30 AM"
    },
    {
      id: `${candidate.id}-2`,
      sender: "candidate",
      text: candidate.chatSimulation.candidateReply,
      timestamp: "10:45 AM",
      sentiment
    },
    {
      id: `${candidate.id}-3`,
      sender: "recruiter",
      text: "Great! Let me share more details about the role and our tech stack.",
      timestamp: "10:48 AM"
    },
    {
      id: `${candidate.id}-4`,
      sender: "candidate",
      text: sentiment === "interested" 
        ? "That sounds exciting! I'd love to schedule a call to discuss further."
        : sentiment === "neutral"
        ? "Sure, I'd be open to learning more about the specifics."
        : "Thanks for the info. I'll let you know if my situation changes.",
      timestamp: "11:00 AM",
      sentiment
    }
  ]
})
