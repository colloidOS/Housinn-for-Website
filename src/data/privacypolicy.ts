type ContentType = {
  subtitle: string | string[]; // Can be either a single string or an array of strings
  items?: string[]; // Optional array of items
};

type SectionType = {
  title: string;
  content: ContentType[];
};
export const policySections: SectionType[] = [
  {
    title: "General Provisions of the Policy",
    content: [
      {
        subtitle: [
          `This Policy applies to all information that the Company and/or its affiliates, including all persons within the same group as the Company, may obtain about the User while they use any of the websites, mobile applications, services, programs, and products of the Company (hereinafter referred to as the "Services"), as well as during the execution of any agreements and contracts with the User in connection with the use of the Services. The Users consent to provide personal data, given to one of the entities within the Company's group, applies to all entities within this group.`,
          "The Company is an Operator for the processing of personal data.",
          "When registering on the Company's websites and/or mobile applications (including www.housinn.ng) and/or filling out forms requiring the input of personal data, the User voluntarily and in their interest gives written consent to the following methods of processing their personal data by the conditions defined in this document: collection, recording, systematization, accumulation, storage, clarification (updating, change), extraction, use, transfer (distribution, provision, access), depersonalization, blocking, deletion, destruction of personal data.",
          "Hereinafter, the terms and definitions used in the Policy are interpreted in accordance with business practices or academic doctrine.",
          `"User" for the purposes of this Policy means any natural person visiting the Company's websites and/or mobile applications, providing personal data using information and telecommunication networks.`,
          "This Policy applies to all Company websites and mobile applications where its text is posted.",
          "Using the Services implies the User's unconditional consent to this Policy and the conditions of processing their personal information specified herein, namely, to perform any actions (operations) or a set of actions (operations) performed with or without the use of automation tools with personal data, including collection, recording, systematization, accumulation, storage, clarification (updating, modification), extraction, use, transfer (distribution, provision, access), depersonalization, blocking, deletion, destruction of personal data both with and without the use of automation tools, and confirms that by giving such consent, they act freely, by their own will, and in their interest. If the User disagrees with these conditions, they should refrain from using the Services.",
        ],
      },
    ],
  },
  {
    title: "Personal Information",
    content: [
      {
        subtitle:
          " Personal data that users provide to the Company when filling out information fields on websites and in mobile applications, including when filling out contact forms subscribing to newsletters:",

        items: [
          "Surname, first name, patronymic",
          "Email address",
          "Telephone numbers",
          "Data about the legal entity of the applicant",
          "Other information is possible if it is set by the information fields of the website or mobile application.",
        ],
      },
      {
        subtitle: `In addition to personal information, the Company collects technical data, namely – Technical data automatically transmitted by the device by which Users access the websites and mobile applications, including technical characteristics of the device, IP address, information stored in "cookies" files that were sent to the User's device, browser information, date and time of access to the site, mobile application, requested page addresses, and other similar information.`,
      },
    ],
  },

  {
    title: "Purposes and Methods of Data Processing",
    content: [
      {
        subtitle:
          "The Company processes the personal data of Users exclusively for the purposes for which they were provided, including",
        items: [
          "Registering Users to provide access to certain sections of the site or mobile application",
          "Providing Users with information about the Company, services, and events",
          "Improving the quality of Services, ease of their use, development of new Services and products",
          "Communication with the User upon contact",
          "Organizing participation of Users in events and surveys conducted",
          "Sending news materials about the Company and its products, affiliates, or subsidiaries to Users",
          "Targeting advertising materials based on contextual data analysis",
          "Conducting statistical and other research based on depersonalized data",
          "Fulfilling the powers and duties imposed on the Company by legislation",
          "For other purposes with the consent of the User.",
        ],
      },
      {
        subtitle: " The Company processes technical data to:",
        items: [
          "Ensure the functioning and security of websites and mobile applications",
          "Improve the quality of websites and mobile applications.",
        ],
        // extra:
        //   "The Company does not place Users' personal data in publicly accessible sources. The Company does not make decisions that have legal consequences for Users or otherwise affect their rights and lawful interests based solely on the automated processing of personal data.",
      },
      {
        subtitle:
          "Storing personal data in a form that allows identifying the subject of personal data is carried out no longer than required by the purposes of their processing unless the storage period of personal data is established by applicable law. Personal data is subject to destruction or depersonalization upon achieving the purposes of processing or if there is no longer a need to achieve these purposes, unless otherwise provided by applicable law.",
      },
      {
        subtitle:
          "For the purpose of communication with the User regarding the use of services and products, the Company may use communication through messenger applications and social networks on the Internet, provided that the User has provided identifying information.",
      },
    ],
  },
  {
    title: "Users' Rights",
    content: [
      {
        subtitle:
          "Ensuring the protection of the rights of personal data subjects is a fundamental principle of the Company's work on this issue.",
      },
      {
        subtitle:
          "To ensure the protection of the rights and freedoms of Users, the Company may, at the User's request:",
        items: [
          "Confirm the processing of personal data of the given User and provide an opportunity to familiarize themselves with it within 30 days from the date of the request",
          "Inform about the source of obtaining and the composition of the User's personal data that the Company processes",
          "Inform about the legal bases, purposes, terms, and methods of processing the User's personal data",
          "Make necessary changes to personal data if the User confirms that they are incomplete, inaccurate, or irrelevant within 7 working days from the date of receiving confirmation, and notify the User of the changes made",
          "Provide the name or surname, first name, patronymic, and address of persons to whom the processing of personal data may be entrusted with the User's consent",
          "Exclude the User from mailing lists of news informational materials",
          "Stop processing the User's personal data within 30 days from the date of receiving the withdrawal of consent if there are no other legal bases for processing personal data provided by the legislation",
          "Stop processing the User's personal data if it is confirmed that the processing is carried out unlawfully, and notify the User of the measures taken",
          "Destroy the User's personal data if it is confirmed that they were unlawfully obtained or do not correspond to the declared purposes of processing, within 7 working days from the date of receiving the corresponding confirmation, and notify the User of the measures taken",
          "Answer the User's questions concerning their personal data processed by the Company.",
        ],
      },
    ],
  },
  {
    title: "Ways to Contact the Company",
    content: [
      {
        subtitle: `The User can contact the Company with a request regarding the processing of personal data by sending a letter with the subject "Request about Personal Data" (or "Withdrawal of Consent to Process Personal Data" in case of withdrawing consent to process personal data) to the email address: housinnafrica@gmail.com`,
      },
    ],
  },
  {
    title: "Security of Personal Data",
    content: [
      {
        subtitle: [
          "To ensure the security of Users' personal data during their processing, the Company undertakes to take necessary and sufficient legal, organizational, and technical measures to protect personal data from unlawful or accidental access, their destruction, alteration, blocking, copying, provision, distribution, and other unlawful actions in relation to personal data.",
          " To ensure adequate protection of personal data, the Company conducts an assessment of the harm that could be caused in the event of a security breach of personal data, and also defines the current threats to the security of personal data during their processing in information systems.",
          "Company employees who have access to personal data are acquainted with this Policy and local Acts on issues of personal data security.",
        ],
      },
    ],
  },
  {
    title: "Cross-Border Transfer of Personal Data",
    content: [
      {
        subtitle:
          "If this is due to the need for the Company to provide any of its Services, or a technical or other feature of the Service, then the Company consequently has the right to transfer Users' personal data to the territory of foreign states. The Company takes all necessary measures to ensure the confidentiality and security of personal data.",
      },
    ],
  },
  {
    title: "Termination of Personal Data Processing",
    content: [
      {
        subtitle:
          "The Company terminates the processing of the User's personal data:",
        items: [
          "Upon the occurrence of conditions for terminating the processing of personal data or at the end of the established terms",
          "Upon achieving the purposes of their processing or if there is no longer a need to achieve these purposes",
          "At the request of the User if the processed personal data are unlawfully obtained or are not necessary for the declared purpose of processing",
          "In case of detection of unlawful processing of personal data, if it is impossible to ensure the legality of processing",
          "Upon expiration of the User's consent to the processing of personal data or in case of withdrawal of such consent, if there are no other legal bases for the processing of personal data provided by the legislation",
          "In case of liquidation or winding up of the Company.",
        ],
      },
    ],
  },
  {
    title: "Links to Third-Party Websites",
    content: [
      {
        subtitle:
          " Company websites and mobile applications may contain links to third-party websites and services, which it does not control. The Company is not responsible for the security or confidentiality of any information collected by third-party websites or services.",
      },
    ],
  },
  {
    title: "Changes to the Policy",
    content: [
      {
        subtitle: [
          "The Company may update the Policy as necessary. The Company recommends Users periodically check the relevance of this Policy. Continuing to use the site or mobile application after changes to the Policy, the User confirms consent to the changes made.",
          "Any changes to the personal data processing policy by the Company will be reflected in this document. The Policy is effective indefinitely until it is replaced by a new version.",
          "The current version of the Policy is freely available on the Internet at www.housinn.ng/privacypolicy",
        ],
      },
    ],
  },
];
