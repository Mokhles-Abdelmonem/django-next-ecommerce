import cookie from 'cookie';
import { API_URL } from '../../config/index';

export default async (req, res) => {
    if (req.method === 'POST') {
        const cookies = cookie.parse(req.headers.cookie ?? '');
        const access = cookies.access ?? false;
        if (access === false) {
            return res.status(401).json({
                error: 'User unauthorized to make this request'
            });
        }
        
        try {
            const apiRes = await fetch(`${API_URL}/user/profile/`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access}`
                },
                body: req.body
            });
            const data = await apiRes.json();
            return res.status(apiRes.status).json(data);

        } catch(err) {
            return res.status(500).json({
                error: 'Something went wrong'
            });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({
            error: `Method ${req.method} not allowed`
        });
    }
};
