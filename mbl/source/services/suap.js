import axios from 'axios';

export default axios.create({
  baseURL: `https://suap.ifrn.edu.br/api/v2/`
});

