import React, { useEffect, useState } from 'react';
import { authService, dbService } from '../fb';
import { useHistory } from 'react-router-dom';

function Profile({ userObj, refreshUser }) {
  const history = useHistory();
  // 소셜 로그인이면 displayName이 있고, 그냥 로그인이면 없으므로
  const profileName = userObj.displayName || userObj.email.split('@')[0];

  const [newDisplayName, setNewDisplayName] = useState(profileName);

  const onLogOutClick = () => {
    authService.signOut();
    history.push('/');
  };

  const getMyNweets = async () => {
    const nweets = await dbService
      .collection('nweets')
      .where('creatorId', '==', userObj.uid)
      .orderBy('createdAt')
      .get();
    console.log(nweets.docs.map((doc) => doc.data()));
  };

  useEffect(() => {
    getMyNweets();
  }, []);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (profileName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type={'text'}
          placeholder={'Display name'}
          value={newDisplayName}
        />
        <input type={'submit'} value={'Update Profile'} />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
}

export default Profile;
