export default dateString => {
  const months = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];
  const date = new Date(dateString);
  let time;
  if(date.getHours === 0) {
    time = `12:${date.getMinutes()} PM`
  }
  else if(date.getHours > 12) {
    var hour = date.getHours() - 12;
    time = `${hour}:${date.getMinutes()} PM`;
  }
  else{
    time = `${date.getHours()}:${date.getMinutes()} AM`;
  }
  const code = `${date.getMonth() + 1}/${date.getDate()}`
  return {
    code ,
    time,
    day: date.getDate(),
    month: months[date.getMonth()],
    year: date.getFullYear(),
  }
}
