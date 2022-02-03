import React from 'react';

const SubmitButton = ({ disabled }) => {

    if (!disabled) {
        disabled = false;
    }

    return (
        <button
            disabled={disabled}
            type="submit"
            className="btn btn-info"
        >
            Submit
        </button>
    );
};

export default SubmitButton;