export type Person = {
  id: string;
  name: string;
  department?: string;
  linkedin?: string;
  src?: string;
  tags?: string[];
};

// Supervisor
import ProfMohamedImg from "$lib/assets/Team/Supervisor/Prof-Mohamed-Abo-Al-Azm.jpg";
// Mentors
import MohamedRagabImg from "$lib/assets/Team/Mentors/Mohammed-Ragab.jpg";
import OmarAmanImg from "$lib/assets/Team/Mentors/Omar-Aman.jpg";
import YoussefMehannaImg from "$lib/assets/Team/Mentors/Youssef-Mehana.jpg";
import AhmedMohImg from "$lib/assets/Team/Mentors/Ahmed-El-Sayed.jpg";
import AyaRagabImg from "$lib/assets/Team/Mentors/Aya-Ragab.jpg";
import OsamaHeshamImg from "$lib/assets/Team/Mentors/Osama-Hesham.jpg";
import BelalAboImg from "$lib/assets/Team/Mentors/Belal-Abo-El-Khier.jpg";

// Board
import MoustafaAdlyImg from "$lib/assets/Team/Heads/Moustafa-Adly.jpg";
import FaresFathyImg from "$lib/assets/Team/Heads/Fares-Fathy.jpg";
import OmarOsamaImg from "$lib/assets/Team/Heads/Omar-Osama.jpg";
import AbdelrahmanHikalImg from "$lib/assets/Team/Heads/Abdelrahman-Hikal.png";
import HabibaAmrImg from "$lib/assets/Team/Heads/Habiba-Amr.png";
import MayaHossamImg from "$lib/assets/Team/Heads/Maya-Hossam.jpg";

//Members
import YehiaSharawyImg from "$lib/assets/Team/Members/Yehia-Sharawy.jpeg";
import YehiaAlaaImg from "$lib/assets/Team/Members/Yehia-Alaa.jpeg";

export const members: Person[] = [
  {
    id: "prof-mohamed-abo-el-azm",
    name: "Prof. Mohamed Abo El-Azm",
    department: "Mechanical Engineering",
    src: ProfMohamedImg,
    tags: ["Dean of Student Affairs"],
  },
  {
    id: "mohamed-ragab",
    name: "Mohamed Ragab",
    department: "Communications Engineering",
    src: MohamedRagabImg,
  },
  {
    id: "omar-aman",
    name: "Omar Aman",
    department: "Mechatronics Engineering",
    src: OmarAmanImg,
  },
  {
    id: "youssef-mehanna",
    name: "Youssef Mehanna",
    department: "Computer Science",
    src: YoussefMehannaImg,
  },
  {
    id: "ahmed-mohamed",
    name: "Ahmed Mohamed",
    department: "Communications Engineering",
    src: AhmedMohImg,
  },
  {
    id: "aya-ashraf",
    name: "Aya Ashraf",
    department: "Communications Engineering",
    src: AyaRagabImg,
  },
  {
    id: "osama-hesham",
    name: "Osama Hesham",
    department: "Computer Engineering",
    src: OsamaHeshamImg,
  },
  {
    id: "belal-abo-elkheir",
    name: "Belal Abo Elkheir",
    department: "Computer Science",
    src: BelalAboImg,
  },
  {
    id: "moustafa-adly",
    name: "Moustafa Adly",
    department: "Mechanical Engineering",
    src: MoustafaAdlyImg,
  },
  {
    id: "omar-ossama",
    name: "Omar Ossama",
    department: "Electrical Engineering",
    src: OmarOsamaImg,
  },
  {
    id: "fares-fathy",
    name: "Fares Fathy",
    department: "Artificial Intelligence",
    src: FaresFathyImg,
  },
  {
    id: "abdelrahman-hikal",
    name: "Abdelrahman Hikal",
    department: "Mechanical Engineering",
    src: AbdelrahmanHikalImg,
  },
  {
    id: "mohamed-nabil",
    name: "Mohamed Nabil",
    department: "Computer Engineering",
  },
  {
    id: "habiba-amr",
    name: "Habiba Amr",
    department: "Computer Engineering",
    src: HabibaAmrImg,
  },
  {
    id: "maya-hossam",
    name: "Maya Hossam",
    department: "Computer Engineering",
    src: MayaHossamImg,
  },
  {
    id: "nour-allam",
    name: "Nour Allam",
    department: "Mechanical Engineering",
  },
  {
    id: "yasmin-ahmed",
    name: "Yasmin Ahmed",
    department: "Computer Engineering",
  },
  {
    id: "yehia-sharawy",
    name: "Yehia Sharawy",
    department: "Computer Engineering",
    src: YehiaSharawyImg,
  },
  {
    id: "yehia-alaa",
    name: "Yehia Alaa",
    department: "Mechanical Engineering",
    src: YehiaAlaaImg,
  },
];

export const memberById = Object.fromEntries(members.map((m) => [m.id, m]));
