import { useState } from 'react';

const useTicketsApi = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const submitTicket = async (ticketData) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`${process.env.REACT_APP_DEEPLOY_SERVER_URL}/api/tickets`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(ticketData),
            });

            if (!response.ok) {
                throw new Error('Failed to submit ticket');
            }

            // Handle the response if needed

        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, error, submitTicket };
};

export default useTicketsApi;