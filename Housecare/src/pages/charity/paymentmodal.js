import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Modal, ModalHeader, ModalBody, ModalFooter, Button, Input
} from 'reactstrap';

const PaymentModal = ({ isOpen, toggle, saveAmount }) => {
  const [amount, setAmount] = useState('');

  const handleSave = () => {
    saveAmount(amount);
    toggle();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>BENEFICIARY PAYMENT DISTRIBUTION</ModalHeader>
      <ModalBody>
        <p>Enter your limited amount:</p>
        <Input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
        />
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSave}>OK</Button>{' '}
        <Button color="secondary" onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};

PaymentModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  saveAmount: PropTypes.func.isRequired,
};

export default PaymentModal;
