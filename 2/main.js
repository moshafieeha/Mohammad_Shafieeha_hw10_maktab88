//DOM part
const usersListContainer = document.getElementById("usersList");
const userProfileModalTitle = document.getElementById("userProfileModalTitle");
const userProfileModalBody = document.getElementById("userProfileModalBody");
const userProfileModalFooter = document.getElementById(
  "userProfileModalFooter"
);

const cardGenerator = ({ id, email, first_name, last_name, avatar }) => {
  return `
        <div class="col-12 col-md-6 col-lg-4 my-2 p-5">
            <div class="card shadow rounded-4">
                <img src="${avatar}" class="card-img-top rounded-5" alt="${id}" style="height: 24rem;">
                <div class="card-body">
                    <h5 class="card-title">${first_name} ${last_name}</h5>
                    ${generateProfileInformation({
                      id,
                      email,
                      first_name,
                      last_name,
                      avatar,
                    })}
                    <button
                        onclick="handleOnClickProfileBtn(${id})" 
                        class="btn btn-primary rounded-3 w-100"
                        data-bs-toggle="modal" data-bs-target="#userProfileModal"
                    >
                        Profile
                    </button>
                </div>
            </div>
        </div>
    `;
};

const generateProfileInformation = ({ id, email, first_name, last_name }) => {
  return `
    <ul class="list-group list-group-flush my-4">
        <li class="list-group-item">${first_name} ${last_name} is Maktab 45 user by UID of ${id}, You can easily get in touch with George from
        ${email}</li>
        <li class="list-group-item">uid: ${id}</li>
        <li class="list-group-item">Email: ${email}</li>
    </ul>
    `;
};

const handleOnClickProfileBtn = (id) => {
  window.location = `/1-2/UserProfile/userProfile.html?id=${id}`;
};

const pagination = (users, pageNumber, pageSize) => {
  const startIndex = (pageNumber - 1) * pageSize;
  return users.slice(startIndex, startIndex + pageSize);
};

const renderUsersList = (users) => {
  usersListContainer.innerHTML = usersListGenerator(users);
};

const usersListGenerator = (users) => {
  let usersListBody = "";
  for (const user of users) {
    usersListBody += cardGenerator(user);
  }
  return usersListBody;
};

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

function closeModal() {
  $(".modal-wrapper").css("display", "none");
}

//modal render function
function renderModal(id) {
  let status;
  if (!id) {
    status = "create";
    selectedUser = {
      id: "",
      email: "",
      first_name: "",
      last_name: "",
      avatar: "",
    };
  } else {
    status = "update";
    selectedUser = users.filter((user) => user.id === id)[0];
  }
  $(".modal-wrapper").html(`<form id="modal">
      <div class="form-group">
        <label for="uid">UID:</label>
        <input type="text" class="form-control" name="uid"  ${
          status === "update" ? "disabled" : "enabled"
        } value="${selectedUser.id}"/>
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" class="form-control" name="email" value="${
          selectedUser.email
        }"/>
      </div>
      <div class="form-group">
        <label for="firstname">Firstname:</label>
        <input type="text" class="form-control" name="firstname" value="${
          selectedUser.first_name
        }"/>
      </div>
      <div class="form-group">
        <label for="lastname">Lastname</label>
        <input type="text" class="form-control" name="lastname" value="${
          selectedUser.last_name
        }"/>
      </div>
      <div class="form-group">
        <label for="avatar">Avatar link:</label>
        <input type="text" class="form-control" name="avatar" value="${
          selectedUser.avatar
        }"/>
      </div>
      <div class="button-wrapper">
        <button
          id="add-btn"
          type="button"
          class="btn btn-success"
          onclick="addNewUser()"
          style="display: ${status === "create" ? "inline-block" : "none"}"
        >
          Add
        </button>
        <button
          id="update-btn"
          type="button"
          class="btn btn-success"
          onclick="updateUser()"
          style="display: ${status === "update" ? "inline-block" : "none"}"
        >
          Update
        </button>
        <button
          id="add-btn"
          type="button"
          class="btn btn-secondary"
          onclick="closeModal()"
        >
          Close
        </button>
      </div>
    </form>`);
  $(".modal-wrapper").css("display", "flex");
}

//reset modal
function resetModal() {
  for (let i = 0; i < 7; i++) {
    modal.children[i].children[1].value = ` `;
  }
}

function updateUser() {
  updatedUser = {
    id: +$("#modal").children()[0].children[1].value,
    email: $("#modal").children()[1].children[1].value,
    first_name: $("#modal").children()[2].children[1].value,
    last_name: $("#modal").children()[3].children[1].value,
    avatar: $("#modal").children()[4].children[1].value,
  };
  //validate updatedUser
  let errorMessage = validator(updatedUser, "update");
  if (!!errorMessage) {
    alert(errorMessage);
    return;
  }
  //validate
  let newUserData = [...users];
  let indexOfUser = users.findIndex((user) => user.id == updatedUser.id);
  newUserData[indexOfUser] = updatedUser;
  users = newUserData;
  $(".card").html(`<div class="banner">
      <img src="${updatedUser.avatar}" alt="${updatedUser.id}">
    </div>
    <h2 class="name">${updatedUser.first_name} ${updatedUser.last_name}</h2>
    <ul class="list-group">
      <li class="list-group-item">UID: ${updatedUser.id}</li>
      <li class="list-group-item">Email: ${updatedUser.email}</li>
    </ul>
    <a class="h4 text-center mt-4 text-decoration-none text-primary" href="../index.html">Back</a>
    <a class="h4 text-center mt-2 mb-3 text-decoration-none text-primary" onclick="renderModal(${updatedUser.id})">Update</a>`);

  $(".modal-wrapper").css("display", "none");
}

function containsOnlyNumbers(str) {
  return /^\d+$/.test(str);
}
function containsOnlyLettersAndSpace(str) {
  return /^[a-zA-Z\s]*$/.test(str);
}
function isValidEmail(email) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}
function isValidUrl(url) {
  return /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(
    url
  );
}
function containsOnlySpace(str) {
  let noSpace = String(str).replace(/ /g, "");
  return noSpace.length === 0;
}

//function that checks if there is any empty input and also check duplicate id
function validator(user, type) {
  //check if user is not an object
  if (typeof user !== "object" || Array.isArray(user) || user === null)
    return "Invalid input";

  for (const key in user) {
    if (user[key] == "" || containsOnlySpace(user[key])) {
      return "Please Fill all the inputs!!!";
    }
  }

  if (type === "create") {
    if (!containsOnlyNumbers(user.id)) return "Id must be numeric";
    if (users.find((person) => person.id == user.id)) {
      return "Choose another id :)";
    }
  }

  if (!isValidEmail(user.email)) return "Invalid Email";
  if (!containsOnlyLettersAndSpace(user.first_name))
    return "firstname cannot contains number";
  if (!containsOnlyLettersAndSpace(user.last_name))
    return "lastname cannot contains number";
  if (!isValidUrl(user.avatar)) return "Invalid avatar URL";
}



//Pagination and search handler (jQuery)
$(() => {
  renderUsersList(pagination(users, 1, 6));
  $(".page-item").on("click", function () {
    $(".page-item").not($(this)).attr("class", "page-item");
    $(this).attr("class", "page-item active");
    let pageNumber = $(this).children("a").html();
    renderUsersList(pagination(users, pageNumber, 6));
  });
  $(".form-inline").submit(function (e) {
    e.preventDefault();
  });
  $("#search-inp").on("keyup", function () {
    const searchValue = $(this).val().toUpperCase();
    let filteredUsers = users.filter((user) => {
      let userValues = Object.values(user);
      for (const value of userValues) {
        if (String(value).toUpperCase().indexOf(searchValue) > -1) {
          return true;
        }
      }
      return false;
    });
    filteredUsers.length > 0
      ? renderUsersList(pagination(filteredUsers, 1, 6))
      : renderUsersList(pagination(users, 1, 6));
  });
});
//render user list for first time
