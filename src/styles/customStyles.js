import chroma from 'chroma-js';

const colors = {
  blue: '#bbb4fe',
  purple: '#ed84f8',
  salmon: '#fcc5b8',
  white: '#fafafa',
  black: '#141414',
  yellow: '#ebfc87',
};

export const toDataList = (tagNames) => {
  const colorList = [
    '#ebfc87',
    '#ed84f8',
    '#feb985',
    '#bbb4fe',
    '#da96a6',
    '#fcc5b8',
  ];

  return tagNames.map((tag, idx) => {
    const color = colorList[idx % 6];
    return { value: idx, label: tag, color: color };
  });
};

export const multiStyles = (data) => {
  return {
    container: (styles) => ({
      width: '100%',
    }),
    control: (styles) => ({}),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: isDisabled
          ? undefined
          : isSelected
          ? data.color
          : isFocused
          ? color.alpha(0.1).css()
          : undefined,
        color: isDisabled
          ? '#ccc'
          : isSelected
          ? chroma.contrast(color, 'white') > 2
            ? 'white'
            : 'black'
          : data.color,
        cursor: isDisabled ? 'not-allowed' : 'default',

        ':active': {
          ...styles[':active'],
          backgroundColor: !isDisabled
            ? isSelected
              ? data.color
              : color.alpha(0.3).css()
            : undefined,
        },
      };
    },
    multiValue: (styles, { data }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: color.alpha(0.1).css(),
      };
    },
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      color: data.color,
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      color: data.color,
      ':hover': {
        backgroundColor: data.color,
        color: 'white',
      },
    }),
  };
};

export const customStyles = {
  container: (base) => ({
    ...base,
    width: '100%',
  }),
  control: (base, { isFocused }) => ({
    ...base,
    backgroundColor: colors.black,
    borderWidth: isFocused ? '1.6px' : '1.6px',
    boxShadow: isFocused ? 'none' : 'none',
    paddingLeft: '6px',

    '&:hover': {
      borderWidth: '1.6px',
      border: '1.6px solid transparent',
      backgroundImage: ` linear-gradient(${colors.black}, ${colors.black}), linear-gradient(135deg, ${colors.salmon}, ${colors.purple})`,
      backgroundOrigin: 'border-box',
      backgroundClip: 'padding-box, border-box',
    },
  }),
  menuList: (base) => ({
    ...base,
    backgroundColor: colors.black,
    border: '1.6px solid transparent',
    backgroundImage: ` linear-gradient(${colors.black}, ${colors.black}), linear-gradient(135deg, ${colors.salmon}, ${colors.purple})`,
    backgroundOrigin: 'border-box',
    backgroundClip: 'padding-box, border-box',
    borderRadius: '4px',
    overflowX: 'hidden',
    paddingRight: '4px',
    '::-webkit-scrollbar': {
      width: '12px',
    },
    '::-webkit-scrollbar-track': {
      background: 'transparent',
    },
    '::-webkit-scrollbar-thumb': {
      background: `linear-gradient(${colors.salmon}, ${colors.purple})`,
      borderRadius: '1px',
      backgroundClip: 'padding-box',
      border: '5px solid transparent',
    },
  }),
  placeholder: (base) => ({
    ...base,
    opacity: 0.4,
    fontSize: '14px',
    fontFamily: 'Noto-l',
    color: colors.blue,
  }),
  clearIndicator: (base, { isFocused }) => ({
    ...base,
    color: isFocused ? colors.purple : colors.purple,
    '&:hover': {
      color: colors.yellow,
      filter: `drop-shadow(0px 0px 4px ${colors.purple}) brightness(1.2)`,
    },
  }),
  dropdownIndicator: (base, { isFocused }) => ({
    ...base,
    color: isFocused ? colors.purple : colors.purple,
    '&:hover': {
      color: colors.yellow,
      filter: `drop-shadow(0px 0px 4px ${colors.purple}) brightness(1.2)`,
    },
  }),
  option: (base, { isFocused, isSelected }) => ({
    ...base,
    fontSize: '14px',
    fontFamily: isFocused ? 'Noto-m' : isSelected ? 'Noto-m' : 'Noto-l',
    marginLeft: '4px',
    borderRadius: '4px',
    backgroundColor: isFocused
      ? colors.black
      : isSelected
      ? colors.black
      : 'none',

    color: isFocused
      ? colors.white
      : isSelected
      ? colors.purple
      : 'rgba(187, 180, 254, 0.4)',
  }),
  input: (base) => ({
    ...base,
    color: colors.white,
    fontFamily: 'Noto-l',
    fontSize: '14px',
  }),
};
