export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  date: string;
  img: string;
  excerpt: string;
  body_content: string;
  read_time_minutes: number;
  isDoc?: boolean;
  is_external?: boolean;
  external_url?: string;
  category?: string;
}

export const SIX_MODERN_CARDS: NewsArticle[] = [
  {
    id: "dhara-gifts-children-cuddalore",
    slug: "dhara-gifts-children-cuddalore",
    title: "Dhara Foundation Distributes Gifts to Children at Welfare Home",
    date: "15 Sep, 2025",
    img: "/images/news/dhara-gifts-children.jpg",
    category: "Community Welfare",
    excerpt: "On Tamil New Year and Ambedkar Jayanti, Dhara Foundation distributed birthday gifts and shoes to school children at Annai Sathya Children Welfare Home in Cuddalore.",
    body_content: `<p>On September 15, commemorating both Tamil New Year and the birth anniversary of Dr. B.R. Ambedkar, Dhara Foundation organized a heartfelt gift distribution drive at the Annai Sathya Kuzhanthai Nala Pengal Kaapagatham (Children & Women's Welfare Home) in Cuddalore.</p>
<p>Under the leadership of Vinodhra Raghavendra, State Secretary of the BJP Aanmeegam and Aalaya Membership Division, birthday gifts and brand-new shoes were distributed to all the school children residing at the welfare home. The event was organized in partnership with the Dhara Pavundation (Foundation) team from Cuddalore.</p>
<p>The ceremony was attended by Annai Sathya Kuzhanthai Nala Kaapagam Chairperson P.A.J., Maaanagar Thunaithalaiver Ezhumalai, Former General Secretary Baakar, Dr. Karunaagaran, Advocate Chandrasekar, Muthu Kumarasaamy, Vaithiyanathan, Murugan, and several other dignitaries and well-wishers. The event was widely covered by local Tamil press.</p>`,
    read_time_minutes: 3,
  },
  {
    id: "dhara-diwali-clothes-distribution",
    slug: "dhara-diwali-clothes-distribution",
    title: "Dhara Foundations Distributes New Clothes to Children Ahead of Diwali",
    date: "18 Oct, 2025",
    img: "/images/news/dhara-diwali-clothes.jpg",
    category: "Community Welfare",
    excerpt: "Ahead of Diwali, Dhara Foundations distributed new clothes (Puthadai) to school children at Annai Sathya Sevai Illam in Cuddalore.",
    body_content: `<p>Ahead of the Diwali festival, Dhara Foundations organized a special new clothes (Puthadai) distribution drive for the underprivileged school children residing at the Annai Sathya Sevai Illam (Service Home) in Cuddalore.</p>
<p>Advocate Shankar, representing Dhara Foundations, led the distribution ceremony and personally handed over the new clothes to the children, extending warm Diwali wishes and blessings. The children at the Annai Sathya Sevai Illam were overjoyed to receive their brand-new festival attire.</p>
<p>The event was graced by Vijayakumar, Dr. Karunaagaran, Semmandalam Ezhumalai, and many other community leaders and supporters. This initiative is part of Dhara Foundations' continuing commitment to uplifting underprivileged children through acts of compassion and celebration during festive occasions.</p>`,
    read_time_minutes: 3,
  },
  {
    id: "sendoff-ceremony",
    slug: "sendoff-ceremony",
    title: "Send-Off Ceremony in Honour of His Excellency, Hon. Governor",
    date: "30 May, 2026",
    img: "/images/news/card-3.jpg",
    category: "State Dignitaries",
    excerpt: "A grand farewell and send-off ceremony organized in honour of His Excellency, the Hon'ble Governor.",
    body_content: `<p>Dhara Foundation participated in and co-organized a dignified send-off ceremony celebrating the illustrious tenure and monumental social contributions of His Excellency, the Honourable Governor. The formal event brought together prominent civic leaders, philanthropists, social reformers, and representatives from diverse cultural institutions to pay tribute to his unwavering patronage of grassroots development and tribal welfare.</p>
<p>During the ceremony, Dhara Foundation's leadership presented a traditional handcrafted memento and a ceremonial shawl as a token of deep gratitude. In his address, His Excellency specifically acknowledged Dhara Foundation's exemplary grassroots work in rural empowerment, women's self-help groups, and the rehabilitation of traditional folk artists who had been marginalized over decades.</p>
<p>The event concluded with a renewed pledge between participating institutions and state dignitaries to continue fostering collaborative frameworks for heritage conservation, youth skill development, and holistic social welfare across rural and semi-urban districts.</p>`,
    read_time_minutes: 3,
  },
  {
    id: "dhara-divine-awards",
    slug: "dhara-divine-awards",
    title: "DHARA Divine Awards",
    date: "24 Jan, 2026",
    img: "/images/news/card-6.jpg",
    category: "Flagship Ceremony",
    excerpt: "Annual flagship ceremony felicitating unsung heroes, traditional artisans, and grassroots changemakers.",
    body_content: `<p>The Dhara Divine Awards stands as our annual national flagship ceremony dedicated to identifying, honoring, and financially empowering unsung heroes across India. Unlike conventional award ceremonies that focus on celebrity culture, the Dhara Divine Awards shines the national spotlight on traditional sports coaches, spiritual masters, temple architects, puppeteers, and folk musicians who have dedicated decades to preserving ancient Indian knowledge systems.</p>
<p>The 2026 edition witnessed the felicitation of 25 extraordinary awardees selected by a distinguished jury comprising former High Court judges, cultural scholars, and senior social workers. Each awardee was presented with a citation of honor, a traditional bronze trophy, and a substantial financial grant to support their continued work and mentorship of younger generations.</p>
<p>Through the Dhara Divine Awards, we aim to build a permanent national archive and ecosystem of cultural preservers. By connecting these traditional masters with modern institutional patronage, we ensure that ancient wisdom, indigenous athletic disciplines, and sacred art forms continue to thrive in the modern era.</p>`,
    read_time_minutes: 4,
  },
  {
    id: "gov-maharashtra",
    slug: "gov-maharashtra",
    title: "Governor of Maharashtra Appreciates DHARA Divine Awards",
    date: "31 Aug, 2025",
    img: "/images/news/card-2.png",
    isDoc: true,
    category: "Official Commendation",
    excerpt: "Honourable Governor of Maharashtra extends formal appreciation and commendation for the Dhara Divine Awards.",
    body_content: `<p>In a prestigious recognition of cultural and social service, the Honourable Governor of Maharashtra extended formal written appreciation and commendation to Dhara Foundation for organizing the national-level Dhara Divine Awards. The commendation lauded the foundation's tireless initiatives in identifying, supporting, and celebrating grassroots artisans, traditional sports coaches, and spiritual custodians who form the cultural backbone of our nation.</p>
<p>During the formal correspondence and presentation, the Governor highlighted the critical importance of preserving indigenous folk arts, traditional Vedic scholarship, and ancient Indian athletic disciplines such as Silambam, Mallakhamb, and Kalaripayattu. The appreciation letter commended Dhara Foundation's leadership for creating an inclusive platform where unsung rural heroes are accorded national dignity and financial grants.</p>
<p>This gubernatorial recognition serves as a powerful testament to the authenticity and nationwide impact of Dhara Foundation's mission. It further strengthens our resolve to expand our footprint across multiple states, ensuring that heritage preservers receive the patronage and institutional backing they rightfully deserve.</p>`,
    read_time_minutes: 4,
  },
  {
    id: "reg-cert",
    slug: "reg-cert",
    title: "Dhara Foundation – Registrations & Certifications",
    date: "20 Feb, 2025",
    img: "/images/news/card-1.jpg",
    isDoc: true,
    category: "Official Compliance",
    excerpt: "Official documentation, NGO registrations, 80G/12A compliance, and recognition certificates.",
    body_content: `<p>Dhara Foundation is officially registered under the Indian Trusts Act and holds valid 80G and 12A tax exemption certifications from the Income Tax Department, Government of India. This compliance guarantees that all monetary contributions and philanthropic donations made to the foundation are eligible for statutory tax deductions under Section 80G of the Income Tax Act.</p>
<p>Our commitment to institutional transparency and financial accountability is paramount. Every year, our books of accounts undergo rigorous independent auditing by certified chartered accountants, and annual compliance reports are submitted to statutory authorities. Furthermore, our registration under NITI Aayog's NGO Darpan portal reaffirms our standing as a verified partner for government-sponsored welfare schemes and Corporate Social Responsibility (CSR) collaborations.</p>
<p>Through stringent governance policies, zero-tolerance anti-corruption frameworks, and real-time project tracking, we ensure that every rupee contributed by our donors directly empowers tribal communities, traditional sports coaches, folk artisans, and underprivileged children across rural India.</p>`,
    read_time_minutes: 3,
  },
  {
    id: "ambedkar-award",
    slug: "ambedkar-award",
    title: "Dr. Ambedkar Seva Rathna Award",
    date: "25 Oct, 2024",
    img: "/images/news/card-5.jpg",
    category: "National Award",
    excerpt: "Dhara Foundation honored with the prestigious Dr. Ambedkar Seva Rathna Award for exemplary social service.",
    body_content: `<p>In recognition of our relentless and transformative work in tribal welfare, women empowerment, and child education across remote rural districts, Dhara Foundation was conferred the prestigious Dr. Ambedkar Seva Rathna Award. The award ceremony, attended by eminent legal luminaries, social activists, and policymakers, celebrated organizations that uphold the constitutional ideals of social justice and equality.</p>
<p>The award citation specifically highlighted Dhara Foundation's sustained initiatives in providing free after-school tuition centers for children in Dalit and tribal hamlets, organizing legal awareness camps for women, and establishing clean drinking water facilities in underserved villages. Our founder received the honor on behalf of the thousands of volunteers and grassroots workers who dedicate their lives to uplifting the marginalized.</p>
<p>Receiving the Dr. Ambedkar Seva Rathna Award is both an honor and a profound responsibility. It reminds us that our mission is far from complete, motivating our team to redouble our efforts in breaking societal barriers and ensuring equal opportunities for every child and artisan across India.</p>`,
    read_time_minutes: 3,
  },
  {
    id: "mupperum-vizha",
    slug: "mupperum-vizha",
    title: "Mupperum Vizha",
    date: "28 Jan, 2024",
    img: "/images/news/card-4.jpg",
    category: "Cultural Festival",
    excerpt: "Celebrating a historic threefold cultural and community welfare festival with thousands of beneficiaries.",
    body_content: `<p>The Mupperum Vizha ("Threefold Grand Festival") was celebrated with immense fervor and historic participation, bringing together over 5,000 community leaders, social workers, folk artists, and rural beneficiaries. Designed as a holistic convergence of culture, spirituality, and social welfare, the festival served as a vibrant showcase of Tamil Nadu's rich heritage alongside massive humanitarian outreach.</p>
<p>As part of the welfare distribution drive during the Vizha, Dhara Foundation disbursed educational scholarships to over 500 deserving students from economically weaker sections, distributed sewing machines to women entrepreneurs, and provided medical aid kits to elderly citizens. Traditional folk troupes performed ancient art forms including Thappattam, Karagattam, and Oyilattam, captivating the audience and reviving public interest in indigenous performing arts.</p>
<p>The grand success of Mupperum Vizha reinforced Dhara Foundation's core philosophy: true societal progress is achieved when cultural pride and economic empowerment walk hand-in-hand. The event was widely covered by regional and national media as a benchmark for community-driven cultural festivals.</p>`,
    read_time_minutes: 5,
  },
];
