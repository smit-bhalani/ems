export const users = [
  // ---------------- ADMIN ----------------
  {
    id: 1,
    email: "admin@ems.com",
    password: "123456",
    role: "admin",
    name: "Alice Admin",
    department: "Administration",
    salary: 120000
  },

  // ---------------- TEAM LEADS ----------------
  {
    id: 2,
    email: "lead@ems.com",
    password: "123456",
    role: "teamlead",
    name: "Bob Lead",
    department: "Fullstack Lead Developer",
    salary: 90000
  },
  {
    id: 4,
    email: "frontend.lead@ems.com",
    password: "123456",
    role: "teamlead",
    name: "Diana Frontend",
    department: "Frontend Team Lead",
    salary: 85000
  },
  {
    id: 5,
    email: "backend.lead@ems.com",
    password: "123456",
    role: "teamlead",
    name: "Ethan Backend",
    department: "Backend Team Lead",
    salary: 88000
  },
  {
    id: 6,
    email: "qa.lead@ems.com",
    password: "123456",
    role: "teamlead",
    name: "Fiona QA",
    department: "QA Team Lead",
    salary: 80000
  },

  // ---------------- EMPLOYEES ----------------
  {
    id: 3,
    email: "employee@ems.com",
    password: "123456",
    role: "employee",
    name: "Charlie Employee",
    department: "React Developer",
    teamLeadId: 2,
    salary: 60000
  },
  {
    id: 7,
    email: "react.dev@ems.com",
    password: "123456",
    role: "employee",
    name: "George React",
    department: "React Developer",
    teamLeadId: 4,
    salary: 62000
  },
  {
    id: 8,
    email: "node.dev@ems.com",
    password: "123456",
    role: "employee",
    name: "Hannah Node",
    department: "Node.js Developer",
    teamLeadId: 5,
    salary: 65000
  },
  {
    id: 9,
    email: "uiux@ems.com",
    password: "123456",
    role: "employee",
    name: "Ian UI",
    department: "UI/UX Designer",
    teamLeadId: 4,
    salary: 58000
  },
  {
    id: 10,
    email: "qa@ems.com",
    password: "123456",
    role: "employee",
    name: "Julia QA",
    department: "QA Engineer",
    teamLeadId: 6,
    salary: 55000
  },
  {
    id: 11,
    email: "intern@ems.com",
    password: "123456",
    role: "employee",
    name: "Kevin Intern",
    department: "Frontend Intern",
    teamLeadId: 4,
    salary: 30000
  }
];
