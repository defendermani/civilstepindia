export const SUBJECTS = ["Polity", "History", "Geography", "Economy"];

export const SUBJECT_COLORS = {
  Polity: "#8a5a2b",
  History: "#6b4a8a",
  Geography: "#2f6b4f",
  Economy: "#a13f3f",
};

export const QUESTIONS = [
  { id: 1, subject: "Polity", q: "Which Article of the Indian Constitution deals with the Right to Constitutional Remedies?", options: ["Article 19", "Article 21", "Article 32", "Article 44"], correct: 2, note: "Article 32 lets citizens move the Supreme Court directly to enforce fundamental rights; Dr. Ambedkar called it the 'heart and soul' of the Constitution." },
  { id: 2, subject: "Polity", q: "The concept of 'Basic Structure' of the Constitution was propounded in which case?", options: ["Golaknath case", "Kesavananda Bharati case", "Minerva Mills case", "Shankari Prasad case"], correct: 1, note: "The 1973 Kesavananda Bharati judgment held that Parliament cannot amend the Constitution's basic structure." },
  { id: 3, subject: "Polity", q: "Who acts as the ex-officio Chairman of the Rajya Sabha?", options: ["President", "Prime Minister", "Vice President", "Speaker of Lok Sabha"], correct: 2, note: "The Vice President of India chairs the Rajya Sabha under Article 64." },
  { id: 4, subject: "Polity", q: "The 73rd Constitutional Amendment Act relates to:", options: ["Municipalities", "Panchayati Raj", "GST Council", "Anti-defection law"], correct: 1, note: "The 73rd Amendment (1992) gave constitutional status to Panchayati Raj institutions; the 74th did the same for municipalities." },
  { id: 5, subject: "History", q: "The Doctrine of Lapse was introduced by:", options: ["Lord Curzon", "Lord Dalhousie", "Lord Wellesley", "Lord Bentinck"], correct: 1, note: "Lord Dalhousie used the Doctrine of Lapse to annex princely states without a natural heir, fuelling resentment before 1857." },
  { id: 6, subject: "History", q: "The Indian National Congress was founded in the year:", options: ["1857", "1885", "1905", "1920"], correct: 1, note: "The INC was founded in 1885, largely credited to A.O. Hume along with Indian leaders." },
  { id: 7, subject: "History", q: "The Quit India Movement was launched in which year?", options: ["1930", "1935", "1942", "1946"], correct: 2, note: "Launched on 8 August 1942 with Gandhi's 'Do or Die' call at the Bombay session of the AICC." },
  { id: 8, subject: "History", q: "Who was the founder of the Brahmo Samaj?", options: ["Swami Vivekananda", "Raja Ram Mohan Roy", "Dayanand Saraswati", "Ishwar Chandra Vidyasagar"], correct: 1, note: "Raja Ram Mohan Roy founded the Brahmo Samaj in 1828, a key reform movement of the Bengal Renaissance." },
  { id: 9, subject: "Geography", q: "The Tropic of Cancer does NOT pass through which of these Indian states?", options: ["Gujarat", "Madhya Pradesh", "Punjab", "West Bengal"], correct: 2, note: "The Tropic of Cancer passes through 8 states, but not Punjab, which lies further north." },
  { id: 10, subject: "Geography", q: "Which is the longest river entirely within India?", options: ["Ganga", "Godavari", "Yamuna", "Narmada"], correct: 1, note: "The Godavari, called the 'Dakshin Ganga', is the longest river flowing entirely within Indian territory." },
  { id: 11, subject: "Geography", q: "The Western Ghats are also known as:", options: ["Sahyadri", "Nilgiris", "Aravalli", "Vindhya"], correct: 0, note: "The Western Ghats, a UNESCO World Heritage Site, are locally known as the Sahyadri range." },
  { id: 12, subject: "Geography", q: "Which type of soil is best suited for cotton cultivation?", options: ["Alluvial soil", "Red soil", "Black (regur) soil", "Laterite soil"], correct: 2, note: "Black cotton soil (regur), rich in moisture retention, is found across the Deccan trap region." },
  { id: 13, subject: "Economy", q: "The Reserve Bank of India was established in the year:", options: ["1935", "1947", "1949", "1955"], correct: 0, note: "The RBI was established on 1 April 1935 under the RBI Act, 1934, and nationalised in 1949." },
  { id: 14, subject: "Economy", q: "GST in India is a form of:", options: ["Direct tax", "Destination-based indirect tax", "Wealth tax", "Origin-based tax"], correct: 1, note: "GST is a destination-based consumption tax, meaning revenue accrues to the state where goods/services are consumed." },
  { id: 15, subject: "Economy", q: "Which Five-Year Plan is associated with the 'Rolling Plan' concept?", options: ["4th Plan", "5th Plan", "6th Plan (initial)", "8th Plan"], correct: 2, note: "The Janata government introduced a Rolling Plan in 1978 briefly before the 6th Plan was later revised by 1980." },
  { id: 16, subject: "Economy", q: "NITI Aayog replaced which earlier body in 2015?", options: ["Finance Commission", "Planning Commission", "National Development Council", "Economic Advisory Council"], correct: 1, note: "NITI Aayog replaced the Planning Commission in January 2015 as India's premier policy think tank." },
];

export const STUDY_NOTES = {
  Polity: [
    "The Constitution borrows the concept of Fundamental Rights from the US, Directive Principles from Ireland, and the Parliamentary system from the UK.",
    "Fundamental Rights (Part III) are justiciable; Directive Principles (Part IV) are not enforceable in court but are 'fundamental in governance'.",
    "The 42nd Amendment (1976) added the words 'Socialist', 'Secular', and 'Integrity' to the Preamble.",
    "Emergency provisions: National (Art. 352), President's Rule (Art. 356), Financial (Art. 360).",
  ],
  History: [
    "1857 Revolt: began at Meerut, key leaders included Bahadur Shah Zafar, Rani Lakshmibai, Tantia Tope, and Nana Saheb.",
    "Moderates (1885-1905) believed in constitutional methods; Extremists (post-1905) pushed for Swaraj through mass action.",
    "Gandhi's major movements: Non-Cooperation (1920), Civil Disobedience (1930), Quit India (1942).",
    "The Cabinet Mission Plan (1946) proposed a three-tier federal structure before Partition was finalised.",
  ],
  Geography: [
    "India has six major physiographic divisions: Himalayas, Northern Plains, Peninsular Plateau, Coastal Plains, Islands, and the Great Indian Desert.",
    "Monsoons: Southwest monsoon (June-Sept) brings ~75% of India's rainfall; Northeast monsoon affects Tamil Nadu in winter.",
    "Major soil types: Alluvial (river plains), Black/Regur (Deccan), Red (peninsular), Laterite (high rainfall areas).",
    "India's Standard Meridian is 82.5°E, passing through Mirzapur (Uttar Pradesh).",
  ],
  Economy: [
    "India's fiscal year runs April-March; the Union Budget is presented on 1 February each year.",
    "Repo rate is the rate at which RBI lends to commercial banks; it's the primary tool for controlling inflation.",
    "GDP can be measured via three methods: production, income, and expenditure approach.",
    "Disinvestment refers to the government selling its stake in Public Sector Undertakings (PSUs) to raise revenue.",
  ],
};
