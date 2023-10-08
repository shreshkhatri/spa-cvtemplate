// types for publication
export const PUBLICATION_TYPES =[
    'RESEARCHES',
    'THESES',
    'PATENTS',
    'BOOKS',
    'CHAPTERS'
];


// string IDs for Droppables 
export const DROPPABLE_TYPE_IDS = {
    mainContainer : 'main container',
    educationTimeline:'education timeline',
    experienceTimeline : 'work / experience timeline',
    projectTimeline : 'projects timeline',
    editorialExperienceTimeline : 'editorial experience timeline',
    committeeTimeline : 'committee timeline',
    counciltimeline: 'council timeline',
    membershipsTimeline :'memberships timeline',
    awawardTimeline : 'award timeline',
    conferenceTimeline : 'conference timeline',
    journamTimeline : 'journal timeline'
}

//string as Types for items droppable items
export const DROPPABLE_TYPES ={
    Main:'main',
    Education:'education',
    Experience :'experience',
    Project:'project',
    EditorialExperience:'editorial experience',
    Committee : 'committee',
    Council:'council',
    Membership :'membership',
    Award:'award',
    Conference : 'conference',
    Journal :'journal'
}

//this array is used for rendering the buttons
export const CV_SECTIONS=[
    'personal_statement',
    'career_summary',
    'education_history',
    'work_history',
    'projects',
    'publications',
    'technical_skills',
    'editorial_experience',
    'committees',
    'councils',
    'memberships',
    'awards_honors',
    'conferences',
    'journals',
    'basic_information'
]

//this array is used for rendering the buttons and for printing sections into PDF file
export const CV_SECTIONS_PDF={
    basic_information:'basic_information',
    personal_statement:'personal_statement',
    career_summary:'career_summary',
    education_history:'education_history',
    work_history:'work_history',
    projects:'projects',
    publications:'publications',
    technical_skills:'technical_skills',
    editorial_experience:'editorial_experience',
    committees:'committees',
    councils:'councils',
    memberships:'memberships',
    awards_honors:'awards_honors',
    conferences:'conferences',
    journals:'journals'
}

export const RESPONSE_SEVERITY={
    SUCCESS:'success',
    ERROR:'error'
}


export const TITLES = [
    "Prof.",         // Professor
    "Dr.",           // Doctor
    "Researcher",
    "Lecturer",
    "Postdoc",       //Postdoctoral Fellow
    "Visiting Prof.", //Visiting Professor
    "Adjunct Prof.",   //Adjunct Professor
    "Emeritus",      // Professor Emeritus/Professor Emerita
    "Dean",
    "Chair",         // Department Chair/Department Head
    "Provost",
    "Chancellor",
    "President",
    "Librarian",
    "Curator",
    "Fellow",
    "Research Assoc.", //Research Associate
    "Consultant",
    "Editor",        // Editor/Editor-in-Chief
    "Author",
    "Analyst"
]
