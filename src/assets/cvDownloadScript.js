import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {
  capitalizeWords,
  formatDate,
  formatHarvardAuthors,
  getAllAuthorsName,
  getYear,
} from './utilityFunctions';
import { CV_SECTIONS_PDF } from '@/data/data';
import _ from 'lodash';

// Register fonts (if custom fonts are used)
pdfMake.vfs = pdfFonts.pdfMake.vfs;

//array to hold content to be printed. initially empty array
const data = [];

const styles = {
  pageMargins: [60, 40, 60, 40],
  name: {
    bold: true,
    fontSize: 13,
    alignment: 'center',
  },
  tagline: {
    fontSize: 10,
    alignment: 'center',
  },
  address: {
    fontSize: 10,
    alignment: 'center',
  },
  contacts: {
    fontSize: 10,
    alignment: 'center',
  },
  media: {
    fontSize: 10,
    alignment: 'center',
  },
  header: {
    fontSize: 13,
    bold: true,
    margin: [0, 30, 0, 0],
  },
  subHeader: {
    fontSize: 11,
    bold: true,
    margin: [0, 10, 0, 0],
  },
  personal_statement: {
    fontSize: 10,
    alignment: 'justify',
  },
  career_summary: {
    fontSize: 10,
    alignment: 'justify',
  },
  dates: {
    fontSize: 10,
    italics: true,
  },
  entryTitle: {
    fontSize: 10,
    bold: true,
    margin: [0, 20, 0, 0],
  },
  firstEntryTitle: {
    fontSize: 10,
    bold: true,
    margin: [0, 5, 0, 0],
  },
  subTitle: {
    fontSize: 10,
    italics: true,
    margin: [0, 5, 0, 0],
  },
  subTitleBodyText: {
    fontSize: 10,
    alignment: 'justify',
    margin: [5, 5, 0, 0],
  },
  skill: {
    fontSize: 10,
  },
  publication: {
    fontSize: 10,

    margin: [5, 5, 0, 15],
    alignment: 'justify',
  },
  journal: {
    fontSize: 10,

    margin: [5, 5, 0, 15],
    alignment: 'justify',
  },
  conference: {
    fontSize: 10,

    margin: [5, 5, 0, 15],
    alignment: 'justify',
  },
  award: {
    fontSize: 10,

    margin: [5, 5, 0, 15],
    alignment: 'justify',
  },
  membership: {
    fontSize: 10,
    margin: [5, 5, 0, 15],
    alignment: 'justify',
  },
  council: {
    fontSize: 10,
    margin: [5, 5, 0, 15],
    alignment: 'justify',
  },
  committee: {
    fontSize: 10,
    margin: [5, 5, 0, 15],
    alignment: 'justify',
  },
};

export const downloadCV = (cvdata) => {
  //emptying array in between function calls
  data.length = 0;
  console.log(cvdata);

  Object.entries(cvdata).forEach((entry) => {
    switch (entry[0]) {
      case CV_SECTIONS_PDF.accreditations_experience:
        formatAccreditationExperience(entry[0], entry[1]);
        break;
      case CV_SECTIONS_PDF.basic_information:
        formatBasicInformation(entry[1]);
        break;
      case CV_SECTIONS_PDF.personal_statement:
        formatPersonalStatement(entry[0], entry[1]);
        break;
      case CV_SECTIONS_PDF.career_summary:
        formatCareerSummary(entry[0], entry[1]);
        break;
      case CV_SECTIONS_PDF.education_history:
        formatEducationHistory(entry[0], entry[1]);
        break;
      case CV_SECTIONS_PDF.work_history:
        formatExperience(entry[0], entry[1]);
        break;
      case CV_SECTIONS_PDF.projects:
        formatProjects(entry[0], entry[1]);
        break;
      case CV_SECTIONS_PDF.technical_skills:
        formatTechnicalSkills(entry[0], entry[1]);
        break;
      case CV_SECTIONS_PDF.editorial_experience:
        formatEditorialExperience(entry[0], entry[1]);
        break;
      case CV_SECTIONS_PDF.publications:
        formatPublications(entry[0], entry[1]);
        break;
      case CV_SECTIONS_PDF.journals:
        formatJournals(entry[0], entry[1]);
        break;
      case CV_SECTIONS_PDF.conferences:
        formatConferences(entry[0], entry[1]);
        break;
      case CV_SECTIONS_PDF.awards_honors:
        formatAwards(entry[0], entry[1]);
        break;
      case CV_SECTIONS_PDF.memberships:
        formatMemberships(entry[0], entry[1]);
        break;
      case CV_SECTIONS_PDF.councils:
        formatCouncils(entry[0], entry[1]);
        break;
      case CV_SECTIONS_PDF.committees:
        formatCommittees(entry[0], entry[1]);
        break;
      default:
        break;
    }
  });

  const documentDefinition = {
    content: data,
    styles: styles,
  };

  pdfMake
    .createPdf(documentDefinition)
    .download(
      `${
        !_.isEmpty(cvdata.basic_information.first_name)
          ? capitalizeWords(cvdata.basic_information.first_name) + '-CV'
          : 'my-CV'
      }.pdf`
    );
};

//function for formatting committees
function formatCommittees(title, committees) {
  if (!_.isEmpty(committees)) {
    data.push({
      text: capitalizeWords(title.replace(/_/g, ' ')),
      style: 'header',
    });

    committees.forEach((committee) => {
      data.push({
        text: `${committee.start_date ? formatDate(committee.start_date) : ''}${
          committee.isContinue
            ? ' - continue'
            : committee.end_date
            ? ' - ' + formatDate(committee.end_date)
            : ''
        }`,
        style: 'dates',
      });
      data.push({
        style: 'committee',
        text: [
          !_.isEmpty(committee.designation)
            ? capitalizeWords(committee.designation)
            : '',
          ' at ' + capitalizeWords(committee.name),
          !_.isEmpty(committee.city)
            ? ', ' + capitalizeWords(committee.city)
            : '',
          committee.country ? ', ' + committee.country.label : '',
        ],
      });
    });
  }
}

//function for formatting councils
function formatCouncils(title, councils) {
  if (!_.isEmpty(councils)) {
    data.push({
      text: capitalizeWords(title.replace(/_/g, ' ')),
      style: 'header',
    });

    councils.forEach((council) => {
      data.push({
        text: `${council.start_date ? formatDate(council.start_date) : ''}${
          council.isContinue
            ? ' - continue'
            : council.end_date
            ? ' - ' + formatDate(council.end_date)
            : ''
        }`,
        style: 'dates',
      });
      data.push({
        style: 'council',
        text: [
          !_.isEmpty(council.designation)
            ? capitalizeWords(council.designation)
            : '',
          ' at ' + capitalizeWords(council.name),
          !_.isEmpty(council.city) ? ', ' + capitalizeWords(council.city) : '',
          council.country ? ', ' + council.country.label : '',
        ],
      });
    });
  }
}

//function for formatting memberships
function formatMemberships(title, memberships) {
  if (!_.isEmpty(memberships)) {
    data.push({
      text: capitalizeWords(title.replace(/_/g, ' ')),
      style: 'header',
    });

    memberships.forEach((membership) => {
      data.push({
        text: `${
          membership.start_date ? formatDate(membership.start_date) : ''
        }${
          membership.isContinue
            ? ' - continue'
            : membership.end_date
            ? ' - ' + formatDate(membership.end_date)
            : ''
        }`,
        style: 'dates',
      });
      data.push({
        style: 'membership',
        text: [
          !_.isEmpty(membership.membership_type)
            ? capitalizeWords(membership.membership_type)
            : '',
          ' at ' + capitalizeWords(membership.organization),
          !_.isEmpty(membership.city)
            ? ', ' + capitalizeWords(membership.city)
            : '',
          membership.country ? ', ' + membership.country.label : '',
        ],
      });
    });
  }
}

//function for formatting awards and honors
function formatAwards(title, awards_honors) {
  if (!_.isEmpty(awards_honors)) {
    data.push({
      text: capitalizeWords(title.replace(/_/g, ' ')),
      style: 'header',
    });

    awards_honors.forEach((award) => {
      data.push({
        text: `${award.award_date ? formatDate(award.award_date) : ''}`,
        style: 'dates',
      });
      data.push({
        style: 'award',
        text: [
          capitalizeWords(award.name),
          ', ' + capitalizeWords(award.awarding_body),
          !_.isEmpty(award.description)
            ? '\nAward Description\n' + award.description
            : '',
        ],
      });
    });
  }
}

//function for formatting conferences
function formatConferences(title, conferences) {
  if (!_.isEmpty(conferences)) {
    data.push({
      text: capitalizeWords(title.replace(/_/g, ' ')),
      style: 'header',
    });

    conferences.forEach((conference) => {
      data.push({
        style: 'conference',
        text: [
          getAllAuthorsName(conference.authors),
          conference.start_date
            ? ' (' + getYear(conference.start_date) + ') '
            : '',
          conference.title,
          conference.name,
          !_.isEmpty(conference.city) ? ', ' + conference.city : '',
          conference.country ? ', ' + conference.country.label : '',
          !_.isEmpty(conference.page_range)
            ? ', pages ' + conference.page_range
            : '',
          !_.isEmpty(conference.summary)
            ? 'Conference Summary\n' + conference.summary
            : '',
        ],
      });
    });
  }
}

//function for formatting the journals
function formatJournals(title, journals) {
  if (!_.isEmpty(journals)) {
    data.push({
      text: capitalizeWords(title.replace(/_/g, ' ')),
      style: 'header',
    });

    journals.forEach((journal) => {
      data.push({
        style: 'journal',
        text: [
          getAllAuthorsName(journal.authors),
          journal.published_on
            ? ' (' + getYear(journal.published_on) + ') '
            : '',
          journal.title,
          !_.isEmpty(journal.journal) ? ', ' + journal.journal : '',
          !_.isEmpty(journal.vol) ? ', Vol - ' + journal.vol : '',
          !_.isEmpty(journal.issue) ? ', Issue - ' + journal.issue : '',
          !_.isEmpty(journal.page_range) ? ', pages ' + journal.page_range : '',
          !_.isEmpty(journal.summary)
            ? '\nJournal Summary\n' + journal.summary
            : '',
        ],
      });
    });
  }
}

// function for formatting publications
function formatPublications(title, publications) {
  if (!_.isEmpty(publications)) {
    const pubTypesAsObject = _.groupBy(publications, 'type');
    const pubTypesAsArray = Object.getOwnPropertyNames(pubTypesAsObject);

    data.push({
      text: capitalizeWords(title.replace(/_/g, ' ')),
      style: 'header',
    });

    pubTypesAsArray.forEach((type) => {
      data.push({
        text: capitalizeWords(type.replace(/_/g, ' ')),
        style: 'subHeader',
      });

      publications
        .filter((publication) => publication.type == type)
        .forEach((publication) => {
          data.push({
            style: 'publication',
            text: [
              formatHarvardAuthors(publication.authors),
              publication.publication_date
                ? ' (' + publication.publication_date.substring(0, 4) + ') '
                : '',
              publication.title,
              !_.isEmpty(publication.page_range)
                ? ', pages ' + publication.page_range
                : '',
              !_.isEmpty(publication.publication_event)
                ? ', ' + publication.publication_event
                : '',
              !_.isEmpty(publication.publication_venue)
                ? ', ' + publication.publication_venue
                : '',
              !_.isEmpty(publication.edition_volume)
                ? ', Edition - ' + publication.edition_volume
                : '',
              !_.isEmpty(publication.publication_url)
                ? '\nAvailable On - ' + publication.publication_url
                : '',
              !_.isEmpty(publication.abstract)
                ? '\nPublication Abstract\n' + publication.abstract
                : '',
            ],
          });
        });
    });
  }
}

// function for formatting editorial experience
function formatEditorialExperience(title, editorial_experience) {
  if (!_.isEmpty(editorial_experience)) {
    data.push({
      text: capitalizeWords(title.replace(/_/g, ' ')),
      style: 'header',
    });

    editorial_experience.forEach((experience, index) => {
      data.push(
        ...[
          {
            text: `${experience.role} , ${experience.organization} ${
              !_.isEmpty(experience.city) ? ', ' + experience.city : ''
            } ${experience.country ? ', ' + experience.country.label : ''}`,
            style: index == 0 ? 'firstEntryTitle' : 'entryTitle',
          },
          {
            text: `${
              experience.start_date ? formatDate(experience.start_date) : ''
            }${
              experience.isContinue
                ? ' - continue'
                : experience.end_date
                ? ' - ' + formatDate(experience.end_date)
                : ''
            }`,
            style: 'dates',
          },
          !_.isEmpty(experience.description)
            ? { text: 'Summary ', style: 'subTitle' }
            : {},
          !_.isEmpty(experience.description)
            ? { text: experience.description, style: 'subTitleBodyText' }
            : {},
        ]
      );
    });
  }
}

// function for formatting accreditation experience
function formatAccreditationExperience(title, accreditations_experience) {
  if (!_.isEmpty(accreditations_experience)) {
    console.log('non empty');

    data.push({
      text: capitalizeWords(title.replace(/_/g, ' ')),
      style: 'header',
    });

    accreditations_experience.forEach((accreditation, index) => {
      data.push(
        ...[
          {
            text: `${accreditation.role} , ${accreditation.organization} ${
              !_.isEmpty(accreditation.city) ? ', ' + accreditation.city : ''
            } ${
              accreditation.country ? ', ' + accreditation.country.label : ''
            }`,
            style: index == 0 ? 'firstEntryTitle' : 'entryTitle',
          },
          {
            text: `${
              accreditation.start_date
                ? formatDate(accreditation.start_date)
                : ''
            }${
              accreditation.isContinue
                ? ' - continue'
                : accreditation.end_date
                ? ' - ' + formatDate(accreditation.end_date)
                : ''
            }`,
            style: 'dates',
          },
          !_.isEmpty(accreditation.description)
            ? { text: 'Summary ', style: 'subTitle' }
            : {},
          !_.isEmpty(accreditation.description)
            ? { text: accreditation.description, style: 'subTitleBodyText' }
            : {},
        ]
      );
    });
  }
}

// function for formatting technical skills
function formatTechnicalSkills(title, technical_skills) {
  if (!_.isEmpty(technical_skills)) {
    const middleIndex = Math.ceil(technical_skills.length / 2);
    const firstHalf = technical_skills.slice(0, middleIndex);
    const secondHalf = technical_skills.slice(middleIndex);

    data.push({
      text: capitalizeWords(title.replace(/_/g, ' ')),
      style: 'header',
    });

    data.push({
      columns: [
        {
          ul: secondHalf.map((item) => ({ text: item.skill, style: 'skill' })),
        },
        {
          ul: firstHalf.map((item) => ({ text: item.skill, style: 'skill' })),
        },
      ],
    });
  }
}

// function for formatting work experience or simply experiences from work_experiene section
function formatProjects(title, project_history) {
  if (!_.isEmpty(project_history)) {
    data.push({
      text: capitalizeWords(title.replace(/_/g, ' ')),
      style: 'header',
    });
  }

  project_history.forEach((project, index) => {
    data.push(
      ...[
        {
          text: `${project.designation} , ${project.project_title}${
            project.city ? ', ' + project.city : ''
          }${project.country ? ', ' + project.country.label : ''}`,
          style: index == 0 ? 'firstEntryTitle' : 'entryTitle',
        },
        {
          text: `${project.start_date ? formatDate(project.start_date) : ''}${
            project.isContinue
              ? ' - continue'
              : project.end_date
              ? ' - ' + formatDate(project.end_date)
              : ''
          }`,
          style: 'dates',
        },
        !_.isEmpty(project.description)
          ? { text: 'Project Description', style: 'subTitle' }
          : {},
        !_.isEmpty(project.description)
          ? { text: project.description, style: 'subTitleBodyText' }
          : {},
      ]
    );
  });
}

// function for formatting work experience or simply experiences from work_experiene section
function formatExperience(title, work_history) {
  if (!_.isEmpty(work_history)) {
    data.push({
      text: capitalizeWords(title.replace(/_/g, ' ')),
      style: 'header',
    });

    work_history.forEach((experience, index) => {
      data.push(
        ...[
          {
            text: `${experience.position_designation} , ${experience.employer}${
              experience.city ? ', ' + experience.city : ''
            } ${experience.country ? ',' + experience.country.label : ''}`,
            style: index == 0 ? 'firstEntryTitle' : 'entryTitle',
          },
          {
            text: `${
              experience.start_date ? formatDate(experience.start_date) : ''
            }${
              experience.isContinue
                ? ' - continue'
                : experience.end_date
                ? ' - ' + formatDate(experience.end_date)
                : ''
            }`,
            style: 'dates',
          },
          !_.isEmpty(experience.duties_responsibilities)
            ? { text: 'Duties & Responsibilities', style: 'subTitle' }
            : {},
          !_.isEmpty(experience.duties_responsibilities)
            ? {
                text: experience.duties_responsibilities,
                style: 'subTitleBodyText',
              }
            : {},
          !_.isEmpty(experience.achievements)
            ? { text: 'Achievements', style: 'subTitle' }
            : {},
          !_.isEmpty(experience.achievements)
            ? { text: experience.achievements, style: 'subTitleBodyText' }
            : {},
        ]
      );
    });
  }
}

// function for formatting the educatin history from the education history section
function formatEducationHistory(title, education_history) {
  if (!_.isEmpty(education_history)) {
    data.push({
      text: capitalizeWords(title.replace(/_/g, ' ')),
      style: 'header',
    });

    education_history.forEach((degree, index) => {
      data.push(
        ...[
          {
            text: `${degree.degree} , ${degree.institution}${
              degree.city ? ', ' + degree.city : ''
            }${degree.country ? ', ' + degree.country.label : ''}`,
            style: index == 0 ? 'firstEntryTitle' : 'entryTitle',
          },
          {
            text: `${degree.start_date ? formatDate(degree.start_date) : ''}${
              degree.isContinue
                ? ' - continue'
                : degree.end_date
                ? ' - ' + formatDate(degree.end_date)
                : ''
            }`,
            style: 'dates',
          },
          !_.isEmpty(degree.grade)
            ? { text: 'Grade ' + degree.grade, style: 'subTitle' }
            : {},
          !_.isEmpty(degree.course_summary)
            ? { text: 'Course Summary', style: 'subTitle' }
            : {},
          !_.isEmpty(degree.course_summary)
            ? { text: degree.course_summary, style: 'subTitleBodyText' }
            : {},
        ]
      );
    });
  }
}

function formatCareerSummary(title, career_summary) {
  if (!_.isEmpty(career_summary)) {
    const formattedData = [
      {
        text: capitalizeWords(title.replace(/_/g, ' ')),
        style: 'header',
      },
      {
        text: career_summary,
        style: 'career_summary',
      },
    ];
    data.push(...formattedData);
  }
}

function formatPersonalStatement(title, personal_statement) {
  if (!_.isEmpty(personal_statement)) {
    const formattedData = [
      {
        text: capitalizeWords(title.replace(/_/g, ' ')),
        style: 'header',
      },
      {
        text: personal_statement,
        style: 'personal_statement',
      },
    ];

    data.push(...formattedData);
  }
}

function formatBasicInformation(basic_information) {
  const formattedData = [
    {
      text: capitalizeWords(
        `${basic_information.title ? basic_information.title : ''} ${
          basic_information.first_name
        } ${basic_information.last_name}`
      ),
      style: 'name',
    },
    {
      text: !_.isEmpty(basic_information.tagline)
        ? basic_information.tagline
        : '',
      style: 'tagline',
    },
    {
      text: `${
        !_.isEmpty(basic_information.mobile_number)
          ? basic_information.mobile_number
          : ''
      } ${
        !_.isEmpty(basic_information.email)
          ? ' | ' + basic_information.email
          : ''
      }`,
      style: 'contacts',
    },
    {
      text: `${
        !_.isEmpty(basic_information.street) ? basic_information.street : ''
      } ${
        !_.isEmpty(basic_information.city) ? ' | ' + basic_information.city : ''
      } ${
        !_.isEmpty(basic_information.state_province_region)
          ? ' | ' + basic_information.state_province_region
          : ''
      }`,
      style: 'address',
    },
    {
      text: `${
        !_.isEmpty(basic_information.linkedIn)
          ? 'LinkedIn : ' + basic_information.linkedIn + '\n'
          : ''
      } ${
        !_.isEmpty(basic_information.gitHub)
          ? 'GitHub : ' + basic_information.gitHub + '\n'
          : ''
      } ${
        !_.isEmpty(basic_information.bitBucket)
          ? 'BitBucket : ' + basic_information.bitBucket + '\n'
          : ''
      } ${
        !_.isEmpty(basic_information.youTube)
          ? 'YouTube : ' + basic_information.youTube + '\n'
          : ''
      } ${
        !_.isEmpty(basic_information.gitLab)
          ? 'GitLab : ' + basic_information.gitLab + '\n'
          : ''
      }`,
      style: 'media',
    },
  ];
  data.push(...formattedData);
}
