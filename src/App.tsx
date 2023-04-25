import { GET_TOKEN } from './common';
import { HttpMethod, fetchToken } from './helpers/fetchHelper';
import Routes from './routes/routes';
import { useEffect } from 'react';
function App() {
    useEffect(() => {
        fetchToken(`${GET_TOKEN}`, HttpMethod.POST, {
            client_id: 'core_client',
            grant_type: 'password',
            client_secret: 'secret',
            username: 'admin',
            password: 'admin'
        });
    }, []);
    return <Routes />;
}

export default App;
