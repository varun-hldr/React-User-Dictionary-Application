import userImg from "../components/img/user.jpg";
import bookImg from "../components/img/book.jpg";

export const makeEditCard = ({ user, onChangeEditHandler, onUserAction }) => {
  return (
    <div key={user.id} className="user">
      <div className="d-flex">
        <img src={userImg} alt="user" />
        <div className="user-details">
          <h6>
            <b>Name: </b>
            <input name="Full Name" onChange={onChangeEditHandler} />
          </h6>
          <h6>
            <b>Email: </b>
            <input name="Email" onChange={onChangeEditHandler} />
          </h6>
          <h6>
            <b>Date of birth: </b>
            <input
              type="date"
              name="Date of birth"
              onChange={onChangeEditHandler}
            />
          </h6>
          <h6>
            <b>Country: </b>
            <input name="Country" onChange={onChangeEditHandler} />
          </h6>
        </div>
      </div>
      <div className="user-action d-flex justify-content-between">
        <div></div>
        <div>
          <button
            className="edit"
            name="update"
            onClick={(e) => onUserAction(e, user)}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export const makeUserCards = ({ user, onUserAction }) => {
  let Months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const DOB = user["Date of birth"];
  const Year = DOB.substring(0, 4);
  const Month = DOB.substring(5, 7);
  const Day = DOB.substring(8, 10);

  return (
    <div key={user.id} className="user">
      <div className="d-flex">
        <img src={userImg} alt="user" />
        <div className="user-details">
          <h6>
            <b>Name:</b> {user["Full Name"]}
          </h6>
          <h6>
            <b>Email:</b> {user.Email}
          </h6>
          <h6>
            <b>Date of birth:</b> {Day} {Months[Month - 1]} {Year}
          </h6>
          <h6>
            <b>Country:</b> {user.Country}
          </h6>
        </div>
      </div>
      <div className="user-action d-flex justify-content-between">
        <div></div>
        <div>
          <button
            className="edit"
            name="edit"
            onClick={(e) => onUserAction(e, user)}
          >
            Edit
          </button>
          <button
            className="del"
            name="del"
            onClick={(e) => onUserAction(e, user)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export const countryFinder = (users, onChangeFilterHandler) => {
  const Country = users.map((user) => user.Country);
  const unique = [...new Set(Country)];
  return unique.map((country, index) => {
    return (
      <li key={index}>
        <a
          onClick={(e) => onChangeFilterHandler(e, country)}
          className="dropdown-item"
          href="#"
          name="Country"
        >
          {country}
        </a>
      </li>
    );
  });
};

export const makeDropDown = ({
  users,
  onChangeFilterHandler,
  onClickFilterHandler,
}) => {
  return (
    <div className="d-flex user-list-head">
      <div className="dropdown">
        <button
          className="filter dropdown-toggle"
          type="button"
          id="dropdownMenu2"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Country
        </button>
        <ul
          className="dropdown-menu overflow-auto"
          aria-labelledby="dropdownMenu2"
        >
          {countryFinder(users, onChangeFilterHandler)}
        </ul>
      </div>

      <div className="dateFilter">
        <input
          type="date"
          className="filter"
          name="DOB"
          onChange={onChangeFilterHandler}
        />
      </div>
      <button onClick={onClickFilterHandler} className="filter-button">
        FILTER
      </button>
    </div>
  );
};

export const makeBooks = ({ onClickHandler }) => {
  const pages = [1, 2, 3, 4, 5, 6, 7, 8];
  return pages.map((page) => {
    return (
      <div key={page} className="book">
        <div className="bookImg">
          <img src={bookImg} alt={page} />
        </div>
        <button
          onClick={() => onClickHandler(page)}
          className="bookBtn bg-primary"
        >
          Users Book {page}
        </button>
      </div>
    );
  });
};
