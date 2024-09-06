declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

type Payload = {
  categories: 1 | 0;
  groups: 1 | 0;
  planing: 1 | 0;
  limits: 1 | 0;
  comments: 1 | 0;
  tags: 1 | 0;
  smart: 1 | 0;
  forecast: 1 | 0;
  advices: 1 | 0;
};

export const sendDataToGA = async (payload: Payload) => {
  try {
    const now = new Date();
    const date = `${now.getFullYear()}-${
      now.getMonth() + 1
    }-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

    await fetch(
      'https://script.google.com/macros/s/AKfycbzkRA4OD0t_b7SF0xcbBHDPAbzLFJhFTgPclK3-ZzyXPHNAj3gX26tuiTv2io-Jon1Oog/exec',
      {
        redirect: 'follow',
        method: 'POST',
        body: JSON.stringify({ date, ...payload, variant: 'variant1' }),
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
      },
    );
  } catch (error) {
    console.error('Error!', error);
  }
};
