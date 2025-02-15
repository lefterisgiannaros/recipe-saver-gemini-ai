import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Lefteris Giannaros",
  initials: "LG",
  url: "https://lefosg.gr",
  location: "Athens, GR",
  locationLink: "https://www.google.com/maps/place/athens",
  description:
    "Front-End Developer focused on React.js. I love automating tasks and exploring new tech and innovation. I always seek to understand how things work and help businesses meet their needs. Actively exploring React.js.",
  summary:
    // "At the end of 2022, I quit my job as a software engineer to go fulltime into building and scaling my own SaaS businesses. In the past, [I pursued a double degree in computer science and business](/#education), [interned at big tech companies in Silicon Valley](https://www.youtube.com/watch?v=d-LJ2e5qKdE), and [competed in over 21 hackathons for fun](/#hackathons). I also had the pleasure of being a part of the first ever in-person cohort of buildspace called [buildspace sf1](https://buildspace.so/sf1).",
    "At the end of 2022, I focused entirely on front-end development with Vue.js and implemented various automations to streamline processes. Previously, I led a team for cloud ERP software support and worked on performance optimization and ads tracking. Currently, I’m actively learning and exploring React.js to further expand my skills.",
  avatarUrl: "/me.jpeg",
  skills: [
    "React",
    "Next.js",
    "Typescript",
    "Vue",
    "Node.js",
    "Python",
    "C#",
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "lefterisgiannaros@gmail.com",
    // tel: "+123456789",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/lefterisgiannaros",
        icon: Icons.github,

        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/lefterisgiannaros/",
        icon: Icons.linkedin,
        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/_lefosg",
        icon: Icons.x,
        navbar: true,
      },
      // Youtube: {
      //   name: "Youtube",
      //   url: "https://dub.sh/dillion-youtube",
      //   icon: Icons.youtube,
      //   navbar: true,
      // },
      email: {
        name: "Send Email",
        url: "mailto:lefterisgiannaros@gmail.com",
        icon: Icons.email,
        navbar: false,
      },
    },
  },
  work: [  
      {
        company: "VALUE",
        location: "Greece",
        href: "https://value.marketing",
        title: "Web Developer",
        start: "September 2023",
        end: "Present",
        badges: [],
        logoUrl: "/valuemarketing-logo.jpeg",
        description:
          "Developed custom solutions using Vue.js and automated workflows. Created Google Tag Manager scripts for tracking and ads. Focused on performance optimization and UX improvements.",
      },
      {
        company: "Parkaround",
        location: "Greece",
        href: "https://parkaround.gr",
        title: "Front-End Developer",
        start: "2022",
        end: "2023",
        badges: [],
        logoUrl: "/parkaround-logo.jpeg",
        description:
          "Built and enhanced features using Vue.js and Knockout.js. Collaborated with designers to implement custom UI elements. Automated testing and optimized website functionality.",
      },
      {
        company: "Epilisis Alfa Mihanografiki",
        location: "Greece",
        href: "https://epilisis.gr",
        title: "IT Consultant",
        start: "2020",
        end: "2022",
        badges: [],
        logoUrl: "/epilisis-logo.jpeg",
        description:
          "Led a support team for cloud ERP systems and implemented automations for over 80 businesses. Optimized workflows, resolved technical issues, and trained staff on new systems.",
      },
      {
        company: "Alfa Sigma Accounting",
        location: "Greece",
        href: "",
        title: "Junior Accountant",
        start: "2017",
        end: "2020",
        badges: [],
        logoUrl: "",
        description:
          "Automated data entry and financial management processes. Provided software and hardware support to optimize office IT systems.",
      },
  ],
  education: [
    {
      school: "IEK Sivitanidios",
      href: "https://www.sivitanidios.edu.gr",
      degree: "Certificate of Vocational Training in Computer Software Engineering",
      logoUrl: "/sivitanidios-logo.jpeg",
      start: "2017",
      end: "2019",
    },
    {
      school: "EKPA E-Learning",
      href: "https://elearningekpa.gr/",
      degree: "Front-End Development Certificate",
      logoUrl: "/ekpa-logo.jpeg",
      start: "2019",
      end: "2020",
    },
    {
      school: "Tech Talent School",
      href: "https://techtalentschool.gr/",
      degree: "Coding Bootcamp",
      logoUrl: "/techtalentschool-logo.png",
      start: "2019",
      end: "2019",
    },
  ],
  projects: [
    {
      title: "Gemini AI Recipe Crawl Chrome Extension",
      href: "https://github.com/lefterisgiannaros/gemini-recipe-crawl-chrome-extension",
      dates: "2024",
      active: true,
      description: "A Chrome extension that scrapes recipe data from websites using the Gemini Nano API for seamless integration into user meal plans.",
      technologies: [
        "Gemini Nano API",
        "JavaScript",
        "Webpack",
        "HTML",
        "CSS"
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/lefterisgiannaros/gemini-recipe-crawl-chrome-extension",
          icon: <Icons.github className='size-3' />
        }
      ],
      image: "",
      video: "/gemini-crawl-recipe.mp4"
    },
    {
      title: "Find A Coach",
      href: "https://vue-demo-2872e.web.app/coaches",
      dates: "2023",
      active: false,
      description: "A web platform to help users find and connect with personal coaches, built with Vue.js and Firebase.",
      technologies: [
        "Vue.js",
        "Pinia",
        "Firebase",
        "Tailwind CSS"
      ],
      links: [
        {
          type: "Website",
          href: "https://vue-demo-2872e.web.app/coaches",
          icon: <Icons.globe className='size-3' />
        }
      ],
      image: "",
      video: "/vue-find-a-coach.mp4"
    },
    {
      title: "React Tic Tac Toe",
      href: "https://tictactoe-react-lg.netlify.app/",
      dates: "2023",
      active: false,
      description: "A simple tic-tac-toe game built using React.js.",
      technologies: [
        "React.js"
      ],
      links: [
        {
          type: "Website",
          href: "https://tictactoe-react-lg.netlify.app/",
          icon: <Icons.globe className='size-3' />
        }
      ],
      image: "",
      video: "/react-tictactoe.mp4"
    },
    {
      title: "Custom CSS Landing Page",
      href: "https://magenta-cendol-67c367.netlify.app/",
      dates: "2023",
      active: false,
      description: "A custom landing page designed with React.js, React Router, and styled with Sass and Bootstrap.",
      technologies: [
        "React.js",
        "React Router",
        "Sass",
        "Bootstrap"
      ],
      links: [
        {
          type: "Website",
          href: "https://magenta-cendol-67c367.netlify.app/",
          icon: <Icons.globe className='size-3' />
        }
      ],
      image: "",
      video: "/css-ui.mp4"
    },
    {
      title: "Band Website",
      href: "https://countownband.com/",
      dates: "2023",
      active: false,
      description: "A promotional website for a band, developed with HTML, CSS, and JavaScript.",
      technologies: [
        "HTML",
        "CSS",
        "JavaScript"
      ],
      links: [
        {
          type: "Website",
          href: "https://countownband.com/",
          icon: <Icons.globe className='size-3' />
        }
      ],
      image: "",
      video: "/countownband.mp4"
    }
    
  ],
  WP: [
    {
      title: "Akis Room",
      href: "https://akispetretzikis.com/cooking-christmas",
      dates: "2024",
      active: true,
      description: "A dynamic marketing campaign for Akis Petretzikis, featuring a custom WordPress build with interactive JavaScript. Users can zoom into the kitchen table to explore clickable food recipes.",
      technologies: [],
      links: [
        {
          type: "Website",
          href: "https://akispetretzikis.com/cooking-christmas",
          icon: <Icons.globe className='size-3' />
        }
      ],
      image: "",
      video: "/akis-room.mp4"
    },
    {
      title: "Neoklasiko",
      href: "https://neoklasiko.com/",
      dates: "2024",
      active: true,
      description: "A modern property sales platform with advanced features like OpenStreetMap integration via Overpass API for nearby places and seamless Apple Pay payments through Stripe.",
      technologies: [],
      links: [
        {
          type: "Website",
          href: "https://neoklasiko.com/",
          icon: <Icons.globe className='size-3' />
        }
      ],
      image: "",
      video: "/neoklasiko.mp4"
    },
    {
      title: "Kourmouzi.gr",
      href: "https://kourmouzi.gr/",
      dates: "2024",
      active: true,
      description: "A vibrant and user-friendly website for an English language school, designed to attract parents and showcase educational programs for children.",
      technologies: [],
      links: [
        {
          type: "Website",
          href: "https://kourmouzi.gr/",
          icon: <Icons.globe className='size-3' />
        }
      ],
      image: "",
      video: "/kourmouzi.mp4"
    },    
    {
      title: "ComsysCX",
      href: "https://www.comsyscx.com/",
      dates: "2024",
      active: true,
      description: "Comsys CX provides IT and cloud solutions for businesses, optimizing operations through tailored tech services. I developed their WordPress website to improve client interaction and showcase their services effectively.",
      technologies: [
      ],
      links: [
        {
          type: "Website",
          href: "https://www.comsyscx.com/",
          icon: <Icons.globe className='size-3' />
        }
      ],
      image: "",
      video: "/comsys.mp4"
    },
    {
      title: "Symplefsi",
      href: "https://symplefsi.org/",
      dates: "2024",
      active: true,
      description: "Symplefsi is a non-profit dedicated to supporting remote Greek islands with healthcare, education, and sustainability projects. I created their WordPress site to highlight their mission and expand their digital outreach.",
      technologies: [
      ],
      links: [
        {
          type: "Website",
          href: "https://symplefsi.org/",
          icon: <Icons.globe className='size-3' />
        }
      ],
      image: "",
      video: "/symplefsi.mp4"
    },
    {
      title: "Lecadeau.gr",
      href: "https://lecadeau.gr/",
      dates: "2023",
      active: true,
      description: "Lecadeau is a modern eShop specializing in fine jewelry. Its purpose is to showcase their elegant product range and enhance their online presence.",
      technologies: [],
      links: [
        {
          type: "Website",
          href: "https://lecadeau.gr/",
          icon: <Icons.globe className='size-3' />
        }
      ],
      image: "",
      video: "/lecadeau.mp4"
    }    
  ],
} as const;
