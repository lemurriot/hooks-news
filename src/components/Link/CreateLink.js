import React, { useContext } from 'react';
import useFormValidation from '../Auth/useFormValidation';
import validateCreateLink from '../Auth/validateCreateLink';
import FirebaseContext from '../../firebase/context';

const INITIAL_STATE = {
  description: '',
  url: '',
};

function CreateLink(props) {
  const { firebase, user } = useContext(FirebaseContext);
  const { handleSubmit, handleChange, values, errors } = useFormValidation(INITIAL_STATE, validateCreateLink, handleCreateLink);
  function handleCreateLink() {
    if (!user) {
      props.history.push('/login')
    } else {
      const { url, description } = values;
      const newLink = {
        url,
        description,
        postedBy: {
          id: user.uid,
          name: user.displayName
        },
        votes: [],
        comments: [],
        created: Date.now(),
      }
      firebase.db.collection('links').add(newLink);
      props.history.push('/');
    }
  }
  return (
    <form className="flex flex-column" onSubmit={handleSubmit}>
      <input
        className={errors.description && 'error-input'}
        name="description"
        placeholder="A description for your link"
        autoComplete="off"
        type="text"
        onChange={handleChange}
      />
      {errors.description && <p className="error-text">{errors.description}</p>}
      <input
        className={errors.url && 'error-input'}
        name="url"
        placeholder="The url for the link"
        autoComplete="off"
        type="url"
        onChange={handleChange}
      />
      {errors.url && <p className="error-text">{errors.url}</p>}
      <button className="button" type="submit">
        Submit
      </button>
    </form>
  );
}

export default CreateLink;
