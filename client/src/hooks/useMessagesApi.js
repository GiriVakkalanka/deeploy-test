import { useState, useEffect } from 'react';

const useMessagesApi = (ticketId) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!ticketId) return; 

    const fetchMessages = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`${process.env.REACT_APP_DEEPLOY_SERVER_URL}/api/messages/${ticketId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch messages');
        }

        const data = await response.json();
        setMessages(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, [ticketId]);

    const postMessage = async (ticketId, messageText, senderId) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`${process.env.REACT_APP_DEEPLOY_SERVER_URL}/api/messages`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ticketId, messageText, senderId })
            });
        
            if (!response.ok) {
                throw new Error('Failed to post message');
            }
        
            const data = await response.json();
            setMessages([...messages, data]);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };  

  return { messages, isLoading, error, setMessages, postMessage };
};

export default useMessagesApi;