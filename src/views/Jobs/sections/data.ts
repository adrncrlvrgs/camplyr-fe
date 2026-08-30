// sections/data.ts
export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  postedAt: string;
  isNew: boolean;
  description: string;
  requirements: string[];
};

export const jobs: Job[] = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "Camplyr Technologies",
    location: "Remote",
    type: "Full-time",
    salary: "$90k – $120k",
    postedAt: "2d ago",
    isNew: true,
    description:
      "Build modern web applications using React, TypeScript, Tailwind CSS, and collaborate with designers and backend engineers to deliver a great user experience.",
    requirements: [
      "3+ years building production React applications",
      "Strong grasp of TypeScript and component architecture",
      "Comfortable working directly with design and backend teams",
    ],
  },
  {
    id: "2",
    title: "Product Designer",
    company: "Northwind Labs",
    location: "New York, NY",
    type: "Full-time",
    salary: "$100k – $130k",
    postedAt: "4d ago",
    isNew: true,
    description:
      "Own end-to-end product design for our core platform, from early concepts to polished, shippable interfaces.",
    requirements: [
      "Portfolio showing shipped product work",
      "Fluency in Figma and design systems thinking",
      "Comfortable presenting and defending design decisions",
    ],
  },
  {
    id: "3",
    title: "Backend Engineer",
    company: "Solstice Data",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$110k – $145k",
    postedAt: "6d ago",
    isNew: false,
    description:
      "Design and maintain the services powering our analytics pipeline, with a focus on reliability and clean data modeling.",
    requirements: [
      "Experience with Node.js in production",
      "Solid understanding of relational database design",
      "Comfortable owning a service end to end",
    ],
  },
  {
    id: "4",
    title: "DevOps Engineer",
    company: "Camplyr Technologies",
    location: "Remote",
    type: "Contract",
    salary: "$70 – $95/hr",
    postedAt: "1w ago",
    isNew: false,
    description:
      "Help us harden our deployment pipeline and infrastructure as we scale to new markets.",
    requirements: [
      "Hands-on experience with AWS and Terraform",
      "Track record improving CI/CD pipelines",
      "Available for a 3-month initial engagement",
    ],
  },
  {
    id: "5",
    title: "Customer Success Manager",
    company: "Harbor & Co.",
    location: "Chicago, IL",
    type: "Full-time",
    salary: "$65k – $85k",
    postedAt: "1w ago",
    isNew: false,
    description:
      "Be the primary point of contact for a portfolio of accounts, guiding them from onboarding through renewal.",
    requirements: [
      "2+ years in a customer-facing SaaS role",
      "Excellent written and verbal communication",
      "Comfortable owning renewal and expansion conversations",
    ],
  },
];