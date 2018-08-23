export default value => (value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
