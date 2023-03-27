import axios from 'axios';
import { useRef, useState } from 'react';
import classes from './profile-form.module.css';

function ProfileForm() {
  const oldPassword = useRef();
  const newPassword = useRef();
  const [status, setStatus] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    const passwordChange = {
      oldPassword: oldPassword.current.value,
      newPassword: newPassword.current.value,
    };
    axios
      .patch('/api/user/change-password', passwordChange)
      .then((res) => setStatus(res.status))
      .catch((error) => setStatus(error.status));

    if (status === 200) {
      alert('reset password successfully');
    } else {
      alert('reset password fail');
    }
  };
  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='old-password'>Old Password</label>
        <input ref={oldPassword} type='password' id='old-password' />
      </div>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input ref={newPassword} type='password' id='new-password' />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
