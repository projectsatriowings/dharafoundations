export interface RegistrationDocData {
  slug: string;
  title: string;
  shortTitle: string;
  badge: string;
  docUrl: string;
  formType: string;
  regNumber: string;
  regDate: string;
  issuingAuthority: string;
  assessmentYears?: string;
  pan: string;
  description: string;
  benefits: string[];
  keyDetails: { label: string; value: string }[];
}

export const REGISTRATION_DOCS: Record<string, RegistrationDocData> = {
  "12a-registration": {
    slug: "12a-registration",
    title: "Order for 12A Provisional Registration",
    shortTitle: "12A Registration",
    badge: "INCOME TAX EXEMPTION • FORM NO. 10AC",
    docUrl: "/Official Regis/12A.pdf",
    formType: "Form No. 10AC (Rule 17A/11AA)",
    regNumber: "AAETD8857AE20241",
    regDate: "03-12-2024",
    issuingAuthority: "Income Tax Department, Government of India",
    assessmentYears: "AY 2025-26 to AY 2027-28",
    pan: "AAETD8857A",
    description: "Formally registered under Section 12A of the Income Tax Act, 1961 as a recognized charitable institution. This certification exempts the income of Dhara Foundations from income taxation, ensuring that 100% of internal revenues and donations are utilized directly for community welfare, temple renovation, and educational programs.",
    benefits: [
      "Full exemption from Income Tax on surplus revenues directed toward charitable activities.",
      "Establishes institutional credibility and compliance with Government of India financial regulations.",
      "Enables transparent utilization of funds across all seva and heritage preservation initiatives.",
      "Eligibility to apply for government grants and international philanthropic funding."
    ],
    keyDetails: [
      { label: "PAN Number", value: "AAETD8857A" },
      { label: "Unique Registration No.", value: "AAETD8857AE20241" },
      { label: "Date of Approval", value: "03-12-2024" },
      { label: "Valid Assessment Years", value: "AY 2025-26 to AY 2027-28" },
      { label: "Document Code", value: "Form 10AC (Sub-clause VI of Sec 12A(1)(ac))" }
    ]
  },
  "80g-certificate": {
    slug: "80g-certificate",
    title: "Approval U/S 80G(5)(vi) of the Income Tax Act",
    shortTitle: "80G Certificate",
    badge: "50% TAX DEDUCTION FOR DONORS • FORM NO. 10AC",
    docUrl: "/Official Regis/80G.pdf",
    formType: "Form No. 10AC (Approval under Section 80G)",
    regNumber: "AAETD8857AE20241",
    regDate: "11-12-2024",
    issuingAuthority: "Commissioner of Income Tax (Exemptions)",
    assessmentYears: "AY 2025-26 to AY 2027-28",
    pan: "AAETD8857A",
    description: "Granted provisional approval under Section 80G(5)(vi) of the Income Tax Act, 1961. This essential tax certificate provides a direct financial benefit to all our benevolent donors, allowing them to claim a 50% deduction on their taxable income for contributions made to Dhara Foundations.",
    benefits: [
      "Donors are entitled to a 50% tax deduction on all voluntary donations under Section 80G of the IT Act.",
      "Valid for both individual taxpayers and corporate donors filing income tax returns in India.",
      "Automatic generation of Form 10BE tax receipts with unique Transaction IDs for clean filing.",
      "Strengthens donor trust and encourages ongoing support for our sacred and humanitarian projects."
    ],
    keyDetails: [
      { label: "PAN Number", value: "AAETD8857A" },
      { label: "Approval Number", value: "AAETD8857AE20241" },
      { label: "Date of Approval", value: "11-12-2024" },
      { label: "Deduction Eligibility", value: "50% of contribution amount U/S 80G" },
      { label: "Applicable Period", value: "AY 2025-26 to AY 2027-28" }
    ]
  },
  "csr-activities": {
    slug: "csr-activities",
    title: "Registration for Corporate Social Responsibility (CSR)",
    shortTitle: "CSR Activities",
    badge: "MINISTRY OF CORPORATE AFFAIRS • FORM CSR-1",
    docUrl: "/Official Regis/CSR Approval Letter.PDF",
    formType: "Form CSR-1 Registration Approval",
    regNumber: "CSR00086947",
    regDate: "20-02-2025",
    issuingAuthority: "Registrar of Companies, Ministry of Corporate Affairs, Govt of India",
    pan: "AAETD8857A",
    description: "Offically registered with the Ministry of Corporate Affairs (MCA), Government of India, under Form CSR-1. This registration confirms our eligibility to partner with corporations, public sector enterprises, and business conglomerates to execute impactful Corporate Social Responsibility (CSR) initiatives under Section 135 of the Companies Act, 2013.",
    benefits: [
      "Authorized to receive Corporate Social Responsibility (CSR) funds directly from Indian and multinational companies.",
      "All CSR contributions qualify under statutory annual CSR obligations for corporate donors.",
      "Direct alignment with Schedule VII activities: promoting education, rural development, women empowerment, and heritage preservation.",
      "Detailed project tracking, utilization certificates, and impact reports delivered to corporate CSR boards."
    ],
    keyDetails: [
      { label: "Entity PAN", value: "AAETD8857A" },
      { label: "CSR Registration No.", value: "CSR00086947" },
      { label: "Approval Date", value: "20-02-2025" },
      { label: "Issuing Authority", value: "Ministry of Corporate Affairs (Govt of India)" },
      { label: "Statutory Compliance", value: "Section 135 & Rule 4(1) of Companies (CSR Policy) Rules, 2014" }
    ]
  }
};
