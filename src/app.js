import React, { useState } from 'react';
import { FaLock, FaLockOpen } from 'react-icons/fa';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Spring, config, animated } from 'react-spring/renderprops';
import Swal from 'sweetalert2';
import './main.scss';

export const Index = () => {
  const [Gen, setGen] = useState(false);
  const [Copied, setCopied] = useState(false);
  const [Password, setPassword] = useState('');
  const PasswordGen = () => {
    let length = document.getElementById('length').value;
    // Default Password Length To 10 Chars If No Lenth Selected By User
    if(document.getElementById('length').value === 'Password Length'){
      length = 10;
    }
    let charset = '';
    // Set Default Chars Value Based On User Prams
    if(document.getElementById('special').value === 'No' || document.getElementById('special').value === 'Add Special Chars'){
      charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    }else {
      charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789?><.,+=-_{}[]:;"|/!@#$%^&*()';
    }
    let val = '';
    for(var i = 0; i < length; ++i){
      val += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setGen(true)
    return val;
  }
  return(
  <Spring native config={ config.slow } from={{ opacity: 0 }} to={{ opacity: 1 }}>
    {props => <animated.div style={ props }>
      <main>
        <div className='container'>
          <h1>{Gen ? <FaLock className='ico' /> : <FaLockOpen className='ico' />} MIXEDPASS</h1>
          <div className='nav'>
            <select name='special' id='special'>
              <option value='Add Special Chars'>Add Special Chars</option>
              <option value='Yes'>Yes</option>
              <option value='No'>No</option>
            </select>
            <select name='length' id='length'>
              <option value='Password Length'>Password Length</option>
              <option value='10'>10 Char Long</option>
              <option value='20'>20 Char Long</option>
              <option value='30'>30 Char Long</option>
              <option value='40'>40 Char Long</option>
              <option value='50'>50 Char Long</option>
            </select>
          </div>
          <div className='genPassContainer'>
            {Gen ? <Spring native config={ config.slow } from={{ opacity: 0 }} to={{ opacity: 1 }}>
              {props => <animated.div style={ props }>
                <input type='text' value={ Password } className='pass' readOnly />
              </animated.div>}
            </Spring> : null}
            {Gen ? <CopyToClipboard text={ Password } onCopy={ () => setCopied(true) }>
              <button onClick={ Copied ? Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Your Password Has Been Copied To Your Clipboard!'
              }) : null } className='btn'>Copy To Clipboard!</button>
            </CopyToClipboard> : null}
            {Gen ? '|' : null}
            <button onClick={ () => setPassword(PasswordGen()) } className='btn'>{Gen ? 'Generate New Password!' : 'Generate Password!'}</button>
          </div>
        </div>
      </main>
    </animated.div>}
  </Spring>
  );
}