document.addEventListener('DOMContentLoaded', () => {
    const checkoutForm = document.getElementById('checkout-form');

    checkoutForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const formData = new FormData(checkoutForm);
        const formDataObject = {};
        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });
        
        try {
            const response = await fetch('/process_checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formDataObject),
            });
            
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                // Redirect or do something else upon successful checkout
            } else {
                throw new Error('Thanks for ordering');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Thanks for ordering.');
        }
    });
});
