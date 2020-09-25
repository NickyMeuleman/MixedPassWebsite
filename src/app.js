import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Spring, config, animated } from 'react-spring/renderprops';
import { FaLock, FaLockOpen, FaChevronDown, FaCopy, FaGithub, FaStar } from 'react-icons/fa'
import { FiGlobe } from 'react-icons/fi';
import Swal from 'sweetalert2';
import './main.scss';

export const Index = () => {
  const [Gen, setGen] = useState(false);
  const [Copied, setCopied] = useState(false);
  const [Password, setPassword] = useState('');
  const PasswordGen = () => {
    let length = document.getElementById('length').value;
    // Default Password Length If No Length Selected By User
    if(document.getElementById('length').value === 'Password Length'){
      length = 10;
    }
    let charset = '';
    // Set Default Characters Value Based On User Prams
    document.getElementById('special').value === 'No' || document.getElementById('special').value === 'Add Special Characters' ? charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' : charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789?><.,+=-_{}[]:;"|/!@#$%^&*()';
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
              <option value='Add Special Characters'>Add Special Characters</option>
              <option value='Yes'>Yes</option>
              <option value='No'>No</option>
            </select>
            <select name='length' id='length'>
              <option value='Password Length'>Password Length</option>
              <option value='10'>10 Characters Long</option>
              <option value='20'>20 Characters Long</option>
              <option value='30'>30 Characters Long</option>
              <option value='40'>40 Characters Long</option>
              <option value='50'>50 Characters Long</option>
            </select>
            <a href='https://github.com/mixedbitmedia/MixedPassWebsite' title='View Project On GitHub!' target='_blank' rel='noopener noreferrer'><FaGithub /></a>
            <a href='https://mixedbitmedia.com' title='View Mixedbitmedia!' target='_blank' rel='noopener noreferrer'><FiGlobe /></a>
          </div>
          <div className='genPassContainer'>
            {Gen ? <p style={{ color: '#32cd32', margin: '0 0 20px 0' }}><FaStar className='star' /> New password generated! <FaStar className='star' /></p> : <p>Click the button below to generate a secure password! <br /> <FaChevronDown className='down' /></p>}
            {Gen ? <Spring native config={ config.slow } from={{ opacity: 0 }} to={{ opacity: 1 }}>
              {props => <animated.div style={ props }>
                <input type='text' value={ Password } className='pass' readOnly />
              </animated.div>}
            </Spring> : null}
            {Gen ? <CopyToClipboard text={ Password } onCopy={ () => setCopied(true) }>
              <button onClick={ Copied ? Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Password Has Been Copied To Your Clipboard!'
              }) : null } className='btn'><FaCopy className='ico' /> Copy To Clipboard!</button>
            </CopyToClipboard> : null}
            <span>{Gen ? '|' : null}</span>
            <button onClick={ () => setPassword(PasswordGen()) } className='btn'>{Gen ? 'Generate New Password!' : 'Generate Password!'}</button>
          </div>
        </div>
      </main>
    </animated.div>}
  </Spring>
  );
}