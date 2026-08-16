// STEM Quest Learning Lab — Site Dataset

export const company = {
  name: 'STEM Quest Learning Lab',
  tagline: 'Unveiling Potential Through STEM Education',
  mission: 'Unveiling potential in every learner through excellence in STEM education, mentorship, and innovation.',
  location: 'South Africa',
  email: 'info@stemquestlab.sz',
  phone: '+27 XX XXX XXXX',
  year: 2025,
}

export const founders = [
  {
    id: 1,
    name: 'Linda Zwelakhe Dlamini',
    role: 'Founder & Lead Educator',
    experience: '16 years Physical Science teaching in South Africa + 10 years coding & robotics curriculum design and delivery in South Africa',
    strengths: [
      'Self-developed, CAPS-aligned, progression-based coding & robotics curriculum',
      'Foundation Phase (Grade R) through Senior Phase (Grade 11)',
      'Tools: Code & Go, Scratch, Micro:bit, FLL, Arduino, Python',
      'Practitioner-innovator with real-world delivery expertise',
    ],
    bio: 'Linda brings 26 years of combined teaching and EdTech delivery experience, a proven curriculum, and school partnership methodology. His track record in South Africa — designing and delivering coding and robotics programmes from the ground up — is the foundation of STEM Quest\'s credibility.',
  },
  {
    id: 2,
    name: 'Thandolwethu Carlos Magaya',
    role: 'Co-Founder & Technical Lead',
    experience: 'IT Student, South Africa Medical Christian University / Limkokwing University, South Africa',
    strengths: [
      'Technical infrastructure, systems development, digital platforms',
      'Academic IT credentials and technical grounding',
      'South Africa-based with institutional networks and local technology landscape knowledge',
    ],
    bio: 'Thandolwethu provides the academic IT credential and technical capacity that complements Linda\'s pedagogy expertise, ensuring a complete EdTech founding team — pedagogy + technology + context.',
  },
]

export const curriculumPhases = [
  {
    phase: 'Foundation Phase',
    tools: 'Code & Go Mouse, Unplugged Activities',
    skills: 'Sequencing, logical thinking',
    extras: 'Project help, parental engagement',
  },
  {
    phase: 'Intermediate Phase',
    tools: 'Scratch Jr, Scratch 3, FLL Explore',
    skills: 'Algorithms, loops, robotics design',
    extras: 'School showcase events',
  },
  {
    phase: 'Senior Phase',
    tools: 'Arduino, Python, FLL Challenge',
    skills: 'Electronics, programming, real-world problem solving',
    extras: 'Physics & Life Science integration',
  },
]

export const services = [
  {
    id: 'school-partnerships',
    title: 'School Partnerships',
    description: 'Embedded, timetable-integrated STEM delivery across multiple grades under a monthly retainer contract. Structured transformation, not isolated sessions.',
    icon: 'School',
  },
  {
    id: 'robotics-clubs',
    title: 'After-School Robotics Clubs',
    description: 'Structured co-curricular programme for learners seeking deeper engagement in coding and robotics beyond the school timetable.',
    icon: 'Bot',
  },
  {
    id: 'teacher-training',
    title: 'Teacher Training Workshops',
    description: 'Equipping educators with the pedagogical tools and confidence to sustain STEM delivery independently in their classrooms.',
    icon: 'GraduationCap',
  },
  {
    id: 'holiday-bootcamps',
    title: 'Holiday Bootcamps',
    description: 'Intensive innovation and coding camps during school holidays — project-based learning that produces tangible learner outcomes.',
    icon: 'Rocket',
  },
]

export const packages = [
  {
    id: 'bronze',
    name: 'Bronze Package',
    monthlyFee: 12000,
    currency: 'R',
    sessionsPerWeek: 4,
    gradesCovered: 'Up to 2 grades',
    teacherTraining: false,
    roboticsClub: false,
    assessment: 'Termly report',
    popular: false,
  },
  {
    id: 'silver',
    name: 'Silver Package',
    monthlyFee: 18000,
    currency: 'R',
    sessionsPerWeek: 6,
    gradesCovered: '3–4 grades',
    teacherTraining: 'Monthly support',
    roboticsClub: false,
    assessment: 'Termly report',
    popular: true,
  },
  {
    id: 'gold',
    name: 'Gold Package',
    monthlyFee: 25000,
    currency: 'R',
    sessionsPerWeek: 8,
    gradesCovered: 'Full intermediate phase',
    teacherTraining: 'Included',
    roboticsClub: true,
    assessment: 'Full portfolio + showcase',
    popular: false,
  },
]

export const revenueStreams = [
  { stream: 'School Contracts (4 schools)', unitPrice: 'R 9,600/school', monthlyVolume: '4 schools', monthlyRevenue: 'R 38,400' },
  { stream: 'After-School Robotics Clubs', unitPrice: 'R 500/learner', monthlyVolume: '30 learners', monthlyRevenue: 'R 15,000' },
  { stream: 'Teacher Training Workshops', unitPrice: 'R 6,000/workshop', monthlyVolume: '1 workshop', monthlyRevenue: 'R 6,000' },
  { stream: 'Holiday Bootcamps / Private', unitPrice: 'R 5,000 est.', monthlyVolume: 'Quarterly', monthlyRevenue: 'R 5,000+' },
]

export const problemPoints = [
  'The majority of South Africa\'s schools lack structured, progressive coding or robotics programmes beyond occasional, isolated initiatives.',
  'Teachers at primary and secondary level have received little to no training in computational thinking, digital literacy, or robotics pedagogy.',
  'Learners exit basic education without the problem-solving and technology skills demanded by regional and global labour markets.',
  'There is no established, scalable EdTech enterprise delivering structured STEM education to schools across South Africa in a commercially viable and replicable model.',
]

export const valuePillars = [
  {
    title: 'Structured Transformation',
    description: 'Not isolated coding sessions, but a progressive, assessment-tracked programme that develops genuine computational thinking over time.',
  },
  {
    title: 'Institutional Credibility',
    description: 'Schools partner with a professional, contractual STEM delivery organisation, not an informal tutor.',
  },
  {
    title: 'Competitive Differentiation',
    description: "Schools that implement STEM Quest's programs are positioned as forward-thinking institutions, strengthening their market appeal to families.",
  },
]

export const implementationPhases = [
  { phase: 1, timeline: 'Months 1–3', focus: 'Setup & Pilot', milestones: 'Incubator onboarding, workspace operational, pilot with 2 schools, curriculum finalised' },
  { phase: 2, timeline: 'Months 4–6', focus: 'Revenue Launch', milestones: '3 paid school contracts, 2 robotics clubs active, first teacher workshop delivered' },
  { phase: 3, timeline: 'Months 7–9', focus: 'Scale & Visibility', milestones: '4th school contract, holiday bootcamp, public brand presence established' },
  { phase: 4, timeline: 'Months 10–12', focus: 'Systems & Stability', milestones: 'Team expansion, 3-month emergency savings, documentation for Year 2 growth' },
]

export const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/services', label: 'Services' },
  { path: '/innovation', label: 'Innovation Hub' },
  { path: '/showcase', label: 'Showcase' },
  { path: '/contact', label: 'Contact' },
]
