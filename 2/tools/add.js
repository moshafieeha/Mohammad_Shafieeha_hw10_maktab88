function addNewUser() {
    let newUser = {
      id: +modal.children[0].children[1].value,
      email: modal.children[1].children[1].value,
      first_name: modal.children[2].children[1].value,
      last_name: modal.children[3].children[1].value,
      avatar: modal.children[4].children[1].value,
    };
    console.log(newUser);
    let errorMessage = validator(newUser, "create");
    if (!!errorMessage) {
      alert(errorMessage);
      return;
    }
    users.push(newUser);
    renderUsersList(pagination(users, 1, 6));
    $(".modal-wrapper").css("display", "none");
  }