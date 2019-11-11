import React, { useState } from 'react';

export const CreateTaskForm = props => {
  const [username, changeUsername] = useState('');
  const [email, changeEmail] = useState('');
  const [text, changeText] = useState('');
  const [errUser, changeErrUser] = useState('');
  const [errEmail, changeErrEmail] = useState('');
  const [errText, changeErrText] = useState('');

  const onClickHandler = e => {
    e.preventDefault();

    const pureUser = username.replace(/<\/?[^>]+>/gi, '');
    const pureEmail = email.replace(/<\/?[^>]+>/gi, '');
    const pureText = text.replace(/<\/?[^>]+>/gi, '');

    const formData = new FormData();
    formData.append('username', pureUser);
    formData.append('email', pureEmail);
    formData.append('text', pureText);

    fetch('https://uxcandy.com/~shapoval/test-task-backend/v2/create?developer=cherepkov', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(result => {
        if (result.status === 'ok') {
          alert('Поздравляем, новая задача создана');
          changeUsername('');
          changeEmail('');
          changeText('');
          changeErrUser('');
          changeErrEmail('');
          changeErrText('');
          props.tasksRequest();
        } else {
          if (result.message.username) changeErrUser(result.message.username);
          else changeErrUser('');
          if (result.message.email) changeErrEmail(result.message.email);
          else changeErrEmail('');
          if (result.message.text) changeErrText(result.message.text);
          else changeErrText('');
        }
      })
      .catch(err => console.log('Error: ', err));
  };

  return (
    <form>
      <h2>Создать задачу:</h2>
      {errUser ? <div className="error">{errUser}</div> : null}
      <label htmlFor="username">Username</label>
      <br />
      <input
        className={errUser ? 'input-error w100' : 'w100'}
        type="text"
        id="username"
        value={username}
        onChange={e => changeUsername(e.currentTarget.value)}
      />
      <br />

      {errEmail ? <div className="error">{errEmail}</div> : null}
      <label htmlFor="email">Email</label>
      <br />
      <input
        className={errEmail ? 'input-error w100' : 'w100'}
        type="email"
        id="email"
        value={email}
        onChange={e => changeEmail(e.currentTarget.value)}
      />
      <br />

      {errText ? <div className="error">{errText}</div> : null}
      <label htmlFor="text">Text</label>
      <br />
      <textarea
        className={errText ? 'input-error w100' : 'w100'}
        id="text"
        value={text}
        onChange={e => changeText(e.currentTarget.value)}
        rows={2}
      ></textarea>
      <br />

      <input className="btn btn-green" type="submit" value="Создать" onClick={onClickHandler} />
    </form>
  );
};
