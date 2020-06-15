export default function validateCreateLink(values) {
  const errors = {};
  const urlRE = /^(ftp|http|https):\/\/[^ "]+$/;

  // Description errors
  if (!values.description) {
    errors.description = 'Description required';
  } else if (values.description.length < 10) {
    errors.description = 'Description must be at least 10 characters';
  } else if (values.description.length > 700) {
    errors.description = 'Description must not exceed 700 characters';
  }

  // Url errors
  if (!values.url) {
    errors.url = 'URL required';
  } else if (!urlRE.test(values.url)) {
    errors.url = 'URL must be valid';
  }

  return errors;
}
