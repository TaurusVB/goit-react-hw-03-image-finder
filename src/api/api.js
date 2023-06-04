import axios from 'axios';

const API_KEY = '35461172-aba5a47e12cfcacf79e93a52f';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const getImages = async ({ searchQuery, page, per_page }) => {
  const params = new URLSearchParams({
    page,
    key: API_KEY,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: per_page,
  });

  const response = await axios.get(`?${params}`);

  return response;
};
