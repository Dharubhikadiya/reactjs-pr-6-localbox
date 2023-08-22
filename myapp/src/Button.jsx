import React, { useState } from 'react';

function Button() {
    const [isFormOpen, setIsFormOpen] = useState(false);

    const handleButtonClick = () => {
        setIsFormOpen(true);
    };

    return (
        <div>
            <button onClick={handleButtonClick}>Open Form</button>
            {isFormOpen && (
                <form>
                    {/* Form fields and elements go here */}
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" />
                    {/* Other form fields... */}
                </form>
            )}
        </div>
    );
}

export default Button;
