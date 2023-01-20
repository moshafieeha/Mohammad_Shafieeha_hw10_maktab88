users = [];
$.get("https://reqres.in/api/users?page=1").done((res) =>
  users.push(...res.data)
);
$.get("https://reqres.in/api/users?page=2").done((res) => {
  users.push(...res.data);
});