import React, {useState} from 'react';
import PropTypes from 'prop-types';

import {useFormInput} from '../../hooks/hooks';
import {withFirebase} from '../Firebase';

import Button from '../Button/Button';

const PasswordChangeForm = props => {
  const passwordOne = useFormInput('');
  const passwordTwo = useFormInput('');
  const [error, setError] = useState(null);

  const onSubmit = e => {
    props.firebase
      .doPasswordUpdate(passwordOne.value)
      .then(() => useFormInput)
      .catch(error => {
        setError(error);
      });

    e.preventDefault();
  };

  const isInvalid =
    passwordOne.value !== passwordTwo.value || passwordOne.value === '';

  return (
    <form onSubmit={onSubmit}>
      <input
        name="passwordOne"
        type="password"
        placeholder="New password"
        {...passwordOne}
      />
      <input
        name="passwordTwo"
        type="password"
        placeholder="Confirm new password"
        {...passwordTwo}
      />
      <Button disabled={isInvalid} type="submit" text="Reset my password" />

      {error && <p>{error.message}</p>}
    </form>
  );
};

PasswordChangeForm.propTypes = {
  firebase: PropTypes.object
};

export default withFirebase(PasswordChangeForm);
