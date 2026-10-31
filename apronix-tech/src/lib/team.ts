export type TeamMember = {
  name: string;
  role: string;
  expertise: string;
  image: string;
  position: string;
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Rohit Gurjar',
    role: 'Founder & Digital Growth Strategist',
    expertise: 'Strategy & growth',
    image: '/team/rohit-gurjar.png',
    position: 'center 18%',
  },
  {
    name: 'Aparna Nama',
    role: 'Co-Founder & Shopify / WordPress Expert',
    expertise: 'Web development',
    image: '/team/aparna-nama.png',
    position: 'center 16%',
  },
  {
    name: 'Abhishek',
    role: 'Video Editor & Visual Content Creator',
    expertise: 'Video & content',
    image: '/team/abhishek.png',
    position: 'center 15%',
  },
  {
    name: 'Rohan',
    role: 'Graphic Designer',
    expertise: 'Brand & design',
    image: '/team/rohan.png',
    position: 'center 17%',
  },
  {
    name: 'Tejasvi',
    role: 'Human Resources',
    expertise: 'People & culture',
    image: '/team/tejasvi.png',
    position: 'center 15%',
  },
  {
    name: 'Om Prakash',
    role: 'Operations Manager',
    expertise: 'Operations',
    image: '/team/om-prakash.png',
    position: 'center 16%',
  },
  {
    name: 'Sahil',
    role: 'AI Video Production Specialist',
    expertise: 'AI production',
    image: '/team/sahil.png',
    position: 'center 15%',
  },
];
