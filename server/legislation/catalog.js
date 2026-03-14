const LEGISLATION_CATALOG = [
  // === FOUNDATIONAL ===
  {
    id: "constitution",
    title: "Australian Constitution",
    jurisdiction: "federal",
    year: 1901,
    category: "Constitutional",
    description: "The founding document of the Commonwealth of Australia, establishing the structure of government, the powers of Parliament, the judiciary, and the rights of States.",
    hasEmbeddedText: true,
    keywords: ["parliament", "senate", "house of representatives", "governor-general", "high court", "states", "territories", "referendum", "federation"]
  },

  // === FEDERAL — DISCRIMINATION & HUMAN RIGHTS ===
  {
    id: "racial-discrimination-act-1975",
    title: "Racial Discrimination Act 1975",
    jurisdiction: "federal",
    year: 1975,
    category: "Discrimination & Human Rights",
    description: "Prohibits discrimination on the basis of race, colour, descent, or national or ethnic origin. Implements the International Convention on the Elimination of All Forms of Racial Discrimination.",
    hasEmbeddedText: false,
    keywords: ["race", "racism", "discrimination", "ethnicity", "vilification", "racial hatred"]
  },
  {
    id: "sex-discrimination-act-1984",
    title: "Sex Discrimination Act 1984",
    jurisdiction: "federal",
    year: 1984,
    category: "Discrimination & Human Rights",
    description: "Prohibits discrimination on the basis of sex, sexual orientation, gender identity, intersex status, marital or relationship status, pregnancy, breastfeeding, and family responsibilities. Also addresses sexual harassment.",
    hasEmbeddedText: false,
    keywords: ["sex", "gender", "sexual harassment", "pregnancy", "discrimination", "sexual orientation", "gender identity"]
  },
  {
    id: "disability-discrimination-act-1992",
    title: "Disability Discrimination Act 1992",
    jurisdiction: "federal",
    year: 1992,
    category: "Discrimination & Human Rights",
    description: "Prohibits discrimination against people with disabilities in employment, education, access to premises, provision of goods and services, accommodation, land, clubs, sport, and administration of Commonwealth laws and programs.",
    hasEmbeddedText: false,
    keywords: ["disability", "discrimination", "access", "reasonable adjustment", "assistance animal"]
  },
  {
    id: "age-discrimination-act-2004",
    title: "Age Discrimination Act 2004",
    jurisdiction: "federal",
    year: 2004,
    category: "Discrimination & Human Rights",
    description: "Prohibits discrimination on the basis of age in employment, education, access to premises, provision of goods and services, accommodation, land, and administration of Commonwealth laws and programs.",
    hasEmbeddedText: false,
    keywords: ["age", "discrimination", "employment", "retirement", "older workers"]
  },
  {
    id: "australian-human-rights-commission-act-1986",
    title: "Australian Human Rights Commission Act 1986",
    jurisdiction: "federal",
    year: 1986,
    category: "Discrimination & Human Rights",
    description: "Establishes the Australian Human Rights Commission and its functions, including investigating complaints of discrimination, promoting human rights, and reporting to Parliament.",
    hasEmbeddedText: false,
    keywords: ["human rights", "commission", "complaints", "discrimination", "inquiry"]
  },

  // === FEDERAL — CRIMINAL LAW ===
  {
    id: "crimes-act-1914",
    title: "Crimes Act 1914",
    jurisdiction: "federal",
    year: 1914,
    category: "Criminal Law",
    description: "The principal federal criminal statute covering offences against the Commonwealth, law enforcement powers, arrest, search warrants, bail, sentencing, and the federal criminal justice system.",
    hasEmbeddedText: false,
    keywords: ["crime", "offence", "arrest", "warrant", "bail", "sentencing", "penalty", "prosecution", "federal police"]
  },
  {
    id: "criminal-code-act-1995",
    title: "Criminal Code Act 1995",
    jurisdiction: "federal",
    year: 1995,
    category: "Criminal Law",
    description: "Contains the Criminal Code as a Schedule, codifying serious federal offences including terrorism, fraud, computer offences, people smuggling, slavery, and general principles of criminal responsibility.",
    hasEmbeddedText: false,
    keywords: ["criminal code", "terrorism", "fraud", "computer crime", "trafficking", "slavery", "criminal responsibility", "intent"]
  },

  // === FEDERAL — EMPLOYMENT & WORKPLACE ===
  {
    id: "fair-work-act-2009",
    title: "Fair Work Act 2009",
    jurisdiction: "federal",
    year: 2009,
    category: "Employment & Workplace",
    description: "The primary federal workplace relations legislation, covering the national employment standards, modern awards, enterprise agreements, unfair dismissal, industrial action, and the Fair Work Commission.",
    hasEmbeddedText: false,
    keywords: ["employment", "workplace", "unfair dismissal", "award", "enterprise agreement", "minimum wage", "leave", "industrial action", "union"]
  },
  {
    id: "work-health-safety-act-2011",
    title: "Work Health and Safety Act 2011",
    jurisdiction: "federal",
    year: 2011,
    category: "Employment & Workplace",
    description: "Establishes duties for persons conducting a business or undertaking to ensure the health and safety of workers and others, and provides for workplace health and safety regulation.",
    hasEmbeddedText: false,
    keywords: ["workplace safety", "health", "duty of care", "hazard", "incident", "workers compensation"]
  },

  // === FEDERAL — FAMILY & SOCIAL ===
  {
    id: "family-law-act-1975",
    title: "Family Law Act 1975",
    jurisdiction: "federal",
    year: 1975,
    category: "Family & Social",
    description: "Governs marriage, divorce, parenting orders, property settlement, spousal maintenance, child support, and family dispute resolution in Australia.",
    hasEmbeddedText: false,
    keywords: ["divorce", "marriage", "custody", "parenting", "child support", "property settlement", "family court", "domestic violence"]
  },
  {
    id: "marriage-act-1961",
    title: "Marriage Act 1961",
    jurisdiction: "federal",
    year: 1961,
    category: "Family & Social",
    description: "Governs who may marry in Australia, the requirements for a valid marriage, marriage celebrants, and the recognition of overseas marriages. Amended in 2017 to allow same-sex marriage.",
    hasEmbeddedText: false,
    keywords: ["marriage", "wedding", "celebrant", "same-sex marriage", "valid marriage", "age of marriage"]
  },
  {
    id: "social-security-act-1991",
    title: "Social Security Act 1991",
    jurisdiction: "federal",
    year: 1991,
    category: "Family & Social",
    description: "Establishes the social security system including Centrelink payments such as JobSeeker, Age Pension, Disability Support Pension, Parenting Payment, and other welfare benefits.",
    hasEmbeddedText: false,
    keywords: ["welfare", "pension", "centrelink", "jobseeker", "disability support", "social security", "benefits"]
  },

  // === FEDERAL — PRIVACY & INFORMATION ===
  {
    id: "privacy-act-1988",
    title: "Privacy Act 1988",
    jurisdiction: "federal",
    year: 1988,
    category: "Privacy & Information",
    description: "Regulates the handling of personal information by Australian Government agencies and private sector organisations, including the Australian Privacy Principles (APPs).",
    hasEmbeddedText: false,
    keywords: ["privacy", "personal information", "data protection", "APP", "data breach", "consent", "surveillance"]
  },
  {
    id: "freedom-of-information-act-1982",
    title: "Freedom of Information Act 1982",
    jurisdiction: "federal",
    year: 1982,
    category: "Privacy & Information",
    description: "Gives the public a right of access to documents held by the Australian Government and its agencies, subject to certain exemptions.",
    hasEmbeddedText: false,
    keywords: ["freedom of information", "FOI", "government documents", "access", "transparency", "exemption"]
  },

  // === FEDERAL — IMMIGRATION ===
  {
    id: "migration-act-1958",
    title: "Migration Act 1958",
    jurisdiction: "federal",
    year: 1958,
    category: "Immigration",
    description: "The principal immigration legislation governing visas, deportation, detention, citizenship pathways, protection visas (refugees), and border control.",
    hasEmbeddedText: false,
    keywords: ["immigration", "visa", "deportation", "detention", "refugee", "asylum", "citizenship", "border"]
  },
  {
    id: "australian-citizenship-act-2007",
    title: "Australian Citizenship Act 2007",
    jurisdiction: "federal",
    year: 2007,
    category: "Immigration",
    description: "Governs how Australian citizenship is acquired (by birth, descent, or grant), the requirements for citizenship, citizenship testing, and loss or renunciation of citizenship.",
    hasEmbeddedText: false,
    keywords: ["citizenship", "naturalisation", "citizenship test", "allegiance", "dual citizenship"]
  },

  // === FEDERAL — CONSUMER & COMPETITION ===
  {
    id: "competition-and-consumer-act-2010",
    title: "Competition and Consumer Act 2010",
    jurisdiction: "federal",
    year: 2010,
    category: "Consumer & Competition",
    description: "Regulates competition, fair trading, and consumer protection. Includes the Australian Consumer Law (Schedule 2) covering consumer guarantees, unfair contract terms, misleading conduct, and product safety.",
    hasEmbeddedText: false,
    keywords: ["consumer", "competition", "ACCC", "misleading conduct", "consumer guarantees", "unfair contract", "product safety", "cartel"]
  },

  // === FEDERAL — INTELLECTUAL PROPERTY ===
  {
    id: "copyright-act-1968",
    title: "Copyright Act 1968",
    jurisdiction: "federal",
    year: 1968,
    category: "Intellectual Property",
    description: "Protects the rights of creators of literary, dramatic, musical, and artistic works, as well as sound recordings, films, broadcasts, and published editions.",
    hasEmbeddedText: false,
    keywords: ["copyright", "intellectual property", "fair dealing", "moral rights", "infringement", "creative commons"]
  },

  // === FEDERAL — ENVIRONMENT ===
  {
    id: "epbc-act-1999",
    title: "Environment Protection and Biodiversity Conservation Act 1999",
    jurisdiction: "federal",
    year: 1999,
    category: "Environment",
    description: "The primary federal environmental legislation providing a framework for protecting matters of national environmental significance, including threatened species, heritage places, and World Heritage areas.",
    hasEmbeddedText: false,
    keywords: ["environment", "biodiversity", "endangered species", "heritage", "conservation", "environmental impact"]
  },

  // === FEDERAL — CORPORATIONS & FINANCE ===
  {
    id: "corporations-act-2001",
    title: "Corporations Act 2001",
    jurisdiction: "federal",
    year: 2001,
    category: "Corporations & Finance",
    description: "The principal legislation regulating companies and financial services in Australia, covering company registration, directors' duties, financial reporting, takeovers, managed investments, and securities.",
    hasEmbeddedText: false,
    keywords: ["company", "corporation", "director", "shareholder", "ASIC", "financial services", "insolvency"]
  },

  // === FEDERAL — NATIVE TITLE ===
  {
    id: "native-title-act-1993",
    title: "Native Title Act 1993",
    jurisdiction: "federal",
    year: 1993,
    category: "Indigenous",
    description: "Recognises and protects native title rights and interests of Aboriginal and Torres Strait Islander peoples, establishes the National Native Title Tribunal, and sets out processes for native title claims.",
    hasEmbeddedText: false,
    keywords: ["native title", "indigenous", "aboriginal", "torres strait islander", "land rights", "Mabo"]
  },

  // === FEDERAL — TAX ===
  {
    id: "income-tax-assessment-act-1997",
    title: "Income Tax Assessment Act 1997",
    jurisdiction: "federal",
    year: 1997,
    category: "Taxation",
    description: "The primary income tax legislation setting out how taxable income is calculated, tax rates, deductions, offsets, capital gains tax, fringe benefits, and other income tax matters.",
    hasEmbeddedText: false,
    keywords: ["income tax", "deductions", "capital gains", "taxable income", "ATO", "tax return"]
  },
  {
    id: "gst-act-1999",
    title: "A New Tax System (Goods and Services Tax) Act 1999",
    jurisdiction: "federal",
    year: 1999,
    category: "Taxation",
    description: "Establishes the goods and services tax (GST) system, including what supplies are taxable, GST-free, or input-taxed, registration requirements, and tax invoices.",
    hasEmbeddedText: false,
    keywords: ["GST", "goods and services tax", "BAS", "tax invoice", "input tax credit"]
  },

  // =====================
  // === NSW LEGISLATION ===
  // =====================

  // === NSW — CRIMINAL LAW ===
  {
    id: "nsw-crimes-act-1900",
    title: "Crimes Act 1900 (NSW)",
    jurisdiction: "nsw",
    year: 1900,
    category: "Criminal Law",
    description: "The principal criminal statute of New South Wales, covering offences against the person (murder, assault, sexual assault), property offences (theft, robbery, fraud), and offences against public order.",
    hasEmbeddedText: false,
    keywords: ["crime", "murder", "assault", "sexual assault", "theft", "robbery", "fraud", "domestic violence"]
  },
  {
    id: "nsw-criminal-procedure-act-1986",
    title: "Criminal Procedure Act 1986 (NSW)",
    jurisdiction: "nsw",
    year: 1986,
    category: "Criminal Law",
    description: "Governs criminal court procedures in NSW, including summary proceedings in the Local Court, committal proceedings, trials on indictment in the District and Supreme Courts, and sentencing procedures.",
    hasEmbeddedText: false,
    keywords: ["criminal procedure", "trial", "indictment", "summary offence", "committal", "jury"]
  },
  {
    id: "nsw-crimes-sentencing-procedure-act-1999",
    title: "Crimes (Sentencing Procedure) Act 1999 (NSW)",
    jurisdiction: "nsw",
    year: 1999,
    category: "Criminal Law",
    description: "Sets out the principles and procedures for sentencing offenders in NSW courts, including types of penalties, aggravating and mitigating factors, and intensive correction orders.",
    hasEmbeddedText: false,
    keywords: ["sentencing", "penalty", "prison", "community service", "parole", "aggravating factors"]
  },

  // === NSW — DISCRIMINATION ===
  {
    id: "nsw-anti-discrimination-act-1977",
    title: "Anti-Discrimination Act 1977 (NSW)",
    jurisdiction: "nsw",
    year: 1977,
    category: "Discrimination & Human Rights",
    description: "Prohibits discrimination on grounds including race, sex, age, disability, homosexuality, marital status, transgender status, and carer's responsibilities in NSW. Establishes the Anti-Discrimination Board.",
    hasEmbeddedText: false,
    keywords: ["discrimination", "race", "sex", "age", "disability", "vilification", "complaint"]
  },

  // === NSW — PROPERTY & PLANNING ===
  {
    id: "nsw-environmental-planning-assessment-act-1979",
    title: "Environmental Planning and Assessment Act 1979 (NSW)",
    jurisdiction: "nsw",
    year: 1979,
    category: "Property & Planning",
    description: "The principal planning legislation in NSW, governing environmental planning instruments (LEPs, SEPPs), development applications, building approvals, and environmental impact assessment.",
    hasEmbeddedText: false,
    keywords: ["planning", "development application", "DA", "zoning", "LEP", "building", "environmental impact"]
  },
  {
    id: "nsw-conveyancing-act-1919",
    title: "Conveyancing Act 1919 (NSW)",
    jurisdiction: "nsw",
    year: 1919,
    category: "Property & Planning",
    description: "Governs the law of real property in NSW including conveyancing of land, easements, covenants, mortgages, leases, and general property transactions.",
    hasEmbeddedText: false,
    keywords: ["property", "conveyancing", "land", "mortgage", "lease", "easement", "covenant"]
  },
  {
    id: "nsw-residential-tenancies-act-2010",
    title: "Residential Tenancies Act 2010 (NSW)",
    jurisdiction: "nsw",
    year: 2010,
    category: "Property & Planning",
    description: "Governs the rights and obligations of landlords and tenants in residential tenancies in NSW, including bonds, rent increases, repairs, termination, and the NSW Civil and Administrative Tribunal's role.",
    hasEmbeddedText: false,
    keywords: ["tenant", "landlord", "rental", "lease", "bond", "eviction", "rent increase", "NCAT"]
  },

  // === NSW — EMPLOYMENT ===
  {
    id: "nsw-workers-compensation-act-1987",
    title: "Workers Compensation Act 1987 (NSW)",
    jurisdiction: "nsw",
    year: 1987,
    category: "Employment & Workplace",
    description: "Establishes the workers compensation scheme in NSW, covering compensation for workplace injuries, weekly payments, medical expenses, lump sum compensation, and employer obligations.",
    hasEmbeddedText: false,
    keywords: ["workers compensation", "workplace injury", "insurance", "lump sum", "medical expenses"]
  },

  // === NSW — EVIDENCE & PROCEDURE ===
  {
    id: "nsw-evidence-act-1995",
    title: "Evidence Act 1995 (NSW)",
    jurisdiction: "nsw",
    year: 1995,
    category: "Courts & Evidence",
    description: "Governs the law of evidence in NSW courts, including admissibility, hearsay, opinion evidence, tendency and coincidence evidence, credibility, privileges, and warnings to juries.",
    hasEmbeddedText: false,
    keywords: ["evidence", "admissibility", "hearsay", "privilege", "witness", "testimony", "court"]
  },

  // === NSW — CIVIL ===
  {
    id: "nsw-civil-liability-act-2002",
    title: "Civil Liability Act 2002 (NSW)",
    jurisdiction: "nsw",
    year: 2002,
    category: "Civil Law",
    description: "Reforms the law of negligence and personal injury in NSW, covering duty of care, causation, damages, contributory negligence, and limitations on liability.",
    hasEmbeddedText: false,
    keywords: ["negligence", "personal injury", "duty of care", "damages", "liability", "compensation"]
  },

  // === NSW — CHILDREN & FAMILY ===
  {
    id: "nsw-children-young-persons-act-1998",
    title: "Children and Young Persons (Care and Protection) Act 1998 (NSW)",
    jurisdiction: "nsw",
    year: 1998,
    category: "Family & Social",
    description: "Provides for the care and protection of children and young persons in NSW, including mandatory reporting of children at risk, care orders, out-of-home care, and parental responsibility.",
    hasEmbeddedText: false,
    keywords: ["child protection", "mandatory reporting", "care order", "foster care", "parental responsibility"]
  },

  // === NSW — MOTOR VEHICLES & ROADS ===
  {
    id: "nsw-road-transport-act-2013",
    title: "Road Transport Act 2013 (NSW)",
    jurisdiction: "nsw",
    year: 2013,
    category: "Transport & Roads",
    description: "Governs driver licensing, vehicle registration, traffic offences, drink driving, speeding, demerit points, and road safety in New South Wales.",
    hasEmbeddedText: false,
    keywords: ["driving", "licence", "traffic", "speeding", "drink driving", "demerit points", "registration"]
  }
];

const JURISDICTIONS = [
  { id: "federal", label: "Federal (Commonwealth)" },
  { id: "nsw", label: "New South Wales" }
];

const CATEGORIES = [...new Set(LEGISLATION_CATALOG.map(l => l.category))].sort();

module.exports = { LEGISLATION_CATALOG, JURISDICTIONS, CATEGORIES };
