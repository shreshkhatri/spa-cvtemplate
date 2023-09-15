import dayjs from 'dayjs';
import _ from 'lodash';

export function capitalizeWords(str) {
  
  if (_.isEmpty(str)) return;

    let words = str.split(' ');
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    return words.join(' ');
  }


export function formatDate(inputDateString) {
  // Parse the input date string
  const parsedDate = dayjs(inputDateString);

  // Format the date in 'MMMM, YYYY' format
  const formattedDate = parsedDate.format('MMMM, YYYY');
  return formattedDate;
}

export function getYear(inputDateString) {
  // Parse the input date string
  const parsedDate = dayjs(inputDateString);

  // Format the date in 'MMMM, YYYY' format
  return parsedDate.format('YYYY');
  
}



export function formatHarvardAuthors(authors) {
  const formattedAuthors = authors.map(author => {
    const formattedName = `${author.last_name}, ${author.first_name.charAt(0)}.`;
    return formattedName;
  });

  if (formattedAuthors.length === 1) {
    // Only one author
    return formattedAuthors[0];
  } else if (formattedAuthors.length === 2) {
    // Two authors
    return `${formattedAuthors[0]} ${formattedAuthors[1]}`;
  } else {
    // Three or more authors
    const lastAuthor = formattedAuthors.pop();
    return `${formattedAuthors.join(', ')}, ${lastAuthor}`;
  }
}


// function to combine first name and last name and return as string
export function getAllAuthorsName(authors) {
  const fullNames = authors.map(author => `${author.first_name} ${author.last_name}`);
  return fullNames.join(', ');
}