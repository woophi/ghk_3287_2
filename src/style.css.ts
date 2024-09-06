import { globalStyle, style } from '@vanilla-extract/css';

const bottomBtn = style({
  position: 'fixed',
  zIndex: 2,
  width: '100%',
  padding: '12px',
  bottom: 0,
});

const container = style({
  display: 'flex',
  padding: '1rem',
  flexDirection: 'column',
  gap: '1rem',
});

const box = style({
  display: 'flex',
  padding: '1rem',
  flexDirection: 'column',
  gap: '1rem',
  borderRadius: '24px',
  border: '2px solid #F3F4F5',
});

const row = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const switchItem = style({});

globalStyle(`${switchItem} > span > span:first-child`, {
  fontWeight: 500,
});

const imgBox = style({
  backgroundColor: '#F3F4F5',
  borderRadius: '24px',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '.5rem',
});
const imgBoxText = style({
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '.5rem',
  padding: '1rem',
});

export const appSt = {
  bottomBtn,
  container,
  box,
  row,
  switchItem,
  imgBox,
  imgBoxText,
};
