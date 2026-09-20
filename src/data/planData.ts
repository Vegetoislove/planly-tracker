export interface Task {
  id: string;
  title: string;
  time: string;
}

export interface Day {
  id: string;
  globalDay: number;
  name: string;
  meta: string;
  tasks: Task[];
}

export interface Sprint {
  id: string;
  name: string;
  meta: string;
  days: Day[];
}

export const PLAN_DATA: Sprint[] = [
  {
    "id": "sprint-1",
    "name": "Sprint 1",
    "meta": "•UpcomingEst. 39h 15m · Time spent : 0 sec",
    "days": [
      {
        "id": "sprint-1-day-1",
        "globalDay": 1,
        "name": "Day 1",
        "meta": "Est. 4h 59m",
        "tasks": [
          {
            "id": "task-1",
            "title": "Breaking The Myth",
            "time": "Est. 30 min"
          },
          {
            "id": "task-2",
            "title": "Java Basics",
            "time": "Est. 1h 36m"
          },
          {
            "id": "task-3",
            "title": "Introduction to SQL",
            "time": "Est. 42 min"
          },
          {
            "id": "task-4",
            "title": "Why Do We Need an Operating System?",
            "time": "Est. 22 min"
          },
          {
            "id": "task-5",
            "title": "Why Networks exists",
            "time": "Est. 9 min"
          },
          {
            "id": "task-6",
            "title": "Network Types",
            "time": "Est. 9 min"
          },
          {
            "id": "task-7",
            "title": "Internet and Backbone Networks",
            "time": "Est. 14 min"
          },
          {
            "id": "task-8",
            "title": "Operating System as a Manager",
            "time": "Est. 24 min"
          },
          {
            "id": "task-9",
            "title": "Programming and What Are Computers?",
            "time": "Est. 30 min"
          },
          {
            "id": "task-10",
            "title": "Clients, Servers and Peers",
            "time": "Est. 11 min"
          },
          {
            "id": "task-11",
            "title": "Why SQL Exists",
            "time": "Est. 12 min"
          }
        ]
      },
      {
        "id": "sprint-1-day-2",
        "globalDay": 2,
        "name": "Day 2",
        "meta": "Est. 4h 50m",
        "tasks": [
          {
            "id": "task-12",
            "title": "How data moves in packets",
            "time": "Est. 18 min"
          },
          {
            "id": "task-13",
            "title": "What Happens When We Open an App?",
            "time": "Est. 17 min"
          },
          {
            "id": "task-14",
            "title": "How Databases Work",
            "time": "Est. 19 min"
          },
          {
            "id": "task-15",
            "title": "How to Think Like a Programmer",
            "time": "Est. 30 min"
          },
          {
            "id": "task-16",
            "title": "Why do we need layered Architecture",
            "time": "Est. 9 min"
          },
          {
            "id": "task-17",
            "title": "How Many Apps Run at the Same Time?",
            "time": "Est. 16 min"
          },
          {
            "id": "task-18",
            "title": "OSI Model",
            "time": "Est. 1h 4m"
          },
          {
            "id": "task-19",
            "title": "Database Systems",
            "time": "Est. 10 min"
          },
          {
            "id": "task-20",
            "title": "OS and Protection",
            "time": "Est. 15 min"
          },
          {
            "id": "task-21",
            "title": "Installation and Tools",
            "time": "Est. 16 min"
          },
          {
            "id": "task-22",
            "title": "Flowcharts and Pseudocode",
            "time": "Est. 30 min"
          },
          {
            "id": "task-23",
            "title": "Process Basics",
            "time": "Est. 15 min"
          },
          {
            "id": "task-24",
            "title": "What is OOPS",
            "time": "Est. 16 min"
          },
          {
            "id": "task-25",
            "title": "File Systems vs Database Management Systems",
            "time": "Est. 15 min"
          }
        ]
      },
      {
        "id": "sprint-1-day-3",
        "globalDay": 3,
        "name": "Day 3",
        "meta": "Est. 4h 57m",
        "tasks": [
          {
            "id": "task-26",
            "title": "Program vs. Process vs. Thread",
            "time": "Est. 18 min"
          },
          {
            "id": "task-27",
            "title": "Classes and Objects",
            "time": "Est. 15 min"
          },
          {
            "id": "task-28",
            "title": "Data Abstraction, Schemas, Instances, and Data Independence",
            "time": "Est. 15 min"
          },
          {
            "id": "task-29",
            "title": "Flowchart Problem-Solving",
            "time": "Est. 30 min"
          },
          {
            "id": "task-30",
            "title": "Practice (Classes and Objects)",
            "time": "Est. 45 min"
          },
          {
            "id": "task-31",
            "title": "Process States and Process Control Block",
            "time": "Est. 21 min"
          },
          {
            "id": "task-32",
            "title": "DBMS Components and End-to-End Query Flow",
            "time": "Est. 15 min"
          },
          {
            "id": "task-33",
            "title": "How Data Travels Up the OSI Model",
            "time": "Est. 5 min"
          },
          {
            "id": "task-34",
            "title": "TCP/IP Model",
            "time": "Est. 10 min"
          },
          {
            "id": "task-35",
            "title": "Database Users, Roles, and Deployment Architectures",
            "time": "Est. 15 min"
          },
          {
            "id": "task-36",
            "title": "Process Creation and Termination",
            "time": "Est. 36 min"
          },
          {
            "id": "task-37",
            "title": "OSI vs TCP/IP",
            "time": "Est. 2 min"
          },
          {
            "id": "task-38",
            "title": "Dry Runs, Edge Cases and Debugging",
            "time": "Est. 30 min"
          },
          {
            "id": "task-39",
            "title": "Encapsulation and Decapsulation",
            "time": "Est. 6 min"
          },
          {
            "id": "task-40",
            "title": "Physical Layer",
            "time": "Est. 11 min"
          },
          {
            "id": "task-41",
            "title": "Data Models and Database Families",
            "time": "Est. 15 min"
          },
          {
            "id": "task-42",
            "title": "Transmission Media",
            "time": "Est. 8 min"
          }
        ]
      },
      {
        "id": "sprint-1-day-4",
        "globalDay": 4,
        "name": "Day 4",
        "meta": "Est. 4h 35m",
        "tasks": [
          {
            "id": "task-43",
            "title": "Attributes and Methods",
            "time": "Est. 16 min"
          },
          {
            "id": "task-44",
            "title": "Database & Table Basics",
            "time": "Est. 1h 31m"
          },
          {
            "id": "task-45",
            "title": "Twisted Pair Cable",
            "time": "Est. 11 min"
          },
          {
            "id": "task-46",
            "title": "Programming Languages and Choosing a Path",
            "time": "Est. 30 min"
          },
          {
            "id": "task-47",
            "title": "Scheduling Queues and Schedulers",
            "time": "Est. 17 min"
          },
          {
            "id": "task-48",
            "title": "Fiber Optic Cable",
            "time": "Est. 8 min"
          },
          {
            "id": "task-49",
            "title": "Practice (Attributes and Methods)",
            "time": "Est. 45 min"
          },
          {
            "id": "task-50",
            "title": "Coaxial Cable",
            "time": "Est. 6 min"
          },
          {
            "id": "task-51",
            "title": "Context Switching in OS",
            "time": "Est. 14 min"
          },
          {
            "id": "task-52",
            "title": "Full duplex vs Half duplex",
            "time": "Est. 4 min"
          },
          {
            "id": "task-53",
            "title": "Network Device",
            "time": "Est. 33 min"
          }
        ]
      },
      {
        "id": "sprint-1-day-5",
        "globalDay": 5,
        "name": "Day 5",
        "meta": "Est. 4h 50m",
        "tasks": [
          {
            "id": "task-54",
            "title": "Learn C++",
            "time": "Est. 30 min"
          },
          {
            "id": "task-55",
            "title": "CPU Scheduling Basics",
            "time": "Est. 13 min"
          },
          {
            "id": "task-56",
            "title": "First Come First Serve (FCFS) Scheduling",
            "time": "Est. 9 min"
          },
          {
            "id": "task-57",
            "title": "Constructors",
            "time": "Est. 22 min"
          },
          {
            "id": "task-58",
            "title": "Shortest Job First (SJF) Scheduling",
            "time": "Est. 8 min"
          },
          {
            "id": "task-59",
            "title": "Mac address",
            "time": "Est. 12 min"
          },
          {
            "id": "task-60",
            "title": "Learn Java",
            "time": "Est. 30 min"
          },
          {
            "id": "task-61",
            "title": "Shortest Remaining Time First (SRTF) Scheduling",
            "time": "Est. 14 min"
          },
          {
            "id": "task-62",
            "title": "Error Detection",
            "time": "Est. 17 min"
          },
          {
            "id": "task-63",
            "title": "Practice (Constructors)",
            "time": "Est. 45 min"
          },
          {
            "id": "task-64",
            "title": "Highest Response Ratio Next (HRRN) Scheduling",
            "time": "Est. 8 min"
          },
          {
            "id": "task-65",
            "title": "SQL Basics and Commands",
            "time": "Est. 4 min"
          },
          {
            "id": "task-66",
            "title": "Round Robin (RR) Scheduling",
            "time": "Est. 11 min"
          },
          {
            "id": "task-67",
            "title": "Medium Access and CSMA",
            "time": "Est. 13 min"
          },
          {
            "id": "task-68",
            "title": "Working with Databases in SQL",
            "time": "Est. 9 min"
          },
          {
            "id": "task-69",
            "title": "Learn Python",
            "time": "Est. 30 min"
          },
          {
            "id": "task-70",
            "title": "SQL Data Types",
            "time": "Est. 6 min"
          },
          {
            "id": "task-71",
            "title": "Priority Scheduling",
            "time": "Est. 9 min"
          }
        ]
      },
      {
        "id": "sprint-1-day-6",
        "globalDay": 6,
        "name": "Day 6",
        "meta": "Est. 7h 40m",
        "tasks": [
          {
            "id": "task-72",
            "title": "Address Resolution Protocol",
            "time": "Est. 17 min"
          },
          {
            "id": "task-73",
            "title": "Creating and Managing Tables in SQL",
            "time": "Est. 14 min"
          },
          {
            "id": "task-74",
            "title": "Multilevel Queue (MLQ) Scheduling",
            "time": "Est. 10 min"
          },
          {
            "id": "task-75",
            "title": "Multilevel Feedback Queue (MLFQ) Scheduling",
            "time": "Est. 15 min"
          },
          {
            "id": "task-76",
            "title": "Network Access Control",
            "time": "Est. 8 min"
          },
          {
            "id": "task-77",
            "title": "Primary Key",
            "time": "Est. 18 min"
          },
          {
            "id": "task-78",
            "title": "Easy and Medium",
            "time": "Est. 47 min"
          },
          {
            "id": "task-79",
            "title": "Encapsulation",
            "time": "Est. 8 min"
          },
          {
            "id": "task-80",
            "title": "Why do we need STP?",
            "time": "Est. 30 min"
          },
          {
            "id": "task-81",
            "title": "Practice (Encapsulation)",
            "time": "Est. 45 min"
          },
          {
            "id": "task-82",
            "title": "Kernel in OS",
            "time": "Est. 10 min"
          },
          {
            "id": "task-83",
            "title": "Foreign Key",
            "time": "Est. 18 min"
          },
          {
            "id": "task-84",
            "title": "Types of Operating Systems",
            "time": "Est. 14 min"
          },
          {
            "id": "task-85",
            "title": "Constraints in SQL",
            "time": "Est. 16 min"
          },
          {
            "id": "task-86",
            "title": "Spanning Tree Protocol (STP)",
            "time": "Est. 30 min"
          },
          {
            "id": "task-87",
            "title": "Types of Kernel Structures",
            "time": "Est. 13 min"
          },
          {
            "id": "task-88",
            "title": "Hard",
            "time": "Est. 50 min"
          },
          {
            "id": "task-89",
            "title": "Why OS Schedulers Can't Implement Textbook Scheduling Algorithms",
            "time": "Est. 18 min"
          },
          {
            "id": "task-90",
            "title": "NULL vs 0 vs Empty String",
            "time": "Est. 2 min"
          },
          {
            "id": "task-91",
            "title": "DDL vs DML",
            "time": "Est. 3 min"
          },
          {
            "id": "task-92",
            "title": "Access Modifiers",
            "time": "Est. 17 min"
          },
          {
            "id": "task-93",
            "title": "Query Lifecycle",
            "time": "Est. 4 min"
          },
          {
            "id": "task-94",
            "title": "Indexing in SQL",
            "time": "Est. 14 min"
          },
          {
            "id": "task-95",
            "title": "Network Topologies and VLANs Introduction",
            "time": "Est. 4 min"
          },
          {
            "id": "task-96",
            "title": "Multicore Scheduling",
            "time": "Est. 12 min"
          },
          {
            "id": "task-97",
            "title": "Physical Topologies",
            "time": "Est. 23 min"
          }
        ]
      },
      {
        "id": "sprint-1-day-7",
        "globalDay": 7,
        "name": "Day 7",
        "meta": "Est. 7h 24m",
        "tasks": [
          {
            "id": "task-98",
            "title": "Practice (Access Modifiers)",
            "time": "Est. 45 min"
          },
          {
            "id": "task-99",
            "title": "Entities, Entity Sets, and Attributes",
            "time": "Est. 15 min"
          },
          {
            "id": "task-100",
            "title": "Load Balancing in OS",
            "time": "Est. 20 min"
          },
          {
            "id": "task-101",
            "title": "Relationships and Structural Constraints",
            "time": "Est. 15 min"
          },
          {
            "id": "task-102",
            "title": "Hybrid Topology",
            "time": "Est. 4 min"
          },
          {
            "id": "task-103",
            "title": "Logical Topologies",
            "time": "Est. 8 min"
          },
          {
            "id": "task-104",
            "title": "Pattern 1",
            "time": "Est. 13 min"
          },
          {
            "id": "task-105",
            "title": "CPU Affinity, Cache Locality, and NUMA",
            "time": "Est. 17 min"
          },
          {
            "id": "task-106",
            "title": "Weak Entities and Enhanced ER Modeling",
            "time": "Est. 15 min"
          },
          {
            "id": "task-107",
            "title": "Ethernet Switching",
            "time": "Est. 13 min"
          },
          {
            "id": "task-108",
            "title": "Pattern 2",
            "time": "Est. 3 min"
          },
          {
            "id": "task-109",
            "title": "Pattern 3",
            "time": "Est. 2 min"
          },
          {
            "id": "task-110",
            "title": "Pattern 4",
            "time": "Est. 2 min"
          },
          {
            "id": "task-111",
            "title": "Inheritance",
            "time": "Est. 36 min"
          },
          {
            "id": "task-112",
            "title": "Threads in Operating System",
            "time": "Est. 13 min"
          },
          {
            "id": "task-113",
            "title": "Pattern 5",
            "time": "Est. 4 min"
          },
          {
            "id": "task-114",
            "title": "Virtual LANs",
            "time": "Est. 19 min"
          },
          {
            "id": "task-115",
            "title": "ER/EER-to-Relational Mapping",
            "time": "Est. 15 min"
          },
          {
            "id": "task-116",
            "title": "Pattern 6",
            "time": "Est. 3 min"
          },
          {
            "id": "task-117",
            "title": "Pattern 7",
            "time": "Est. 6 min"
          },
          {
            "id": "task-118",
            "title": "Threads vs Processes",
            "time": "Est. 14 min"
          },
          {
            "id": "task-119",
            "title": "Pattern 8",
            "time": "Est. 5 min"
          },
          {
            "id": "task-120",
            "title": "Database Design Fundamentals",
            "time": "Est. 1h 50m"
          },
          {
            "id": "task-121",
            "title": "Pattern 9",
            "time": "Est. 3 min"
          },
          {
            "id": "task-122",
            "title": "Switching vs Routing",
            "time": "Est. 3 min"
          },
          {
            "id": "task-123",
            "title": "Pattern 10",
            "time": "Est. 2 min"
          },
          {
            "id": "task-124",
            "title": "Introduction to Network Layer",
            "time": "Est. 14 min"
          },
          {
            "id": "task-125",
            "title": "Pattern 11",
            "time": "Est. 4 min"
          },
          {
            "id": "task-126",
            "title": "What Memory Is Shared Between Threads?",
            "time": "Est. 9 min"
          },
          {
            "id": "task-127",
            "title": "Pattern 12",
            "time": "Est. 5 min"
          },
          {
            "id": "task-128",
            "title": "Pattern 13",
            "time": "Est. 2 min"
          },
          {
            "id": "task-129",
            "title": "Pattern 14",
            "time": "Est. 5 min"
          }
        ]
      }
    ]
  },
  {
    "id": "sprint-2",
    "name": "Sprint 2",
    "meta": "•UpcomingEst. 39h 24m · Time spent : 0 sec",
    "days": [
      {
        "id": "sprint-2-day-1",
        "globalDay": 8,
        "name": "Day 1",
        "meta": "Est. 4h 35m",
        "tasks": [
          {
            "id": "task-130",
            "title": "Practice (Inheritance)",
            "time": "Est. 45 min"
          },
          {
            "id": "task-131",
            "title": "User-Level Threads vs Kernel-Level Threads",
            "time": "Est. 15 min"
          },
          {
            "id": "task-132",
            "title": "IPv4 Introduction",
            "time": "Est. 27 min"
          },
          {
            "id": "task-133",
            "title": "Pattern 15",
            "time": "Est. 4 min"
          },
          {
            "id": "task-134",
            "title": "Pattern 16",
            "time": "Est. 3 min"
          },
          {
            "id": "task-135",
            "title": "Pattern 17",
            "time": "Est. 7 min"
          },
          {
            "id": "task-136",
            "title": "Multithreading Models in OS",
            "time": "Est. 13 min"
          },
          {
            "id": "task-137",
            "title": "Pattern 18",
            "time": "Est. 4 min"
          },
          {
            "id": "task-138",
            "title": "Pattern 19",
            "time": "Est. 8 min"
          },
          {
            "id": "task-139",
            "title": "POSIX Threads",
            "time": "Est. 11 min"
          },
          {
            "id": "task-140",
            "title": "IPv4 Datagram",
            "time": "Est. 28 min"
          },
          {
            "id": "task-141",
            "title": "Pattern 20",
            "time": "Est. 4 min"
          },
          {
            "id": "task-142",
            "title": "Pattern 21",
            "time": "Est. 3 min"
          },
          {
            "id": "task-143",
            "title": "Pattern 22",
            "time": "Est. 9 min"
          },
          {
            "id": "task-144",
            "title": "Thread Pools",
            "time": "Est. 18 min"
          },
          {
            "id": "task-145",
            "title": "Polymorphism",
            "time": "Est. 16 min"
          },
          {
            "id": "task-146",
            "title": "Theory with examples",
            "time": "Est. 38 min"
          },
          {
            "id": "task-147",
            "title": "IP Addressing Modes",
            "time": "Est. 9 min"
          },
          {
            "id": "task-148",
            "title": "Concurrency vs Parallelism",
            "time": "Est. 13 min"
          }
        ]
      },
      {
        "id": "sprint-2-day-2",
        "globalDay": 9,
        "name": "Day 2",
        "meta": "Est. 4h 56m",
        "tasks": [
          {
            "id": "task-149",
            "title": "Practice (Polymorphism)",
            "time": "Est. 45 min"
          },
          {
            "id": "task-150",
            "title": "Private vs Public IP",
            "time": "Est. 10 min"
          },
          {
            "id": "task-151",
            "title": "Multiprogramming vs Multitasking vs Multiprocessing vs Multithreading",
            "time": "Est. 9 min"
          },
          {
            "id": "task-152",
            "title": "Classful Addressing",
            "time": "Est. 7 min"
          },
          {
            "id": "task-153",
            "title": "Thread Safety, Reentrancy, and Race Condition",
            "time": "Est. 18 min"
          },
          {
            "id": "task-154",
            "title": "Subnetting",
            "time": "Est. 11 min"
          },
          {
            "id": "task-155",
            "title": "STL",
            "time": "Est. 1h 33m"
          },
          {
            "id": "task-156",
            "title": "Importance, Raw Data and Pain",
            "time": "Est. 12 min"
          },
          {
            "id": "task-157",
            "title": "Common Interview Questions",
            "time": "Est. 16 min"
          },
          {
            "id": "task-158",
            "title": "Race Conditions in Operating Systems",
            "time": "Est. 30 min"
          },
          {
            "id": "task-159",
            "title": "Core Concepts (Overview)",
            "time": "Est. 5 min"
          },
          {
            "id": "task-160",
            "title": "Abstraction",
            "time": "Est. 29 min"
          },
          {
            "id": "task-161",
            "title": "Mental Model (First Principle)",
            "time": "Est. 11 min"
          }
        ]
      },
      {
        "id": "sprint-2-day-3",
        "globalDay": 10,
        "name": "Day 3",
        "meta": "Est. 4h 17m",
        "tasks": [
          {
            "id": "task-162",
            "title": "CIDR - Classless Addressing",
            "time": "Est. 16 min"
          },
          {
            "id": "task-163",
            "title": "Schema Design",
            "time": "Est. 29 min"
          },
          {
            "id": "task-164",
            "title": "IPv6 Introduction",
            "time": "Est. 23 min"
          },
          {
            "id": "task-165",
            "title": "Critical Section Problem and Mutual Exclusion",
            "time": "Est. 30 min"
          },
          {
            "id": "task-166",
            "title": "Practice (Abstraction)",
            "time": "Est. 45 min"
          },
          {
            "id": "task-167",
            "title": "Entity and Attributes",
            "time": "Est. 3 min"
          },
          {
            "id": "task-168",
            "title": "IPv6 Datagram",
            "time": "Est. 14 min"
          },
          {
            "id": "task-169",
            "title": "Relationships, Cardinality and Optionality",
            "time": "Est. 15 min"
          },
          {
            "id": "task-170",
            "title": "Dekker’s Algorithm",
            "time": "Est. 30 min"
          },
          {
            "id": "task-171",
            "title": "IPv6 over IPv4",
            "time": "Est. 5 min"
          },
          {
            "id": "task-172",
            "title": "Everything About Keys",
            "time": "Est. 10 min"
          },
          {
            "id": "task-173",
            "title": "Router vs Forwarding",
            "time": "Est. 13 min"
          },
          {
            "id": "task-174",
            "title": "Normalisation and their Forms",
            "time": "Est. 24 min"
          }
        ]
      },
      {
        "id": "sprint-2-day-4",
        "globalDay": 11,
        "name": "Day 4",
        "meta": "Est. 4h 56m",
        "tasks": [
          {
            "id": "task-175",
            "title": "Java Collections",
            "time": "Est. 1h 15m"
          },
          {
            "id": "task-176",
            "title": "Interfaces",
            "time": "Est. 20 min"
          },
          {
            "id": "task-177",
            "title": "Routing Tables Basics",
            "time": "Est. 11 min"
          },
          {
            "id": "task-178",
            "title": "Peterson’s Algorithm",
            "time": "Est. 30 min"
          },
          {
            "id": "task-179",
            "title": "Static Routing",
            "time": "Est. 5 min"
          },
          {
            "id": "task-180",
            "title": "Dynamic Routing",
            "time": "Est. 10 min"
          },
          {
            "id": "task-181",
            "title": "Practice (Interfaces)",
            "time": "Est. 45 min"
          },
          {
            "id": "task-182",
            "title": "Formal Relational Model and Integrity Constraints",
            "time": "Est. 15 min"
          },
          {
            "id": "task-183",
            "title": "Distance Vector Routing and RIP",
            "time": "Est. 7 min"
          },
          {
            "id": "task-184",
            "title": "Routing Loop and Prevention",
            "time": "Est. 18 min"
          },
          {
            "id": "task-185",
            "title": "Fundamental Relational Algebra",
            "time": "Est. 15 min"
          },
          {
            "id": "task-186",
            "title": "Bakery Algorithm",
            "time": "Est. 30 min"
          },
          {
            "id": "task-187",
            "title": "Joins and Extended Relational Algebra",
            "time": "Est. 15 min"
          }
        ]
      },
      {
        "id": "sprint-2-day-5",
        "globalDay": 12,
        "name": "Day 5",
        "meta": "Est. 4h 49m",
        "tasks": [
          {
            "id": "task-188",
            "title": "Link State Routing and OSPF",
            "time": "Est. 12 min"
          },
          {
            "id": "task-189",
            "title": "Hybrid Routing and EIGRP",
            "time": "Est. 3 min"
          },
          {
            "id": "task-190",
            "title": "Static Keyword",
            "time": "Est. 20 min"
          },
          {
            "id": "task-191",
            "title": "Tuple and Domain Relational Calculus",
            "time": "Est. 15 min"
          },
          {
            "id": "task-192",
            "title": "Border Gateway Protocol",
            "time": "Est. 17 min"
          },
          {
            "id": "task-193",
            "title": "Hardware Synchronization Principles",
            "time": "Est. 30 min"
          },
          {
            "id": "task-194",
            "title": "Python Libraries Part 1",
            "time": "Est. 1h 13m"
          },
          {
            "id": "task-195",
            "title": "Views and Materialized Views",
            "time": "Est. 15 min"
          },
          {
            "id": "task-196",
            "title": "Transport Layer Introduction",
            "time": "Est. 14 min"
          },
          {
            "id": "task-197",
            "title": "Practice (Static Keyword)",
            "time": "Est. 45 min"
          },
          {
            "id": "task-198",
            "title": "Triggers, Stored Routines, and Database-Side Logic",
            "time": "Est. 15 min"
          },
          {
            "id": "task-199",
            "title": "Test-and-Set",
            "time": "Est. 30 min"
          }
        ]
      },
      {
        "id": "sprint-2-day-6",
        "globalDay": 13,
        "name": "Day 6",
        "meta": "Est. 7h 57m",
        "tasks": [
          {
            "id": "task-200",
            "title": "Port and Sockets",
            "time": "Est. 17 min"
          },
          {
            "id": "task-201",
            "title": "Redundancy and Update Anomalies",
            "time": "Est. 15 min"
          },
          {
            "id": "task-202",
            "title": "UDP",
            "time": "Est. 10 min"
          },
          {
            "id": "task-203",
            "title": "TCP-I: Connection Setup and Numbering",
            "time": "Est. 28 min"
          },
          {
            "id": "task-204",
            "title": "Functional Dependencies and Keys",
            "time": "Est. 15 min"
          },
          {
            "id": "task-205",
            "title": "Compare-and-Swap",
            "time": "Est. 30 min"
          },
          {
            "id": "task-206",
            "title": "Inner classes",
            "time": "Est. 23 min"
          },
          {
            "id": "task-207",
            "title": "Armstrong’s Axioms, Attribute Closure, and Minimal Cover",
            "time": "Est. 15 min"
          },
          {
            "id": "task-208",
            "title": "Python Libraries Part 2",
            "time": "Est. 59 min"
          },
          {
            "id": "task-209",
            "title": "Practice (Inner classes)",
            "time": "Est. 45 min"
          },
          {
            "id": "task-210",
            "title": "TCP-II: Reliability, Flow Control and Sliding Window",
            "time": "Est. 15 min"
          },
          {
            "id": "task-211",
            "title": "First, Second, Third, and Boyce–Codd Normal Forms",
            "time": "Est. 15 min"
          },
          {
            "id": "task-212",
            "title": "Locks, Mutexes, and Types of Locks",
            "time": "Est. 30 min"
          },
          {
            "id": "task-213",
            "title": "TCP-III: Congestion Control and Connection Closing",
            "time": "Est. 17 min"
          },
          {
            "id": "task-214",
            "title": "Decomposition Quality and Normalization Algorithms",
            "time": "Est. 15 min"
          },
          {
            "id": "task-215",
            "title": "When to choose TCP/UDP",
            "time": "Est. 5 min"
          },
          {
            "id": "task-216",
            "title": "Multivalued Dependencies, 4NF, Join Dependencies, and 5NF",
            "time": "Est. 15 min"
          },
          {
            "id": "task-217",
            "title": "Semaphores",
            "time": "Est. 30 min"
          },
          {
            "id": "task-218",
            "title": "Application Layer Introduction",
            "time": "Est. 4 min"
          },
          {
            "id": "task-219",
            "title": "HTTP-Request Response Model",
            "time": "Est. 7 min"
          },
          {
            "id": "task-220",
            "title": "Association, Aggregation, and Composition",
            "time": "Est. 23 min"
          },
          {
            "id": "task-221",
            "title": "Query Fundamentals",
            "time": "Est. 27 min"
          },
          {
            "id": "task-222",
            "title": "HTTP methods and status codes",
            "time": "Est. 17 min"
          }
        ]
      },
      {
        "id": "sprint-2-day-7",
        "globalDay": 14,
        "name": "Day 7",
        "meta": "Est. 7h 54m",
        "tasks": [
          {
            "id": "task-223",
            "title": "Basic Maths",
            "time": "Est. 1h 13m"
          },
          {
            "id": "task-224",
            "title": "Mutex vs Semaphores",
            "time": "Est. 30 min"
          },
          {
            "id": "task-225",
            "title": "HTTP Versions",
            "time": "Est. 31 min"
          },
          {
            "id": "task-226",
            "title": "Practice (Composition)",
            "time": "Est. 45 min"
          },
          {
            "id": "task-227",
            "title": "SELECT AND FROM",
            "time": "Est. 1 min"
          },
          {
            "id": "task-228",
            "title": "WHERE",
            "time": "Est. 2 min"
          },
          {
            "id": "task-229",
            "title": "Comparison Operators",
            "time": "Est. 2 min"
          },
          {
            "id": "task-230",
            "title": "Logical Operators",
            "time": "Est. 6 min"
          },
          {
            "id": "task-231",
            "title": "Arithmetic Operators",
            "time": "Est. 4 min"
          },
          {
            "id": "task-232",
            "title": "ORDER BY and LIMIT",
            "time": "Est. 2 min"
          },
          {
            "id": "task-233",
            "title": "DISTINCT and AS (Aliases)",
            "time": "Est. 2 min"
          },
          {
            "id": "task-234",
            "title": "Big Countries",
            "time": "Est. 15 min"
          },
          {
            "id": "task-235",
            "title": "Producer-Consumer Problem",
            "time": "Est. 30 min"
          },
          {
            "id": "task-236",
            "title": "HTTP/3 and QUIC",
            "time": "Est. 14 min"
          },
          {
            "id": "task-237",
            "title": "Profitable Customers in 2021",
            "time": "Est. 15 min"
          },
          {
            "id": "task-238",
            "title": "HTTPS and TLS",
            "time": "Est. 15 min"
          },
          {
            "id": "task-239",
            "title": "Object Cloning",
            "time": "Est. 15 min"
          },
          {
            "id": "task-240",
            "title": "Odd Non-Boring Movies",
            "time": "Est. 15 min"
          },
          {
            "id": "task-241",
            "title": "Basic Arrays",
            "time": "Est. 36 min"
          },
          {
            "id": "task-242",
            "title": "Condition Variables in OS",
            "time": "Est. 30 min"
          },
          {
            "id": "task-243",
            "title": "Cookies, Sessions, and tokens",
            "time": "Est. 22 min"
          },
          {
            "id": "task-244",
            "title": "Practice (Object Cloning)",
            "time": "Est. 45 min"
          },
          {
            "id": "task-245",
            "title": "Filtering Essentials",
            "time": "Est. 24 min"
          }
        ]
      }
    ]
  },
  {
    "id": "sprint-3",
    "name": "Sprint 3",
    "meta": "•UpcomingEst. 40h 18m · Time spent : 0 sec",
    "days": [
      {
        "id": "sprint-3-day-1",
        "globalDay": 15,
        "name": "Day 1",
        "meta": "Est. 4h 59m",
        "tasks": [
          {
            "id": "task-246",
            "title": "Rest API’s",
            "time": "Est. 9 min"
          },
          {
            "id": "task-247",
            "title": "Monitoring in OS",
            "time": "Est. 30 min"
          },
          {
            "id": "task-248",
            "title": "WebSockets",
            "time": "Est. 8 min"
          },
          {
            "id": "task-249",
            "title": "Basic Hashing",
            "time": "Est. 1h 34m"
          },
          {
            "id": "task-250",
            "title": "IS NULL vs. IS NOT NULL, IN, and NOT IN",
            "time": "Est. 7 min"
          },
          {
            "id": "task-251",
            "title": "File Transfer Protocol",
            "time": "Est. 4 min"
          },
          {
            "id": "task-252",
            "title": "Email Protocols",
            "time": "Est. 7 min"
          },
          {
            "id": "task-253",
            "title": "BETWEEN and NOT BETWEEN",
            "time": "Est. 6 min"
          },
          {
            "id": "task-254",
            "title": "Exception Handling",
            "time": "Est. 34 min"
          },
          {
            "id": "task-255",
            "title": "NAT and Why do we need it?",
            "time": "Est. 10 min"
          },
          {
            "id": "task-256",
            "title": "LIKE and NOT LIKE",
            "time": "Est. 7 min"
          },
          {
            "id": "task-257",
            "title": "Filter Records Excluding a Specific Pattern",
            "time": "Est. 15 min"
          },
          {
            "id": "task-258",
            "title": "Readers-Writers Problem",
            "time": "Est. 30 min"
          },
          {
            "id": "task-259",
            "title": "NAT Packet Flow",
            "time": "Est. 9 min"
          },
          {
            "id": "task-260",
            "title": "Types of NAT",
            "time": "Est. 7 min"
          },
          {
            "id": "task-261",
            "title": "Find Records Excluding a Given Set of Values",
            "time": "Est. 15 min"
          },
          {
            "id": "task-262",
            "title": "SNAT, DNAT and Port Forwarding",
            "time": "Est. 7 min"
          }
        ]
      },
      {
        "id": "sprint-3-day-2",
        "globalDay": 16,
        "name": "Day 2",
        "meta": "Est. 5h",
        "tasks": [
          {
            "id": "task-263",
            "title": "Generics",
            "time": "Est. 29 min"
          },
          {
            "id": "task-264",
            "title": "NAT Limitations",
            "time": "Est. 13 min"
          },
          {
            "id": "task-265",
            "title": "Find Salaries Outside the Expected Range",
            "time": "Est. 15 min"
          },
          {
            "id": "task-266",
            "title": "Sleeping Barber Problem",
            "time": "Est. 30 min"
          },
          {
            "id": "task-267",
            "title": "DNS",
            "time": "Est. 17 min"
          },
          {
            "id": "task-268",
            "title": "Non-Referred Customers",
            "time": "Est. 15 min"
          },
          {
            "id": "task-269",
            "title": "File Handling",
            "time": "Est. 29 min"
          },
          {
            "id": "task-270",
            "title": "DNS Record Types",
            "time": "Est. 6 min"
          },
          {
            "id": "task-271",
            "title": "Data Summarization",
            "time": "Est. 39 min"
          },
          {
            "id": "task-272",
            "title": "DNS Security",
            "time": "Est. 6 min"
          },
          {
            "id": "task-273",
            "title": "Dining Philosophers Problem",
            "time": "Est. 30 min"
          },
          {
            "id": "task-274",
            "title": "DNSSEC",
            "time": "Est. 6 min"
          },
          {
            "id": "task-275",
            "title": "Basic String",
            "time": "Est. 14 min"
          },
          {
            "id": "task-276",
            "title": "Dynamic Host Configuration Protocol (DHCP)",
            "time": "Est. 10 min"
          },
          {
            "id": "task-277",
            "title": "Design Principles",
            "time": "Est. 23 min"
          },
          {
            "id": "task-278",
            "title": "What is Switching and Why?",
            "time": "Est. 6 min"
          },
          {
            "id": "task-279",
            "title": "Count all Digits of a Number",
            "time": "Est. 8 min"
          },
          {
            "id": "task-280",
            "title": "Fundamental Switching Techniques",
            "time": "Est. 4 min"
          }
        ]
      },
      {
        "id": "sprint-3-day-3",
        "globalDay": 17,
        "name": "Day 3",
        "meta": "Est. 4h 57m",
        "tasks": [
          {
            "id": "task-281",
            "title": "Deadlock in Operating Systems",
            "time": "Est. 30 min"
          },
          {
            "id": "task-282",
            "title": "Circuit Switching",
            "time": "Est. 13 min"
          },
          {
            "id": "task-283",
            "title": "Count number of odd digits in a number",
            "time": "Est. 5 min"
          },
          {
            "id": "task-284",
            "title": "Reverse a number",
            "time": "Est. 7 min"
          },
          {
            "id": "task-285",
            "title": "Fundamentals of GROUP BY",
            "time": "Est. 11 min"
          },
          {
            "id": "task-286",
            "title": "Object Lifecycle",
            "time": "Est. 18 min"
          },
          {
            "id": "task-287",
            "title": "Palindrome Number",
            "time": "Est. 4 min"
          },
          {
            "id": "task-288",
            "title": "Packet Switching",
            "time": "Est. 22 min"
          },
          {
            "id": "task-289",
            "title": "Return the Largest Digit in a Number",
            "time": "Est. 3 min"
          },
          {
            "id": "task-290",
            "title": "Basic Aggregate Functions (MIN, MAX, SUM, AVG)",
            "time": "Est. 6 min"
          },
          {
            "id": "task-291",
            "title": "Factorial of a given number",
            "time": "Est. 3 min"
          },
          {
            "id": "task-292",
            "title": "Check if the Number is Armstrong",
            "time": "Est. 7 min"
          },
          {
            "id": "task-293",
            "title": "COUNT Functions",
            "time": "Est. 14 min"
          },
          {
            "id": "task-294",
            "title": "Conditions for Deadlock",
            "time": "Est. 30 min"
          },
          {
            "id": "task-295",
            "title": "Check for Perfect Number",
            "time": "Est. 10 min"
          },
          {
            "id": "task-296",
            "title": "Datagram Packet Switching",
            "time": "Est. 8 min"
          },
          {
            "id": "task-297",
            "title": "HAVING Clause (Basics, HAVING with COUNT)",
            "time": "Est. 3 min"
          },
          {
            "id": "task-298",
            "title": "Check for Prime Number",
            "time": "Est. 6 min"
          },
          {
            "id": "task-299",
            "title": "First Login Analysis",
            "time": "Est. 15 min"
          },
          {
            "id": "task-300",
            "title": "Virtual Circuit Packet Switching",
            "time": "Est. 11 min"
          },
          {
            "id": "task-301",
            "title": "Count of Prime Numbers till N",
            "time": "Est. 3 min"
          },
          {
            "id": "task-302",
            "title": "GCD of Two Numbers",
            "time": "Est. 13 min"
          },
          {
            "id": "task-303",
            "title": "MPLS",
            "time": "Est. 6 min"
          },
          {
            "id": "task-304",
            "title": "Employee Work Time Summary",
            "time": "Est. 15 min"
          },
          {
            "id": "task-305",
            "title": "Resource Allocation Graph",
            "time": "Est. 30 min"
          },
          {
            "id": "task-306",
            "title": "Circuit Switching vs. Virtual Packet Switching",
            "time": "Est. 4 min"
          }
        ]
      },
      {
        "id": "sprint-3-day-4",
        "globalDay": 18,
        "name": "Day 4",
        "meta": "Est. 4h 52m",
        "tasks": [
          {
            "id": "task-307",
            "title": "LCM of two numbers",
            "time": "Est. 5 min"
          },
          {
            "id": "task-308",
            "title": "Message Switching",
            "time": "Est. 12 min"
          },
          {
            "id": "task-309",
            "title": "Divisors of a Number",
            "time": "Est. 9 min"
          },
          {
            "id": "task-310",
            "title": "Unique Subjects per Teacher",
            "time": "Est. 15 min"
          },
          {
            "id": "task-311",
            "title": "Sum of Array Elements",
            "time": "Est. 4 min"
          },
          {
            "id": "task-312",
            "title": "Why Packet Switching became backbone of Internet",
            "time": "Est. 3 min"
          },
          {
            "id": "task-313",
            "title": "Comparisons between all 3",
            "time": "Est. 2 min"
          },
          {
            "id": "task-314",
            "title": "Count of odd numbers in Array",
            "time": "Est. 3 min"
          },
          {
            "id": "task-315",
            "title": "FAQs - Switching",
            "time": "Est. 4 min"
          },
          {
            "id": "task-316",
            "title": "Check if the Array is Sorted I",
            "time": "Est. 6 min"
          },
          {
            "id": "task-317",
            "title": "User Follower Count",
            "time": "Est. 15 min"
          },
          {
            "id": "task-318",
            "title": "Why Network Security?",
            "time": "Est. 6 min"
          },
          {
            "id": "task-319",
            "title": "Reverse an array",
            "time": "Est. 14 min"
          },
          {
            "id": "task-320",
            "title": "Wait-for Graph, Safe State, and Unsafe State",
            "time": "Est. 30 min"
          },
          {
            "id": "task-321",
            "title": "CIA Triad",
            "time": "Est. 11 min"
          },
          {
            "id": "task-322",
            "title": "CRM Automotive Sales Analysis",
            "time": "Est. 15 min"
          },
          {
            "id": "task-323",
            "title": "AAA Framework",
            "time": "Est. 10 min"
          },
          {
            "id": "task-324",
            "title": "Highest Occurring Element in an Array",
            "time": "Est. 14 min"
          },
          {
            "id": "task-325",
            "title": "Common Network Security Threats",
            "time": "Est. 19 min"
          },
          {
            "id": "task-326",
            "title": "Highest Order Placing Customer",
            "time": "Est. 15 min"
          },
          {
            "id": "task-327",
            "title": "Second Highest Occurring Element",
            "time": "Est. 16 min"
          },
          {
            "id": "task-328",
            "title": "Deadlock Prevention",
            "time": "Est. 30 min"
          },
          {
            "id": "task-329",
            "title": "Frequent Actor-Director Duos",
            "time": "Est. 15 min"
          },
          {
            "id": "task-330",
            "title": "Firewalls and Types",
            "time": "Est. 19 min"
          }
        ]
      },
      {
        "id": "sprint-3-day-5",
        "globalDay": 19,
        "name": "Day 5",
        "meta": "Est. 4h 41m",
        "tasks": [
          {
            "id": "task-331",
            "title": "Sum of Highest and Lowest Frequency",
            "time": "Est. 9 min"
          },
          {
            "id": "task-332",
            "title": "Reverse a String II",
            "time": "Est. 9 min"
          },
          {
            "id": "task-333",
            "title": "Large Classes",
            "time": "Est. 15 min"
          },
          {
            "id": "task-334",
            "title": "Deadlock Avoidance",
            "time": "Est. 30 min"
          },
          {
            "id": "task-335",
            "title": "Firewall Type Comparison - L3, L4, and L7",
            "time": "Est. 3 min"
          },
          {
            "id": "task-336",
            "title": "Palindrome Check",
            "time": "Est. 7 min"
          },
          {
            "id": "task-337",
            "title": "IDPS",
            "time": "Est. 6 min"
          },
          {
            "id": "task-338",
            "title": "Largest Odd Number in a String",
            "time": "Est. 11 min"
          },
          {
            "id": "task-339",
            "title": "VPNs",
            "time": "Est. 16 min"
          },
          {
            "id": "task-340",
            "title": "Email Duplicates",
            "time": "Est. 15 min"
          },
          {
            "id": "task-341",
            "title": "Longest Common Prefix",
            "time": "Est. 11 min"
          },
          {
            "id": "task-342",
            "title": "Merging Query Results",
            "time": "Est. 17 min"
          },
          {
            "id": "task-343",
            "title": "Zero Trust Architecture",
            "time": "Est. 6 min"
          },
          {
            "id": "task-344",
            "title": "Banker’s Algorithm",
            "time": "Est. 30 min"
          },
          {
            "id": "task-345",
            "title": "Isomorphic Strings",
            "time": "Est. 16 min"
          },
          {
            "id": "task-346",
            "title": "Introduction of Cryptography",
            "time": "Est. 4 min"
          },
          {
            "id": "task-347",
            "title": "Security Goals of Cryptography",
            "time": "Est. 2 min"
          },
          {
            "id": "task-348",
            "title": "Basic Cryptography Terms",
            "time": "Est. 3 min"
          },
          {
            "id": "task-349",
            "title": "Symmetric Encryption",
            "time": "Est. 5 min"
          },
          {
            "id": "task-350",
            "title": "UNION",
            "time": "Est. 8 min"
          },
          {
            "id": "task-351",
            "title": "Asymmetric Cryptography",
            "time": "Est. 14 min"
          },
          {
            "id": "task-352",
            "title": "Rotate String",
            "time": "Est. 13 min"
          },
          {
            "id": "task-353",
            "title": "UNION ALL",
            "time": "Est. 1 min"
          },
          {
            "id": "task-354",
            "title": "Difference Between UNION and UNION ALL",
            "time": "Est. 1 min"
          },
          {
            "id": "task-355",
            "title": "Intersection",
            "time": "Est. 6 min"
          },
          {
            "id": "task-356",
            "title": "Combine Active and Archived Users",
            "time": "Est. 15 min"
          },
          {
            "id": "task-357",
            "title": "Valid Anagram",
            "time": "Est. 8 min"
          }
        ]
      },
      {
        "id": "sprint-3-day-6",
        "globalDay": 20,
        "name": "Day 6",
        "meta": "Est. 7h 56m",
        "tasks": [
          {
            "id": "task-358",
            "title": "Deadlock Detection",
            "time": "Est. 30 min"
          },
          {
            "id": "task-359",
            "title": "Diffie Hellman Key Exchange Method",
            "time": "Est. 11 min"
          },
          {
            "id": "task-360",
            "title": "Sort Characters by Frequency",
            "time": "Est. 12 min"
          },
          {
            "id": "task-361",
            "title": "Hybrid Encryption",
            "time": "Est. 4 min"
          },
          {
            "id": "task-362",
            "title": "Merge Recent Orders from Multiple Sources",
            "time": "Est. 15 min"
          },
          {
            "id": "task-363",
            "title": "Hash Functions",
            "time": "Est. 16 min"
          },
          {
            "id": "task-364",
            "title": "Recursion Theory",
            "time": "Est. 40 min"
          },
          {
            "id": "task-365",
            "title": "Combine Sales Records Without Deduplication",
            "time": "Est. 15 min"
          },
          {
            "id": "task-366",
            "title": "Deadlock Recovery",
            "time": "Est. 30 min"
          },
          {
            "id": "task-367",
            "title": "MAC and HMAC",
            "time": "Est. 11 min"
          },
          {
            "id": "task-368",
            "title": "Digital Signatures",
            "time": "Est. 7 min"
          },
          {
            "id": "task-369",
            "title": "Reshape Products Data",
            "time": "Est. 15 min"
          },
          {
            "id": "task-370",
            "title": "Certificate Authority and Chain of Trust",
            "time": "Est. 7 min"
          },
          {
            "id": "task-371",
            "title": "Public Key Infrastructure",
            "time": "Est. 3 min"
          },
          {
            "id": "task-372",
            "title": "Joins Deep Dive",
            "time": "Est. 1h 13m"
          },
          {
            "id": "task-373",
            "title": "Certificate Pinning",
            "time": "Est. 4 min"
          },
          {
            "id": "task-374",
            "title": "Recursion Concepts with Parameters",
            "time": "Est. 18 min"
          },
          {
            "id": "task-375",
            "title": "Starvation vs Deadlock vs Livelock",
            "time": "Est. 30 min"
          },
          {
            "id": "task-376",
            "title": "TLS and SSL",
            "time": "Est. 6 min"
          },
          {
            "id": "task-377",
            "title": "TLS Handshake and Forward Secrecy",
            "time": "Est. 6 min"
          },
          {
            "id": "task-378",
            "title": "Wireless Networking Introduction",
            "time": "Est. 6 min"
          },
          {
            "id": "task-379",
            "title": "Sum of First N Numbers",
            "time": "Est. 16 min"
          },
          {
            "id": "task-380",
            "title": "Basics of Wireless Networking",
            "time": "Est. 17 min"
          },
          {
            "id": "task-381",
            "title": "Priority Inversion",
            "time": "Est. 30 min"
          },
          {
            "id": "task-382",
            "title": "Factorial of a Given Number",
            "time": "Est. 8 min"
          },
          {
            "id": "task-383",
            "title": "Wi-Fi Joining Flow",
            "time": "Est. 11 min"
          },
          {
            "id": "task-384",
            "title": "Sum of Array Elements II",
            "time": "Est. 7 min"
          },
          {
            "id": "task-385",
            "title": "Reverse a String I",
            "time": "Est. 9 min"
          },
          {
            "id": "task-386",
            "title": "WPA and WPA/WPA-2/WPA-3 Security Handshake",
            "time": "Est. 19 min"
          }
        ]
      },
      {
        "id": "sprint-3-day-7",
        "globalDay": 21,
        "name": "Day 7",
        "meta": "Est. 7h 53m",
        "tasks": [
          {
            "id": "task-387",
            "title": "Check if String is Palindrome or Not",
            "time": "Est. 10 min"
          },
          {
            "id": "task-388",
            "title": "Debugging Concurrency Bugs",
            "time": "Est. 30 min"
          },
          {
            "id": "task-389",
            "title": "Check if a Number is Prime or Not",
            "time": "Est. 7 min"
          },
          {
            "id": "task-390",
            "title": "IEEE 802.11 and Wi-Fi Generations",
            "time": "Est. 8 min"
          },
          {
            "id": "task-391",
            "title": "RIGHT JOIN",
            "time": "Est. 23 min"
          },
          {
            "id": "task-392",
            "title": "Reverse an array 2",
            "time": "Est. 4 min"
          },
          {
            "id": "task-393",
            "title": "Why Wi-Fi speed drops in Real Life",
            "time": "Est. 8 min"
          },
          {
            "id": "task-394",
            "title": "Check if the Array is Sorted II",
            "time": "Est. 7 min"
          },
          {
            "id": "task-395",
            "title": "How Wi-Fi avoids Collisions",
            "time": "Est. 9 min"
          },
          {
            "id": "task-396",
            "title": "Sum of Digits in a Given Number",
            "time": "Est. 18 min"
          },
          {
            "id": "task-397",
            "title": "Wi-Fi Frame Types",
            "time": "Est. 4 min"
          },
          {
            "id": "task-398",
            "title": "ON vs. WHERE",
            "time": "Est. 15 min"
          },
          {
            "id": "task-399",
            "title": "Wi-Fi Security",
            "time": "Est. 9 min"
          },
          {
            "id": "task-400",
            "title": "Fibonacci Number",
            "time": "Est. 20 min"
          },
          {
            "id": "task-401",
            "title": "Packet Flow: Opening a website over Wi-Fi",
            "time": "Est. 5 min"
          },
          {
            "id": "task-402",
            "title": "LEFT JOIN",
            "time": "Est. 6 min"
          },
          {
            "id": "task-403",
            "title": "Introduction to Network Performance",
            "time": "Est. 11 min"
          },
          {
            "id": "task-404",
            "title": "INNER JOIN",
            "time": "Est. 8 min"
          },
          {
            "id": "task-405",
            "title": "Metrics Deep Dive",
            "time": "Est. 12 min"
          },
          {
            "id": "task-406",
            "title": "Selection Sort",
            "time": "Est. 15 min"
          },
          {
            "id": "task-407",
            "title": "FULL OUTER JOIN",
            "time": "Est. 10 min"
          },
          {
            "id": "task-408",
            "title": "CROSS JOIN",
            "time": "Est. 2 min"
          },
          {
            "id": "task-409",
            "title": "Data Transfer and Bottlenecks, BDP",
            "time": "Est. 10 min"
          },
          {
            "id": "task-410",
            "title": "IMPLICIT JOIN",
            "time": "Est. 4 min"
          },
          {
            "id": "task-411",
            "title": "Bubble Sort",
            "time": "Est. 14 min"
          },
          {
            "id": "task-412",
            "title": "SELF JOIN",
            "time": "Est. 10 min"
          },
          {
            "id": "task-413",
            "title": "Latency Sources, Delay, and TTFB",
            "time": "Est. 15 min"
          },
          {
            "id": "task-414",
            "title": "NATURAL JOIN",
            "time": "Est. 5 min"
          },
          {
            "id": "task-415",
            "title": "Insertion Sorting",
            "time": "Est. 11 min"
          },
          {
            "id": "task-416",
            "title": "Employees and Their Departments",
            "time": "Est. 15 min"
          },
          {
            "id": "task-417",
            "title": "Congestion, Bufferbloat, and Congestion Collapse Loop",
            "time": "Est. 9 min"
          },
          {
            "id": "task-418",
            "title": "Merge Sorting",
            "time": "Est. 47 min"
          },
          {
            "id": "task-419",
            "title": "QoS, Traffic Shaping, and Policing",
            "time": "Est. 8 min"
          },
          {
            "id": "task-420",
            "title": "Customer Orders Overview",
            "time": "Est. 15 min"
          },
          {
            "id": "task-421",
            "title": "Rate Limiting",
            "time": "Est. 6 min"
          },
          {
            "id": "task-422",
            "title": "Fixed Window Counter - Rate Limiting Algo",
            "time": "Est. 5 min"
          },
          {
            "id": "task-423",
            "title": "Employees With Confirmed Salary Records",
            "time": "Est. 15 min"
          },
          {
            "id": "task-424",
            "title": "Sliding Window Log - Rate Limiting Algo",
            "time": "Est. 4 min"
          },
          {
            "id": "task-425",
            "title": "Sliding Window Counter - Rate Limiting Algo",
            "time": "Est. 6 min"
          },
          {
            "id": "task-426",
            "title": "Token Bucket - Rate Limiting Algo",
            "time": "Est. 3 min"
          },
          {
            "id": "task-427",
            "title": "Generate All Possible User-Category Pairs",
            "time": "Est. 15 min"
          },
          {
            "id": "task-428",
            "title": "Leaky Bucket - Rate Limiting Algo",
            "time": "Est. 3 min"
          },
          {
            "id": "task-429",
            "title": "Concurrency Limiter - Rate Limiting Algo",
            "time": "Est. 2 min"
          },
          {
            "id": "task-430",
            "title": "Load Balancing Fundamentals",
            "time": "Est. 10 min"
          }
        ]
      }
    ]
  },
  {
    "id": "sprint-4",
    "name": "Sprint 4",
    "meta": "•UpcomingEst. 39h 5m · Time spent : 0 sec",
    "days": [
      {
        "id": "sprint-4-day-1",
        "globalDay": 22,
        "name": "Day 1",
        "meta": "Est. 4h 55m",
        "tasks": [
          {
            "id": "task-431",
            "title": "Quick Sorting",
            "time": "Est. 33 min"
          },
          {
            "id": "task-432",
            "title": "Employees With or Without Salary Records",
            "time": "Est. 15 min"
          },
          {
            "id": "task-433",
            "title": "L4 vs L7 Load Balancers",
            "time": "Est. 4 min"
          },
          {
            "id": "task-434",
            "title": "Load Balancing Algorithms",
            "time": "Est. 30 min"
          },
          {
            "id": "task-435",
            "title": "Match Employees With Their Salaries",
            "time": "Est. 15 min"
          },
          {
            "id": "task-436",
            "title": "Linear Search",
            "time": "Est. 4 min"
          },
          {
            "id": "task-437",
            "title": "Employees Earning More Than Their Manager",
            "time": "Est. 15 min"
          },
          {
            "id": "task-438",
            "title": "Largest Element",
            "time": "Est. 5 min"
          },
          {
            "id": "task-439",
            "title": "CDN Caching and Lifestyle",
            "time": "Est. 30 min"
          },
          {
            "id": "task-440",
            "title": "Second Largest Element",
            "time": "Est. 15 min"
          },
          {
            "id": "task-441",
            "title": "Students Enrolled in Courses",
            "time": "Est. 15 min"
          },
          {
            "id": "task-442",
            "title": "Maximum Consecutive Ones",
            "time": "Est. 3 min"
          },
          {
            "id": "task-443",
            "title": "Left Rotate Array by One",
            "time": "Est. 6 min"
          },
          {
            "id": "task-444",
            "title": "Sales Analysis",
            "time": "Est. 15 min"
          },
          {
            "id": "task-445",
            "title": "Left Rotate Array by K Places",
            "time": "Est. 17 min"
          },
          {
            "id": "task-446",
            "title": "What happens when you type google.com",
            "time": "Est. 30 min"
          },
          {
            "id": "task-447",
            "title": "Minimum Distance Between Points",
            "time": "Est. 15 min"
          },
          {
            "id": "task-448",
            "title": "Move Zeros to End",
            "time": "Est. 13 min"
          },
          {
            "id": "task-449",
            "title": "Suspended Accounts",
            "time": "Est. 15 min"
          }
        ]
      },
      {
        "id": "sprint-4-day-2",
        "globalDay": 23,
        "name": "Day 2",
        "meta": "Est. 4h 50m",
        "tasks": [
          {
            "id": "task-450",
            "title": "Remove duplicates from sorted array",
            "time": "Est. 11 min"
          },
          {
            "id": "task-451",
            "title": "What happens when DNS fails?",
            "time": "Est. 30 min"
          },
          {
            "id": "task-452",
            "title": "Find missing number",
            "time": "Est. 18 min"
          },
          {
            "id": "task-453",
            "title": "Find Team Size for Each Employee",
            "time": "Est. 15 min"
          },
          {
            "id": "task-454",
            "title": "Average Experience by Project",
            "time": "Est. 15 min"
          },
          {
            "id": "task-455",
            "title": "Union of two sorted arrays",
            "time": "Est. 16 min"
          },
          {
            "id": "task-456",
            "title": "What happens when you connect to public Wi-Fi?",
            "time": "Est. 30 min"
          },
          {
            "id": "task-457",
            "title": "Warehouse Stock Manager",
            "time": "Est. 15 min"
          },
          {
            "id": "task-458",
            "title": "Intersection of two sorted arrays",
            "time": "Est. 13 min"
          },
          {
            "id": "task-459",
            "title": "Majority Element-I",
            "time": "Est. 17 min"
          },
          {
            "id": "task-460",
            "title": "Table Join Operation",
            "time": "Est. 15 min"
          },
          {
            "id": "task-461",
            "title": "How does a CDN serve an image/video?",
            "time": "Est. 30 min"
          },
          {
            "id": "task-462",
            "title": "Inactive Customers",
            "time": "Est. 15 min"
          },
          {
            "id": "task-463",
            "title": "Leaders in an Array",
            "time": "Est. 11 min"
          },
          {
            "id": "task-464",
            "title": "Rearrange array elements by sign",
            "time": "Est. 9 min"
          },
          {
            "id": "task-465",
            "title": "Students Enrolled in Non-Existent Departments",
            "time": "Est. 15 min"
          },
          {
            "id": "task-466",
            "title": "Print the matrix in spiral manner",
            "time": "Est. 15 min"
          }
        ]
      },
      {
        "id": "sprint-4-day-3",
        "globalDay": 24,
        "name": "Day 3",
        "meta": "Est. 4h 22m",
        "tasks": [
          {
            "id": "task-467",
            "title": "Low Bonus Employees",
            "time": "Est. 15 min"
          },
          {
            "id": "task-468",
            "title": "Pascal's Triangle I",
            "time": "Est. 10 min"
          },
          {
            "id": "task-469",
            "title": "Available Seat Streaks",
            "time": "Est. 15 min"
          },
          {
            "id": "task-470",
            "title": "Pascal's Triangle II",
            "time": "Est. 9 min"
          },
          {
            "id": "task-471",
            "title": "Pascal's Triangle III",
            "time": "Est. 7 min"
          },
          {
            "id": "task-472",
            "title": "Visitors Without Transactions",
            "time": "Est. 15 min"
          },
          {
            "id": "task-473",
            "title": "Rotate matrix by 90 degrees",
            "time": "Est. 17 min"
          },
          {
            "id": "task-474",
            "title": "A & B Buyers Without C",
            "time": "Est. 15 min"
          },
          {
            "id": "task-475",
            "title": "Set Matrix Zeroes",
            "time": "Est. 45 min"
          },
          {
            "id": "task-476",
            "title": "Product Selling Price Report",
            "time": "Est. 15 min"
          },
          {
            "id": "task-477",
            "title": "Updated Bank Balances",
            "time": "Est. 15 min"
          },
          {
            "id": "task-478",
            "title": "Most Frequent Travellers",
            "time": "Est. 15 min"
          },
          {
            "id": "task-479",
            "title": "Two Sum",
            "time": "Est. 17 min"
          },
          {
            "id": "task-480",
            "title": "Suggested Pages",
            "time": "Est. 15 min"
          },
          {
            "id": "task-481",
            "title": "3 Sum",
            "time": "Est. 37 min"
          }
        ]
      },
      {
        "id": "sprint-4-day-4",
        "globalDay": 25,
        "name": "Day 4",
        "meta": "Est. 4h 34m",
        "tasks": [
          {
            "id": "task-482",
            "title": "Everything about Subqueries",
            "time": "Est. 1h 2m"
          },
          {
            "id": "task-483",
            "title": "4 Sum",
            "time": "Est. 27 min"
          },
          {
            "id": "task-484",
            "title": "Sort an array of 0's 1's and 2's",
            "time": "Est. 24 min"
          },
          {
            "id": "task-485",
            "title": "Introduction to Subqueries (IN)",
            "time": "Est. 35 min"
          },
          {
            "id": "task-486",
            "title": "Kadane's Algorithm",
            "time": "Est. 19 min"
          },
          {
            "id": "task-487",
            "title": "EXISTS and NOT EXISTS",
            "time": "Est. 15 min"
          },
          {
            "id": "task-488",
            "title": "Next Permutation",
            "time": "Est. 26 min"
          },
          {
            "id": "task-489",
            "title": "Correlated Subqueries",
            "time": "Est. 11 min"
          },
          {
            "id": "task-490",
            "title": "Contest Participation Rate",
            "time": "Est. 15 min"
          },
          {
            "id": "task-491",
            "title": "Majority Element-II",
            "time": "Est. 25 min"
          },
          {
            "id": "task-492",
            "title": "High-Report Managers",
            "time": "Est. 15 min"
          }
        ]
      },
      {
        "id": "sprint-4-day-5",
        "globalDay": 26,
        "name": "Day 5",
        "meta": "Est. 4h 55m",
        "tasks": [
          {
            "id": "task-493",
            "title": "Find the repeating and missing number",
            "time": "Est. 41 min"
          },
          {
            "id": "task-494",
            "title": "All-Product Buyers",
            "time": "Est. 15 min"
          },
          {
            "id": "task-495",
            "title": "Highest Non-Repeating Number",
            "time": "Est. 15 min"
          },
          {
            "id": "task-496",
            "title": "Find the First Device Logged In by Each Player",
            "time": "Est. 15 min"
          },
          {
            "id": "task-497",
            "title": "Count Inversions",
            "time": "Est. 23 min"
          },
          {
            "id": "task-498",
            "title": "Salespersons Without RED Orders",
            "time": "Est. 15 min"
          },
          {
            "id": "task-499",
            "title": "Employees with the Highest Salary in Each Department",
            "time": "Est. 15 min"
          },
          {
            "id": "task-500",
            "title": "Reverse Pairs",
            "time": "Est. 31 min"
          },
          {
            "id": "task-501",
            "title": "Find the Most Recent Order for Each Product",
            "time": "Est. 15 min"
          },
          {
            "id": "task-502",
            "title": "Find Transactions with Maximum Amount Per Day",
            "time": "Est. 15 min"
          },
          {
            "id": "task-503",
            "title": "Maximum Product Subarray in an Array",
            "time": "Est. 18 min"
          },
          {
            "id": "task-504",
            "title": "Incomplete Employee Records",
            "time": "Est. 15 min"
          },
          {
            "id": "task-505",
            "title": "Merge two sorted arrays without extra space",
            "time": "Est. 32 min"
          },
          {
            "id": "task-506",
            "title": "Find Quiet Students in All Exams",
            "time": "Est. 15 min"
          },
          {
            "id": "task-507",
            "title": "Top Grade per Student",
            "time": "Est. 15 min"
          }
        ]
      },
      {
        "id": "sprint-4-day-6",
        "globalDay": 27,
        "name": "Day 6",
        "meta": "Est. 7h 55m",
        "tasks": [
          {
            "id": "task-508",
            "title": "Longest Consecutive Sequence in an Array",
            "time": "Est. 22 min"
          },
          {
            "id": "task-509",
            "title": "Swap Consecutive Seats",
            "time": "Est. 15 min"
          },
          {
            "id": "task-510",
            "title": "Longest subarray with sum K",
            "time": "Est. 40 min"
          },
          {
            "id": "task-511",
            "title": "Safe Investment Countries",
            "time": "Est. 15 min"
          },
          {
            "id": "task-512",
            "title": "Tennis Grand Slam Winners",
            "time": "Est. 15 min"
          },
          {
            "id": "task-513",
            "title": "Football Team Scores",
            "time": "Est. 15 min"
          },
          {
            "id": "task-514",
            "title": "Largest Subarray with Sum 0",
            "time": "Est. 45 min"
          },
          {
            "id": "task-515",
            "title": "Order Count per Customer",
            "time": "Est. 15 min"
          },
          {
            "id": "task-516",
            "title": "Boolean Expression Evaluator",
            "time": "Est. 15 min"
          },
          {
            "id": "task-517",
            "title": "Immediate First Orders Percentage",
            "time": "Est. 15 min"
          },
          {
            "id": "task-518",
            "title": "Count subarrays with given sum",
            "time": "Est. 22 min"
          },
          {
            "id": "task-519",
            "title": "Find All Employees Reporting to the Head of the Company",
            "time": "Est. 15 min"
          },
          {
            "id": "task-520",
            "title": "Orphan Employees",
            "time": "Est. 15 min"
          },
          {
            "id": "task-521",
            "title": "Count subarrays with given xor K",
            "time": "Est. 23 min"
          },
          {
            "id": "task-522",
            "title": "Editing Data and Tables",
            "time": "Est. 38 min"
          },
          {
            "id": "task-523",
            "title": "Search X in sorted array",
            "time": "Est. 33 min"
          },
          {
            "id": "task-524",
            "title": "INSERT",
            "time": "Est. 6 min"
          },
          {
            "id": "task-525",
            "title": "Lower Bound",
            "time": "Est. 16 min"
          },
          {
            "id": "task-526",
            "title": "UPSERT",
            "time": "Est. 7 min"
          },
          {
            "id": "task-527",
            "title": "UPDATE",
            "time": "Est. 5 min"
          },
          {
            "id": "task-528",
            "title": "DELETE",
            "time": "Est. 3 min"
          },
          {
            "id": "task-529",
            "title": "Upper Bound",
            "time": "Est. 4 min"
          },
          {
            "id": "task-530",
            "title": "ALTER",
            "time": "Est. 12 min"
          },
          {
            "id": "task-531",
            "title": "Search insert position",
            "time": "Est. 3 min"
          },
          {
            "id": "task-532",
            "title": "Floor and Ceil in Sorted Array",
            "time": "Est. 6 min"
          },
          {
            "id": "task-533",
            "title": "First and last occurrence",
            "time": "Est. 22 min"
          },
          {
            "id": "task-534",
            "title": "TRUNCATE",
            "time": "Est. 1 min"
          },
          {
            "id": "task-535",
            "title": "DELETE vs. TRUNCATE vs. DROP",
            "time": "Est. 2 min"
          },
          {
            "id": "task-536",
            "title": "System Settings",
            "time": "Est. 15 min"
          },
          {
            "id": "task-537",
            "title": "Employee Salary",
            "time": "Est. 15 min"
          }
        ]
      },
      {
        "id": "sprint-4-day-7",
        "globalDay": 28,
        "name": "Day 7",
        "meta": "Est. 7h 34m",
        "tasks": [
          {
            "id": "task-538",
            "title": "Search in rotated sorted array-I",
            "time": "Est. 15 min"
          },
          {
            "id": "task-539",
            "title": "Storage Hierarchy, Pages, Records, and Buffers",
            "time": "Est. 15 min"
          },
          {
            "id": "task-540",
            "title": "Search in rotated sorted array-II",
            "time": "Est. 12 min"
          },
          {
            "id": "task-541",
            "title": "File Organization",
            "time": "Est. 15 min"
          },
          {
            "id": "task-542",
            "title": "Find minimum in Rotated Sorted Array",
            "time": "Est. 15 min"
          },
          {
            "id": "task-543",
            "title": "Index Classification and Design",
            "time": "Est. 15 min"
          },
          {
            "id": "task-544",
            "title": "Find out how many times the array is rotated",
            "time": "Est. 4 min"
          },
          {
            "id": "task-545",
            "title": "Single element in sorted array",
            "time": "Est. 22 min"
          },
          {
            "id": "task-546",
            "title": "B-Trees and B+ Trees",
            "time": "Est. 15 min"
          },
          {
            "id": "task-547",
            "title": "Find square root of a number",
            "time": "Est. 17 min"
          },
          {
            "id": "task-548",
            "title": "Static and Dynamic Hashing",
            "time": "Est. 15 min"
          },
          {
            "id": "task-549",
            "title": "Find Nth root of a number",
            "time": "Est. 20 min"
          },
          {
            "id": "task-550",
            "title": "Storage, Keys and Query Performance",
            "time": "Est. 1h 53m"
          },
          {
            "id": "task-551",
            "title": "Find the smallest divisor",
            "time": "Est. 15 min"
          },
          {
            "id": "task-552",
            "title": "Koko eating bananas",
            "time": "Est. 20 min"
          },
          {
            "id": "task-553",
            "title": "Minimum days to make M bouquets",
            "time": "Est. 25 min"
          },
          {
            "id": "task-554",
            "title": "Capacity to Ship Packages Within D Days",
            "time": "Est. 45 min"
          },
          {
            "id": "task-555",
            "title": "Where Rows Actually Live",
            "time": "Est. 56 min"
          }
        ]
      }
    ]
  },
  {
    "id": "sprint-5",
    "name": "Sprint 5",
    "meta": "•UpcomingEst. 38h 53m · Time spent : 0 sec",
    "days": [
      {
        "id": "sprint-5-day-1",
        "globalDay": 29,
        "name": "Day 1",
        "meta": "Est. 4h 53m",
        "tasks": [
          {
            "id": "task-556",
            "title": "Kth Missing Positive Number",
            "time": "Est. 45 min"
          },
          {
            "id": "task-557",
            "title": "Painter's Partition",
            "time": "Est. 45 min"
          },
          {
            "id": "task-558",
            "title": "How a B+ Tree Is Built with Data",
            "time": "Est. 29 min"
          },
          {
            "id": "task-559",
            "title": "Why the Wrong Primary Key Can Quietly Destroy You",
            "time": "Est. 16 min"
          },
          {
            "id": "task-560",
            "title": "Aggressive Cows",
            "time": "Est. 26 min"
          },
          {
            "id": "task-561",
            "title": "Index Strategy at Scale",
            "time": "Est. 13 min"
          },
          {
            "id": "task-562",
            "title": "From SQL to an Executable Plan",
            "time": "Est. 15 min"
          },
          {
            "id": "task-563",
            "title": "Book Allocation Problem",
            "time": "Est. 27 min"
          },
          {
            "id": "task-564",
            "title": "Algorithms for Selection, Projection, Sorting, and Aggregation",
            "time": "Est. 15 min"
          },
          {
            "id": "task-565",
            "title": "Join Processing Algorithms",
            "time": "Est. 15 min"
          },
          {
            "id": "task-566",
            "title": "Find peak element",
            "time": "Est. 32 min"
          },
          {
            "id": "task-567",
            "title": "Cost-Based Query Optimization",
            "time": "Est. 15 min"
          }
        ]
      },
      {
        "id": "sprint-5-day-2",
        "globalDay": 30,
        "name": "Day 2",
        "meta": "Est. 5h",
        "tasks": [
          {
            "id": "task-568",
            "title": "Performance & Debugging",
            "time": "Est. 1h 21m"
          },
          {
            "id": "task-569",
            "title": "Median of 2 sorted arrays",
            "time": "Est. 50 min"
          },
          {
            "id": "task-570",
            "title": "Kth element of 2 sorted arrays",
            "time": "Est. 10 min"
          },
          {
            "id": "task-571",
            "title": "Minimize Max Distance to Gas Station",
            "time": "Est. 58 min"
          },
          {
            "id": "task-572",
            "title": "Raw Data Setup and Stored Procedures",
            "time": "Est. 37 min"
          },
          {
            "id": "task-573",
            "title": "Debugging Queries with EXPLAIN",
            "time": "Est. 22 min"
          },
          {
            "id": "task-574",
            "title": "Split array - largest sum",
            "time": "Est. 11 min"
          },
          {
            "id": "task-575",
            "title": "Query Performance",
            "time": "Est. 9 min"
          },
          {
            "id": "task-576",
            "title": "Find row with maximum 1's",
            "time": "Est. 10 min"
          },
          {
            "id": "task-577",
            "title": "Debugging Correctness",
            "time": "Est. 12 min"
          }
        ]
      },
      {
        "id": "sprint-5-day-3",
        "globalDay": 31,
        "name": "Day 3",
        "meta": "Est. 4h 38m",
        "tasks": [
          {
            "id": "task-578",
            "title": "Search in a 2D Matrix",
            "time": "Est. 15 min"
          },
          {
            "id": "task-579",
            "title": "Permissions and Transactions Part-1",
            "time": "Est. 41 min"
          },
          {
            "id": "task-580",
            "title": "Search in 2D matrix - II",
            "time": "Est. 15 min"
          },
          {
            "id": "task-581",
            "title": "Find Peak Element - II",
            "time": "Est. 20 min"
          },
          {
            "id": "task-582",
            "title": "Matrix Median",
            "time": "Est. 23 min"
          },
          {
            "id": "task-583",
            "title": "Privileges and Roles",
            "time": "Est. 20 min"
          },
          {
            "id": "task-584",
            "title": "GRANTS",
            "time": "Est. 13 min"
          },
          {
            "id": "task-585",
            "title": "Pow(x,n)",
            "time": "Est. 23 min"
          },
          {
            "id": "task-586",
            "title": "GRANT ALL and WITH GRANT OPTION",
            "time": "Est. 3 min"
          },
          {
            "id": "task-587",
            "title": "ALTER USER",
            "time": "Est. 1 min"
          },
          {
            "id": "task-588",
            "title": "REVOKE",
            "time": "Est. 1 min"
          },
          {
            "id": "task-589",
            "title": "Permissions and Transactions Part-2",
            "time": "Est. 1h 1m"
          },
          {
            "id": "task-590",
            "title": "Generate Parentheses",
            "time": "Est. 22 min"
          },
          {
            "id": "task-591",
            "title": "Power Set",
            "time": "Est. 20 min"
          }
        ]
      },
      {
        "id": "sprint-5-day-4",
        "globalDay": 32,
        "name": "Day 4",
        "meta": "Est. 4h 51m",
        "tasks": [
          {
            "id": "task-592",
            "title": "Check if there exists a subsequence with sum K",
            "time": "Est. 23 min"
          },
          {
            "id": "task-593",
            "title": "Connection, Connection Pool and Commit",
            "time": "Est. 22 min"
          },
          {
            "id": "task-594",
            "title": "Count all subsequences with sum K",
            "time": "Est. 12 min"
          },
          {
            "id": "task-595",
            "title": "Rollback",
            "time": "Est. 1 min"
          },
          {
            "id": "task-596",
            "title": "Combination Sum",
            "time": "Est. 16 min"
          },
          {
            "id": "task-597",
            "title": "Savepoint",
            "time": "Est. 5 min"
          },
          {
            "id": "task-598",
            "title": "Internal Working of Transactions, Timeout and Deadlock",
            "time": "Est. 33 min"
          },
          {
            "id": "task-599",
            "title": "Combination Sum II",
            "time": "Est. 15 min"
          },
          {
            "id": "task-600",
            "title": "Subsets I",
            "time": "Est. 7 min"
          },
          {
            "id": "task-601",
            "title": "Subsets II",
            "time": "Est. 21 min"
          },
          {
            "id": "task-602",
            "title": "Transaction Concepts, ACID, and States",
            "time": "Est. 15 min"
          },
          {
            "id": "task-603",
            "title": "Schedules and Concurrency Anomalies",
            "time": "Est. 15 min"
          },
          {
            "id": "task-604",
            "title": "Combination Sum III",
            "time": "Est. 12 min"
          },
          {
            "id": "task-605",
            "title": "Conflict and View Serializability",
            "time": "Est. 15 min"
          },
          {
            "id": "task-606",
            "title": "Letter Combinations of a Phone Number",
            "time": "Est. 12 min"
          },
          {
            "id": "task-607",
            "title": "Palindrome partitioning",
            "time": "Est. 18 min"
          },
          {
            "id": "task-608",
            "title": "Recoverable, Cascadeless, and Strict Schedules",
            "time": "Est. 15 min"
          },
          {
            "id": "task-609",
            "title": "Lock-Based Protocols and Two-Phase Locking",
            "time": "Est. 15 min"
          },
          {
            "id": "task-610",
            "title": "Word Search",
            "time": "Est. 19 min"
          }
        ]
      },
      {
        "id": "sprint-5-day-5",
        "globalDay": 33,
        "name": "Day 5",
        "meta": "Est. 4h 46m",
        "tasks": [
          {
            "id": "task-611",
            "title": "Deadlock Handling",
            "time": "Est. 15 min"
          },
          {
            "id": "task-612",
            "title": "N Queen",
            "time": "Est. 24 min"
          },
          {
            "id": "task-613",
            "title": "Timestamp Ordering, Optimistic Control, and MVCC",
            "time": "Est. 15 min"
          },
          {
            "id": "task-614",
            "title": "SQL Isolation Levels",
            "time": "Est. 15 min"
          },
          {
            "id": "task-615",
            "title": "Rat in a Maze",
            "time": "Est. 19 min"
          },
          {
            "id": "task-616",
            "title": "Failures, Storage, and Recovery Goals",
            "time": "Est. 15 min"
          },
          {
            "id": "task-617",
            "title": "M Coloring Problem",
            "time": "Est. 22 min"
          },
          {
            "id": "task-618",
            "title": "Log-Based Recovery and Write-Ahead Logging",
            "time": "Est. 15 min"
          },
          {
            "id": "task-619",
            "title": "Sudoku Solver",
            "time": "Est. 31 min"
          },
          {
            "id": "task-620",
            "title": "Checkpoints and ARIES Intuition",
            "time": "Est. 15 min"
          },
          {
            "id": "task-621",
            "title": "Shadow Paging, Backup, and Point-in-Time Recovery",
            "time": "Est. 15 min"
          },
          {
            "id": "task-622",
            "title": "Introduction to Singly LinkedList",
            "time": "Est. 37 min"
          },
          {
            "id": "task-623",
            "title": "Declarative Integrity Beyond Keys",
            "time": "Est. 15 min"
          },
          {
            "id": "task-624",
            "title": "Authorization, Views, and Auditing",
            "time": "Est. 15 min"
          },
          {
            "id": "task-625",
            "title": "Database Security Threats and Protection",
            "time": "Est. 15 min"
          },
          {
            "id": "task-626",
            "title": "Traversal in Linked List",
            "time": "Est. 3 min"
          }
        ]
      },
      {
        "id": "sprint-5-day-6",
        "globalDay": 34,
        "name": "Day 6",
        "meta": "Est. 7h 46m",
        "tasks": [
          {
            "id": "task-627",
            "title": "Deletion in Linked List",
            "time": "Est. 32 min"
          },
          {
            "id": "task-628",
            "title": "Metadata, Statistics, Maintenance, and Observability",
            "time": "Est. 15 min"
          },
          {
            "id": "task-629",
            "title": "Distributed Database Foundations",
            "time": "Est. 15 min"
          },
          {
            "id": "task-630",
            "title": "Insertion in Linked List",
            "time": "Est. 24 min"
          },
          {
            "id": "task-631",
            "title": "Partitioning, Sharding, and Distributed IDs",
            "time": "Est. 15 min"
          },
          {
            "id": "task-632",
            "title": "Replication, Consistency, and CAP/PACELC",
            "time": "Est. 15 min"
          },
          {
            "id": "task-633",
            "title": "Deletion of the head of LL",
            "time": "Est. 6 min"
          },
          {
            "id": "task-634",
            "title": "Deletion of the tail of Linked List",
            "time": "Est. 10 min"
          },
          {
            "id": "task-635",
            "title": "Distributed Transactions and Coordination",
            "time": "Est. 15 min"
          },
          {
            "id": "task-636",
            "title": "Deletion of the Kth element of Linked List",
            "time": "Est. 15 min"
          },
          {
            "id": "task-637",
            "title": "NoSQL Data Models and SQL-vs-NoSQL Decisions",
            "time": "Est. 15 min"
          },
          {
            "id": "task-638",
            "title": "Delete the element with value X",
            "time": "Est. 2 min"
          },
          {
            "id": "task-639",
            "title": "Insertion at the head of Linked List",
            "time": "Est. 3 min"
          },
          {
            "id": "task-640",
            "title": "Insertion at the tail of Linked List",
            "time": "Est. 4 min"
          },
          {
            "id": "task-641",
            "title": "Insertion at the Kth position of Linked List",
            "time": "Est. 13 min"
          },
          {
            "id": "task-642",
            "title": "OLTP, OLAP, Warehousing, and Columnar Storage",
            "time": "Est. 15 min"
          },
          {
            "id": "task-643",
            "title": "Insertion before the value X in Linked List",
            "time": "Est. 4 min"
          },
          {
            "id": "task-644",
            "title": "Schema-Design Capstone",
            "time": "Est. 15 min"
          },
          {
            "id": "task-645",
            "title": "Introduction to Doubly LL",
            "time": "Est. 4 min"
          },
          {
            "id": "task-646",
            "title": "Deletion in Doubly LL",
            "time": "Est. 30 min"
          },
          {
            "id": "task-647",
            "title": "Storage and Query-Plan Lab",
            "time": "Est. 15 min"
          },
          {
            "id": "task-648",
            "title": "Concurrency and Recovery Lab",
            "time": "Est. 15 min"
          },
          {
            "id": "task-649",
            "title": "Insertion in DLL",
            "time": "Est. 15 min"
          },
          {
            "id": "task-650",
            "title": "GATE and Semester Problem Track",
            "time": "Est. 15 min"
          },
          {
            "id": "task-651",
            "title": "Convert Array to Doubly Linked List",
            "time": "Est. 10 min"
          },
          {
            "id": "task-652",
            "title": "Delete Tail of Doubly Linked List",
            "time": "Est. 5 min"
          },
          {
            "id": "task-653",
            "title": "Interview Depth by Candidate Level",
            "time": "Est. 15 min"
          },
          {
            "id": "task-654",
            "title": "Delete Kth Element of Doubly Linked List",
            "time": "Est. 14 min"
          },
          {
            "id": "task-655",
            "title": "Final Coverage and Source Alignment",
            "time": "Est. 15 min"
          },
          {
            "id": "task-656",
            "title": "Removing given node in Doubly Linked List",
            "time": "Est. 5 min"
          },
          {
            "id": "task-657",
            "title": "Insert node before head in Doubly Linked List",
            "time": "Est. 3 min"
          },
          {
            "id": "task-658",
            "title": "Insert node before tail in Doubly Linked List",
            "time": "Est. 5 min"
          },
          {
            "id": "task-659",
            "title": "Insert node before (kth node) in Doubly Linked List",
            "time": "Est. 5 min"
          },
          {
            "id": "task-660",
            "title": "Insert before given node in Doubly Linked List",
            "time": "Est. 2 min"
          },
          {
            "id": "task-661",
            "title": "Add two numbers in Linked List",
            "time": "Est. 14 min"
          },
          {
            "id": "task-662",
            "title": "Segregate odd and even nodes in Linked List",
            "time": "Est. 24 min"
          },
          {
            "id": "task-663",
            "title": "Sort a Linked List of 0's 1's and 2's",
            "time": "Est. 22 min"
          }
        ]
      },
      {
        "id": "sprint-5-day-7",
        "globalDay": 35,
        "name": "Day 7",
        "meta": "Est. 6h 59m",
        "tasks": [
          {
            "id": "task-664",
            "title": "Remove Nth node from the back of the LL",
            "time": "Est. 16 min"
          },
          {
            "id": "task-665",
            "title": "Reverse a LL",
            "time": "Est. 32 min"
          },
          {
            "id": "task-666",
            "title": "Add one to a number represented by LL",
            "time": "Est. 24 min"
          },
          {
            "id": "task-667",
            "title": "Find Middle of Linked List",
            "time": "Est. 14 min"
          },
          {
            "id": "task-668",
            "title": "Delete the middle node in LL",
            "time": "Est. 16 min"
          },
          {
            "id": "task-669",
            "title": "Check if LL is palindrome or not",
            "time": "Est. 20 min"
          },
          {
            "id": "task-670",
            "title": "Find the intersection point of Y LL",
            "time": "Est. 32 min"
          },
          {
            "id": "task-671",
            "title": "Detect a loop in LL",
            "time": "Est. 20 min"
          },
          {
            "id": "task-672",
            "title": "Find the starting point in LL",
            "time": "Est. 21 min"
          },
          {
            "id": "task-673",
            "title": "Length of loop in LL",
            "time": "Est. 14 min"
          },
          {
            "id": "task-674",
            "title": "Reverse LL in group of given size K",
            "time": "Est. 24 min"
          },
          {
            "id": "task-675",
            "title": "Rotate a LL",
            "time": "Est. 12 min"
          },
          {
            "id": "task-676",
            "title": "Merge two Sorted Lists",
            "time": "Est. 18 min"
          },
          {
            "id": "task-677",
            "title": "Flattening of LL",
            "time": "Est. 33 min"
          },
          {
            "id": "task-678",
            "title": "Sort LL",
            "time": "Est. 22 min"
          },
          {
            "id": "task-679",
            "title": "Clone a LL with random and next pointer",
            "time": "Est. 33 min"
          },
          {
            "id": "task-680",
            "title": "Delete all occurrences of a key in DLL",
            "time": "Est. 11 min"
          },
          {
            "id": "task-681",
            "title": "Remove duplicates from sorted DLL",
            "time": "Est. 12 min"
          },
          {
            "id": "task-682",
            "title": "Find Pairs with Given Sum in Doubly Linked List",
            "time": "Est. 45 min"
          }
        ]
      }
    ]
  },
  {
    "id": "sprint-6",
    "name": "Sprint 6",
    "meta": "•UpcomingEst. 39h 50m · Time spent : 0 sec",
    "days": [
      {
        "id": "sprint-6-day-1",
        "globalDay": 36,
        "name": "Day 1",
        "meta": "Est. 4h 54m",
        "tasks": [
          {
            "id": "task-683",
            "title": "Introduction to Bits and Tricks",
            "time": "Est. 1h 20m"
          },
          {
            "id": "task-684",
            "title": "Minimum Bit Flips to Convert Number",
            "time": "Est. 7 min"
          },
          {
            "id": "task-685",
            "title": "Single Number - I",
            "time": "Est. 7 min"
          },
          {
            "id": "task-686",
            "title": "Single Number - II",
            "time": "Est. 30 min"
          },
          {
            "id": "task-687",
            "title": "Single Number - III",
            "time": "Est. 24 min"
          },
          {
            "id": "task-688",
            "title": "Divide two numbers without multiplication and division",
            "time": "Est. 19 min"
          },
          {
            "id": "task-689",
            "title": "Power Set Bit Manipulation",
            "time": "Est. 12 min"
          },
          {
            "id": "task-690",
            "title": "XOR of numbers in a given range",
            "time": "Est. 5 min"
          },
          {
            "id": "task-691",
            "title": "Assign Cookies",
            "time": "Est. 10 min"
          },
          {
            "id": "task-692",
            "title": "Lemonade Change",
            "time": "Est. 9 min"
          },
          {
            "id": "task-693",
            "title": "Fractional Knapsack",
            "time": "Est. 45 min"
          },
          {
            "id": "task-694",
            "title": "Jump Game - I",
            "time": "Est. 10 min"
          },
          {
            "id": "task-695",
            "title": "Shortest Job First",
            "time": "Est. 7 min"
          },
          {
            "id": "task-696",
            "title": "Job sequencing Problem",
            "time": "Est. 16 min"
          },
          {
            "id": "task-697",
            "title": "N meetings in one room",
            "time": "Est. 13 min"
          }
        ]
      },
      {
        "id": "sprint-6-day-2",
        "globalDay": 37,
        "name": "Day 2",
        "meta": "Est. 4h 42m",
        "tasks": [
          {
            "id": "task-698",
            "title": "Non-overlapping Intervals",
            "time": "Est. 8 min"
          },
          {
            "id": "task-699",
            "title": "Insert Interval",
            "time": "Est. 13 min"
          },
          {
            "id": "task-700",
            "title": "Merge Intervals",
            "time": "Est. 45 min"
          },
          {
            "id": "task-701",
            "title": "Minimum number of platforms required for a railway",
            "time": "Est. 18 min"
          },
          {
            "id": "task-702",
            "title": "Valid Paranthesis Checker",
            "time": "Est. 25 min"
          },
          {
            "id": "task-703",
            "title": "Candy",
            "time": "Est. 30 min"
          },
          {
            "id": "task-704",
            "title": "Jump Game II",
            "time": "Est. 45 min"
          },
          {
            "id": "task-705",
            "title": "Theory",
            "time": "Est. 36 min"
          },
          {
            "id": "task-706",
            "title": "Maximum Points You Can Obtain from Cards",
            "time": "Est. 11 min"
          },
          {
            "id": "task-707",
            "title": "Longest Substring Without Repeating Characters",
            "time": "Est. 22 min"
          },
          {
            "id": "task-708",
            "title": "Max Consecutive Ones III",
            "time": "Est. 29 min"
          }
        ]
      },
      {
        "id": "sprint-6-day-3",
        "globalDay": 38,
        "name": "Day 3",
        "meta": "Est. 5h",
        "tasks": [
          {
            "id": "task-709",
            "title": "Fruit Into Baskets",
            "time": "Est. 29 min"
          },
          {
            "id": "task-710",
            "title": "Longest Substring With At Most K Distinct Characters",
            "time": "Est. 21 min"
          },
          {
            "id": "task-711",
            "title": "Longest Repeating Character Replacement",
            "time": "Est. 25 min"
          },
          {
            "id": "task-712",
            "title": "Minimum Window Substring",
            "time": "Est. 26 min"
          },
          {
            "id": "task-713",
            "title": "Number of Substrings Containing All Three Characters",
            "time": "Est. 19 min"
          },
          {
            "id": "task-714",
            "title": "Binary Subarrays With Sum",
            "time": "Est. 20 min"
          },
          {
            "id": "task-715",
            "title": "Count number of Nice subarrays",
            "time": "Est. 4 min"
          },
          {
            "id": "task-716",
            "title": "Subarrays with K Different Integers",
            "time": "Est. 45 min"
          },
          {
            "id": "task-717",
            "title": "Implementation using different DS",
            "time": "Est. 1h 4m"
          },
          {
            "id": "task-718",
            "title": "Implement Stack using Arrays",
            "time": "Est. 8 min"
          },
          {
            "id": "task-719",
            "title": "Implement Queue using Arrays",
            "time": "Est. 12 min"
          },
          {
            "id": "task-720",
            "title": "Implement Stack using Queue",
            "time": "Est. 6 min"
          },
          {
            "id": "task-721",
            "title": "Implement Queue using Stack",
            "time": "Est. 14 min"
          },
          {
            "id": "task-722",
            "title": "Implement stack using Linkedlist",
            "time": "Est. 7 min"
          }
        ]
      },
      {
        "id": "sprint-6-day-4",
        "globalDay": 39,
        "name": "Day 4",
        "meta": "Est. 4h 50m",
        "tasks": [
          {
            "id": "task-723",
            "title": "Implement queue using Linkedlist",
            "time": "Est. 7 min"
          },
          {
            "id": "task-724",
            "title": "Balanced Paranthesis",
            "time": "Est. 12 min"
          },
          {
            "id": "task-725",
            "title": "Next Greater Element",
            "time": "Est. 18 min"
          },
          {
            "id": "task-726",
            "title": "Next Greater Element - 2",
            "time": "Est. 15 min"
          },
          {
            "id": "task-727",
            "title": "Asteroid Collision",
            "time": "Est. 17 min"
          },
          {
            "id": "task-728",
            "title": "Sum of Subarray Minimums",
            "time": "Est. 23 min"
          },
          {
            "id": "task-729",
            "title": "Sum of Subarray Ranges",
            "time": "Est. 10 min"
          },
          {
            "id": "task-730",
            "title": "Remove K Digits",
            "time": "Est. 15 min"
          },
          {
            "id": "task-731",
            "title": "Implement Min Stack",
            "time": "Est. 21 min"
          },
          {
            "id": "task-732",
            "title": "Sliding Window Maximum",
            "time": "Est. 20 min"
          },
          {
            "id": "task-733",
            "title": "Trapping Rainwater",
            "time": "Est. 29 min"
          },
          {
            "id": "task-734",
            "title": "Largest rectangle in a histogram",
            "time": "Est. 31 min"
          },
          {
            "id": "task-735",
            "title": "Maximum Rectangles",
            "time": "Est. 12 min"
          },
          {
            "id": "task-736",
            "title": "Stock span problem",
            "time": "Est. 19 min"
          },
          {
            "id": "task-737",
            "title": "Celebrity Problem",
            "time": "Est. 16 min"
          },
          {
            "id": "task-738",
            "title": "LRU Cache",
            "time": "Est. 25 min"
          }
        ]
      },
      {
        "id": "sprint-6-day-5",
        "globalDay": 40,
        "name": "Day 5",
        "meta": "Est. 4h 47m",
        "tasks": [
          {
            "id": "task-739",
            "title": "LFU Cache",
            "time": "Est. 45 min"
          },
          {
            "id": "task-740",
            "title": "Introduction",
            "time": "Est. 32 min"
          },
          {
            "id": "task-741",
            "title": "Inorder Traversal",
            "time": "Est. 37 min"
          },
          {
            "id": "task-742",
            "title": "Preorder Traversal",
            "time": "Est. 18 min"
          },
          {
            "id": "task-743",
            "title": "Postorder Traversal",
            "time": "Est. 14 min"
          },
          {
            "id": "task-744",
            "title": "Level Order Traversal",
            "time": "Est. 8 min"
          },
          {
            "id": "task-745",
            "title": "Pre, Post, Inorder in one traversal",
            "time": "Est. 10 min"
          },
          {
            "id": "task-746",
            "title": "Maximum Depth in BT",
            "time": "Est. 7 min"
          },
          {
            "id": "task-747",
            "title": "Check if two trees are identical or not",
            "time": "Est. 4 min"
          },
          {
            "id": "task-748",
            "title": "Check for balanced binary tree",
            "time": "Est. 12 min"
          },
          {
            "id": "task-749",
            "title": "Diameter of Binary Tree",
            "time": "Est. 13 min"
          },
          {
            "id": "task-750",
            "title": "Maximum path sum",
            "time": "Est. 17 min"
          },
          {
            "id": "task-751",
            "title": "Check for symmetrical BTs",
            "time": "Est. 8 min"
          },
          {
            "id": "task-752",
            "title": "Children Sum Property in Binary Tree",
            "time": "Est. 45 min"
          },
          {
            "id": "task-753",
            "title": "Zig Zag or Spiral Traversal",
            "time": "Est. 8 min"
          },
          {
            "id": "task-754",
            "title": "Boundary Traversal",
            "time": "Est. 9 min"
          }
        ]
      },
      {
        "id": "sprint-6-day-6",
        "globalDay": 41,
        "name": "Day 6",
        "meta": "Est. 7h 55m",
        "tasks": [
          {
            "id": "task-755",
            "title": "Vertical Order Traversal",
            "time": "Est. 18 min"
          },
          {
            "id": "task-756",
            "title": "Top View of BT",
            "time": "Est. 9 min"
          },
          {
            "id": "task-757",
            "title": "Bottom view of BT",
            "time": "Est. 12 min"
          },
          {
            "id": "task-758",
            "title": "Right/Left View of BT",
            "time": "Est. 12 min"
          },
          {
            "id": "task-759",
            "title": "Print root to leaf path in BT",
            "time": "Est. 10 min"
          },
          {
            "id": "task-760",
            "title": "LCA in BT",
            "time": "Est. 13 min"
          },
          {
            "id": "task-761",
            "title": "Maximum Width of BT",
            "time": "Est. 21 min"
          },
          {
            "id": "task-762",
            "title": "Print all nodes at a distance of K in BT",
            "time": "Est. 16 min"
          },
          {
            "id": "task-763",
            "title": "Minimum time taken to burn the BT from a given Node",
            "time": "Est. 17 min"
          },
          {
            "id": "task-764",
            "title": "Count total nodes in a complete BT",
            "time": "Est. 15 min"
          },
          {
            "id": "task-765",
            "title": "Flatten Binary Tree to Linked List",
            "time": "Est. 45 min"
          },
          {
            "id": "task-766",
            "title": "Requirements needed to construct a unique BT",
            "time": "Est. 7 min"
          },
          {
            "id": "task-767",
            "title": "Construct a BT from Preorder and Inorder",
            "time": "Est. 18 min"
          },
          {
            "id": "task-768",
            "title": "Construct a BT from Postorder and Inorder",
            "time": "Est. 19 min"
          },
          {
            "id": "task-769",
            "title": "Serialize and De-serialize BT",
            "time": "Est. 16 min"
          },
          {
            "id": "task-770",
            "title": "Morris Inorder Traversal",
            "time": "Est. 19 min"
          },
          {
            "id": "task-771",
            "title": "Morris Preorder Traversal",
            "time": "Est. 4 min"
          },
          {
            "id": "task-772",
            "title": "Introduction to BST",
            "time": "Est. 7 min"
          },
          {
            "id": "task-773",
            "title": "Search in BST",
            "time": "Est. 5 min"
          },
          {
            "id": "task-774",
            "title": "Floor and Ceil in a BST",
            "time": "Est. 8 min"
          },
          {
            "id": "task-775",
            "title": "Insert a given node in BST",
            "time": "Est. 7 min"
          },
          {
            "id": "task-776",
            "title": "Delete a node in BST",
            "time": "Est. 15 min"
          },
          {
            "id": "task-777",
            "title": "Kth Smallest and Largest element in BST",
            "time": "Est. 8 min"
          },
          {
            "id": "task-778",
            "title": "Check if a tree is a BST or not",
            "time": "Est. 9 min"
          },
          {
            "id": "task-779",
            "title": "LCA in BST",
            "time": "Est. 8 min"
          },
          {
            "id": "task-780",
            "title": "Construct a BST from a preorder traversal",
            "time": "Est. 16 min"
          },
          {
            "id": "task-781",
            "title": "Inorder successor and predecessor in BST",
            "time": "Est. 10 min"
          },
          {
            "id": "task-782",
            "title": "BST iterator",
            "time": "Est. 14 min"
          },
          {
            "id": "task-783",
            "title": "Two sum in BST",
            "time": "Est. 14 min"
          },
          {
            "id": "task-784",
            "title": "Correct BST with two nodes swapped",
            "time": "Est. 16 min"
          },
          {
            "id": "task-785",
            "title": "Largest BST in Binary Tree",
            "time": "Est. 17 min"
          },
          {
            "id": "task-786",
            "title": "Heaps (Theory Video)",
            "time": "Est. 27 min"
          },
          {
            "id": "task-787",
            "title": "Heapify Algorithm",
            "time": "Est. 23 min"
          }
        ]
      },
      {
        "id": "sprint-6-day-7",
        "globalDay": 42,
        "name": "Day 7",
        "meta": "Est. 7h 42m",
        "tasks": [
          {
            "id": "task-788",
            "title": "Build heap from a given Array",
            "time": "Est. 15 min"
          },
          {
            "id": "task-789",
            "title": "Implement Min Heap",
            "time": "Est. 12 min"
          },
          {
            "id": "task-790",
            "title": "Implement Max Heap",
            "time": "Est. 20 min"
          },
          {
            "id": "task-791",
            "title": "Check if an array represents a min heap",
            "time": "Est. 7 min"
          },
          {
            "id": "task-792",
            "title": "Convert Min Heap to Max Heap",
            "time": "Est. 4 min"
          },
          {
            "id": "task-793",
            "title": "Heap Sort",
            "time": "Est. 30 min"
          },
          {
            "id": "task-794",
            "title": "K-th Largest element in an array",
            "time": "Est. 44 min"
          },
          {
            "id": "task-795",
            "title": "Kth largest element in a stream of running integers",
            "time": "Est. 16 min"
          },
          {
            "id": "task-796",
            "title": "Introduction to Graph",
            "time": "Est. 41 min"
          },
          {
            "id": "task-797",
            "title": "Traversal Techniques",
            "time": "Est. 39 min"
          },
          {
            "id": "task-798",
            "title": "Connected Components",
            "time": "Est. 7 min"
          },
          {
            "id": "task-799",
            "title": "Number of provinces",
            "time": "Est. 15 min"
          },
          {
            "id": "task-800",
            "title": "Number of islands",
            "time": "Est. 24 min"
          },
          {
            "id": "task-801",
            "title": "Flood fill algorithm",
            "time": "Est. 20 min"
          },
          {
            "id": "task-802",
            "title": "Number of enclaves",
            "time": "Est. 15 min"
          },
          {
            "id": "task-803",
            "title": "Rotten Oranges",
            "time": "Est. 22 min"
          },
          {
            "id": "task-804",
            "title": "Distance of nearest cell having one",
            "time": "Est. 20 min"
          },
          {
            "id": "task-805",
            "title": "Surrounded Regions",
            "time": "Est. 23 min"
          },
          {
            "id": "task-806",
            "title": "Number of distinct islands",
            "time": "Est. 18 min"
          },
          {
            "id": "task-807",
            "title": "Detect a cycle in an undirected graph",
            "time": "Est. 38 min"
          },
          {
            "id": "task-808",
            "title": "Bipartite graph",
            "time": "Est. 32 min"
          }
        ]
      }
    ]
  },
  {
    "id": "sprint-7",
    "name": "Sprint 7",
    "meta": "•UpcomingEst. 40h 21m · Time spent : 0 sec",
    "days": [
      {
        "id": "sprint-7-day-1",
        "globalDay": 43,
        "name": "Day 1",
        "meta": "Est. 4h 55m",
        "tasks": [
          {
            "id": "task-809",
            "title": "Topological sort or Kahn's algorithm",
            "time": "Est. 26 min"
          },
          {
            "id": "task-810",
            "title": "Detect a cycle in a directed graph",
            "time": "Est. 23 min"
          },
          {
            "id": "task-811",
            "title": "Find eventual safe states",
            "time": "Est. 39 min"
          },
          {
            "id": "task-812",
            "title": "Course Schedule I",
            "time": "Est. 11 min"
          },
          {
            "id": "task-813",
            "title": "Course Schedule II",
            "time": "Est. 11 min"
          },
          {
            "id": "task-814",
            "title": "Alien Dictionary",
            "time": "Est. 20 min"
          },
          {
            "id": "task-815",
            "title": "Shortest path in DAG",
            "time": "Est. 26 min"
          },
          {
            "id": "task-816",
            "title": "Shortest path in undirected graph with unit weights",
            "time": "Est. 16 min"
          },
          {
            "id": "task-817",
            "title": "Word ladder I",
            "time": "Est. 28 min"
          },
          {
            "id": "task-818",
            "title": "Word ladder II",
            "time": "Est. 48 min"
          },
          {
            "id": "task-819",
            "title": "Dijkstra's algorithm",
            "time": "Est. 47 min"
          }
        ]
      },
      {
        "id": "sprint-7-day-2",
        "globalDay": 44,
        "name": "Day 2",
        "meta": "Est. 4h 51m",
        "tasks": [
          {
            "id": "task-820",
            "title": "Print Shortest Path",
            "time": "Est. 19 min"
          },
          {
            "id": "task-821",
            "title": "Shortest Distance in a Binary Maze",
            "time": "Est. 21 min"
          },
          {
            "id": "task-822",
            "title": "Path with minimum effort",
            "time": "Est. 24 min"
          },
          {
            "id": "task-823",
            "title": "Cheapest flight within K stops",
            "time": "Est. 23 min"
          },
          {
            "id": "task-824",
            "title": "Minimum multiplications to reach end",
            "time": "Est. 19 min"
          },
          {
            "id": "task-825",
            "title": "Number of ways to arrive at destination",
            "time": "Est. 23 min"
          },
          {
            "id": "task-826",
            "title": "Bellman ford algorithm",
            "time": "Est. 27 min"
          },
          {
            "id": "task-827",
            "title": "Floyd warshall algorithm",
            "time": "Est. 30 min"
          },
          {
            "id": "task-828",
            "title": "Find the city with the smallest number of neighbors",
            "time": "Est. 12 min"
          },
          {
            "id": "task-829",
            "title": "MST theory",
            "time": "Est. 7 min"
          },
          {
            "id": "task-830",
            "title": "Disjoint Set",
            "time": "Est. 41 min"
          },
          {
            "id": "task-831",
            "title": "Find the MST weight",
            "time": "Est. 31 min"
          },
          {
            "id": "task-832",
            "title": "Number of operations to make network connected",
            "time": "Est. 14 min"
          }
        ]
      },
      {
        "id": "sprint-7-day-3",
        "globalDay": 45,
        "name": "Day 3",
        "meta": "Est. 4h 57m",
        "tasks": [
          {
            "id": "task-833",
            "title": "Accounts merge",
            "time": "Est. 21 min"
          },
          {
            "id": "task-834",
            "title": "Number of islands II",
            "time": "Est. 25 min"
          },
          {
            "id": "task-835",
            "title": "Making a large island",
            "time": "Est. 26 min"
          },
          {
            "id": "task-836",
            "title": "Most stones removed with same row or column",
            "time": "Est. 23 min"
          },
          {
            "id": "task-837",
            "title": "Kosaraju's algorithm",
            "time": "Est. 22 min"
          },
          {
            "id": "task-838",
            "title": "Bridges in graph",
            "time": "Est. 23 min"
          },
          {
            "id": "task-839",
            "title": "Articulation point in graph",
            "time": "Est. 21 min"
          },
          {
            "id": "task-840",
            "title": "Introduction to DP",
            "time": "Est. 30 min"
          },
          {
            "id": "task-841",
            "title": "Climbing stairs",
            "time": "Est. 13 min"
          },
          {
            "id": "task-842",
            "title": "Frog Jump",
            "time": "Est. 37 min"
          },
          {
            "id": "task-843",
            "title": "Frog jump with K distances",
            "time": "Est. 16 min"
          },
          {
            "id": "task-844",
            "title": "Maximum sum of non adjacent elements",
            "time": "Est. 31 min"
          },
          {
            "id": "task-845",
            "title": "House robber",
            "time": "Est. 9 min"
          }
        ]
      },
      {
        "id": "sprint-7-day-4",
        "globalDay": 46,
        "name": "Day 4",
        "meta": "Est. 4h 50m",
        "tasks": [
          {
            "id": "task-846",
            "title": "Ninja's training",
            "time": "Est. 51 min"
          },
          {
            "id": "task-847",
            "title": "Grid unique paths",
            "time": "Est. 44 min"
          },
          {
            "id": "task-848",
            "title": "Unique paths II",
            "time": "Est. 12 min"
          },
          {
            "id": "task-849",
            "title": "Minimum Falling Path Sum",
            "time": "Est. 41 min"
          },
          {
            "id": "task-850",
            "title": "Triangle",
            "time": "Est. 33 min"
          },
          {
            "id": "task-851",
            "title": "Cherry pickup II",
            "time": "Est. 42 min"
          },
          {
            "id": "task-852",
            "title": "Best time to buy and sell stock",
            "time": "Est. 7 min"
          },
          {
            "id": "task-853",
            "title": "Best time to buy and sell stock II",
            "time": "Est. 35 min"
          },
          {
            "id": "task-854",
            "title": "Best time to buy and sell stock III",
            "time": "Est. 25 min"
          }
        ]
      },
      {
        "id": "sprint-7-day-5",
        "globalDay": 47,
        "name": "Day 5",
        "meta": "Est. 4h 49m",
        "tasks": [
          {
            "id": "task-855",
            "title": "Best time to buy and sell stock IV",
            "time": "Est. 12 min"
          },
          {
            "id": "task-856",
            "title": "Best time to buy and sell stock with transaction fees",
            "time": "Est. 6 min"
          },
          {
            "id": "task-857",
            "title": "Subset sum equals to target",
            "time": "Est. 35 min"
          },
          {
            "id": "task-858",
            "title": "Partition equal subset sum",
            "time": "Est. 7 min"
          },
          {
            "id": "task-859",
            "title": "Partition a set into two subsets with minimum absolute sum difference",
            "time": "Est. 29 min"
          },
          {
            "id": "task-860",
            "title": "Count subsets with sum K",
            "time": "Est. 35 min"
          },
          {
            "id": "task-861",
            "title": "Count partitions with given difference",
            "time": "Est. 17 min"
          },
          {
            "id": "task-862",
            "title": "0 and 1 Knapsack",
            "time": "Est. 40 min"
          },
          {
            "id": "task-863",
            "title": "Minimum coins",
            "time": "Est. 34 min"
          },
          {
            "id": "task-864",
            "title": "Target sum",
            "time": "Est. 8 min"
          },
          {
            "id": "task-865",
            "title": "Coin change II",
            "time": "Est. 22 min"
          },
          {
            "id": "task-866",
            "title": "Unbounded knapsack",
            "time": "Est. 22 min"
          },
          {
            "id": "task-867",
            "title": "Rod cutting problem",
            "time": "Est. 22 min"
          }
        ]
      },
      {
        "id": "sprint-7-day-6",
        "globalDay": 48,
        "name": "Day 6",
        "meta": "Est. 7h 59m",
        "tasks": [
          {
            "id": "task-868",
            "title": "Longest Increasing Subsequence",
            "time": "Est. 40 min"
          },
          {
            "id": "task-869",
            "title": "Print Longest Increasing Subsequence",
            "time": "Est. 26 min"
          },
          {
            "id": "task-870",
            "title": "Largest Divisible Subset",
            "time": "Est. 14 min"
          },
          {
            "id": "task-871",
            "title": "Longest String Chain",
            "time": "Est. 16 min"
          },
          {
            "id": "task-872",
            "title": "Longest Bitonic Subsequence",
            "time": "Est. 13 min"
          },
          {
            "id": "task-873",
            "title": "Number of Longest Increasing Subsequences",
            "time": "Est. 20 min"
          },
          {
            "id": "task-874",
            "title": "Longest common subsequence",
            "time": "Est. 46 min"
          },
          {
            "id": "task-875",
            "title": "Longest common substring",
            "time": "Est. 14 min"
          },
          {
            "id": "task-876",
            "title": "Longest palindromic subsequence",
            "time": "Est. 9 min"
          },
          {
            "id": "task-877",
            "title": "Minimum insertions to make string palindrome",
            "time": "Est. 12 min"
          },
          {
            "id": "task-878",
            "title": "Minimum insertions or deletions to convert string A to B",
            "time": "Est. 7 min"
          },
          {
            "id": "task-879",
            "title": "Shortest common supersequence",
            "time": "Est. 26 min"
          },
          {
            "id": "task-880",
            "title": "Distinct subsequences",
            "time": "Est. 40 min"
          },
          {
            "id": "task-881",
            "title": "Edit distance",
            "time": "Est. 37 min"
          },
          {
            "id": "task-882",
            "title": "Wildcard matching",
            "time": "Est. 43 min"
          },
          {
            "id": "task-883",
            "title": "Matrix chain multiplication",
            "time": "Est. 1h 1m"
          },
          {
            "id": "task-884",
            "title": "Burst balloons",
            "time": "Est. 33 min"
          },
          {
            "id": "task-885",
            "title": "Palindrome partitioning II",
            "time": "Est. 22 min"
          }
        ]
      },
      {
        "id": "sprint-7-day-7",
        "globalDay": 49,
        "name": "Day 7",
        "meta": "Est. 8h",
        "tasks": [
          {
            "id": "task-886",
            "title": "Partition Array for Maximum Sum",
            "time": "Est. 45 min"
          },
          {
            "id": "task-887",
            "title": "Minimum cost to cut the stick",
            "time": "Est. 28 min"
          },
          {
            "id": "task-888",
            "title": "Different Ways to Evaluate a Boolean Expression",
            "time": "Est. 45 min"
          },
          {
            "id": "task-889",
            "title": "Trie Implementation and Operations",
            "time": "Est. 30 min"
          },
          {
            "id": "task-890",
            "title": "Trie Implementation and Advanced Operations",
            "time": "Est. 22 min"
          },
          {
            "id": "task-891",
            "title": "Longest Word with All Prefixes",
            "time": "Est. 25 min"
          },
          {
            "id": "task-892",
            "title": "Number of distinct substrings in a string",
            "time": "Est. 17 min"
          },
          {
            "id": "task-893",
            "title": "Maximum XOR of two numbers in an array",
            "time": "Est. 34 min"
          },
          {
            "id": "task-894",
            "title": "Maximum Xor with an element from an array",
            "time": "Est. 23 min"
          },
          {
            "id": "task-895",
            "title": "Reverse every word in a string",
            "time": "Est. 31 min"
          },
          {
            "id": "task-896",
            "title": "Minimum number of bracket reversals to make an expression balanced",
            "time": "Est. 20 min"
          },
          {
            "id": "task-897",
            "title": "Count and say",
            "time": "Est. 19 min"
          },
          {
            "id": "task-898",
            "title": "Rabin Karp Algorithm",
            "time": "Est. 34 min"
          },
          {
            "id": "task-899",
            "title": "Z function",
            "time": "Est. 35 min"
          },
          {
            "id": "task-900",
            "title": "KMP Algorithm or LPS array",
            "time": "Est. 29 min"
          },
          {
            "id": "task-901",
            "title": "Shortest Palindrome",
            "time": "Est. 7 min"
          },
          {
            "id": "task-902",
            "title": "Longest happy prefix",
            "time": "Est. 3 min"
          },
          {
            "id": "task-903",
            "title": "Print all primes till N",
            "time": "Est. 18 min"
          },
          {
            "id": "task-904",
            "title": "Prime factorisation of a Number",
            "time": "Est. 15 min"
          }
        ]
      }
    ]
  },
  {
    "id": "sprint-8",
    "name": "Sprint 8",
    "meta": "•UpcomingEst. 16 min · Time spent : 0 sec",
    "days": [
      {
        "id": "sprint-8-day-1",
        "globalDay": 50,
        "name": "Day 1",
        "meta": "Est. 16 min",
        "tasks": [
          {
            "id": "task-905",
            "title": "Count primes in range L to R",
            "time": "Est. 16 min"
          }
        ]
      }
    ]
  }
];
