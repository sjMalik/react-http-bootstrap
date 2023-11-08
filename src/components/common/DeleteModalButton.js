import React, { useState } from 'react';

const DeleteModalButton = ({ onOpen }) => {
    return (
        <button onClick={onOpen}>Open Modal</button>
    );
};

export default DeleteModalButton;
