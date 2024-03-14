import React, { useState } from 'react';
import Modal from 'react-modal';
import './Message.css'; // Import your custom styles
import CoverPreloader from '../preloader/Coverpreloader';
import PassPreloader from '../preloader/PassPreloader';
import { useNavigate } from 'react-router-dom';


 const Message =({message,onClose,isOpen})=>{
    const messageTag = (
      <h1 className={message.toLowerCase().includes('succ') ? 'success' : 'error'}>
        {message}
      </h1>
    );
    
    return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Transaction Modal"
      className="transaction-modal"
      overlayClassName="transaction-overlay"
    >
      <div className="modal-content" id='flasher'>
      <span onClick={onClose} className='closex'>x</span>
        
       {messageTag}
        {/* {loading && <PassPreloader loading={loading} isok={false}></PassPreloader>} */}
        <button type='submit' onClick={onClose}>Ok</button>
      </div>

    </Modal>
  );

};

export default  Message