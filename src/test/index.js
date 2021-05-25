let platformCheckbox = [
  {
    label: 'a-platform',
    value: 'a-platform',
  },
  {
    label: 'b-platform',
    value: 'b-platform',
  },
  {
    label: 'c-platform',
    value: 'c-platform',
  },
];
let newVal = ['a-platform'];
let platformStatus = newVal.filter(item =>
  platformCheckbox.find(checkboxItem => item === checkboxItem.value)
);
console.log(platformStatus);