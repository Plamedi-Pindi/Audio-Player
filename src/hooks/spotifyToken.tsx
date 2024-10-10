import { useState, useEffect } from "react";
import axios from "axios";

const clientId = '24af5f122d7746eabca6d5326a5f6a7e';
const clientSecret = 'd487681a52484fb9b7c167ea97891500';

const useSpotifyToken = () => {
    const [token, setToken] = useState('');

    useEffect(() => {
        // Functiion to request the token
        const fetchToken = () => async () => {
            const url = 'https://accounts.spotify.com/api/token';

            // Encode the client credentials to Base64
            const credentials = btoa(`${clientId}:${clientSecret}`);

            try {
                const response = await axios.post(url, 'grant_type=client_credentials&client_id=24af5f122d7746eabca6d5326a5f6a7e&client_secret=d487681a52484fb9b7c167ea97891500', {
                    headers: {
                        'Authorization': `Basic ${credentials}`,
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                });

                console.log('Status:', response.status); // Verifica se o status da requisição é 200 (OK)
                console.log('Response:', response);

                console.log("Token received:", response.data.access_token)
                setToken(response.data.access_token); // Armazena o token no estado
            } catch (error) {
                console.error('Error fetching the token:', error);
            }
        }

        fetchToken();
    }, []);

    return token; // Retorna o token para ser utilizado por outros componentes
}

export default useSpotifyToken;