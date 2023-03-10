import axios from 'axios'

const CryptoAPI = {
	create: crypto => axios.post('/api/crypto', crypto, {
	}),

	getCoinlist: history_id => axios.get(`api/crypto/${history_id}`, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('token')}`
		}
	})
	,

	update: (id, updates) => axios.put(`/api/crypto/${id}`, updates, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('token')}`
		}
	}),
	delete: id => axios.delete(`/api/crypto/${id}`, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('token')}`
		}
	})
}

export default CryptoAPI
