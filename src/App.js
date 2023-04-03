import React, { useState, useEffect } from "react";
import "./App.css";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneIcon from "@mui/icons-material/Phone";
import LanguageIcon from "@mui/icons-material/Language";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from '@mui/icons-material/Favorite';
import  BeatLoader from "react-spinners/BeatLoader";



const App = () => {
  const [userList, setUserList] = useState([]);
  const [modal, setModal] = useState(false);
  const [like, setLike] = useState(false)
  const [isloading,setLoading]= useState(false)
  useEffect(() => {
    loader()
    apiData();
  }, []);

  const apiData = () => {
    fetch("https://jsonplaceholder.typicode.com/users").then((res) => {
      res.json().then((resp) => {
        setUserList(resp);
      });
    });
  };

  const deleteUser = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "DELETE",
    }).then((res) => {
      res.json().then((resp) => {
        console.log(resp);
      });
    });
  };
  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const Liked = ()=>{
    setLike(!like)
  }

  const loader = ()=>{
    setLoading(true)
    setTimeout(()=>{
      setLoading(false)
    },4000)
  }


  return (
    <div className="App">
{
  isloading 
  ? 
  <BeatLoader/>

  :

  userList.map((user, i) => (
        <div key={i} className="card">
          <img
            src={`https://avatars.dicebear.com/v2/avataaars/{${user.username}}.svg?options[mood][]=happy`}
            alt="avtaar"
          />
          <h1>{user.name}</h1>
          <h2>
            <MailOutlineIcon className="mail" />
            {user.email}
          </h2>
          <h2>
            <PhoneIcon className="phone" />
            {user.phone}
          </h2>
          <h2>
            <LanguageIcon className="web" />
            {user.website}
          </h2>
          <ul className="bottomcard">
            <button >
              <FavoriteIcon className={like ? "likeee" : "notLiked"}  onClick={Liked} />
            </button>
            <button onClick={toggleModal}>
              <DriveFileRenameOutlineOutlinedIcon />
            </button>

            {modal && (
              <div className="modal">
                <div onClick={toggleModal} className="overlay"></div>
                <div className="modal-content">
                  <div className="container">
                    <form action="">
                      <h1>Simple Modal</h1>
                      <div className="input">
                        <input type="text" placeholder="Name" />
                      </div>
                      <div>
                        <input type="text" name="email" placeholder="E-mail" />
                      </div>
                      <div >
                        {" "}
                        <input type="number" placeholder="Phone" />
                      </div>
                      <div className="input">
                        <input type="text" placeholder='Web' />
                      </div>
        nit              <div>
                       <button type="submit">Submit</button>
                      </div>
                    </form>
                  </div>
                  <button className="close-modal" onClick={toggleModal}>
                    <CloseIcon />
                  </button>
                </div>
              </div>
            )}
            <button onClick={() => deleteUser(user.id)} className="update">
              <DeleteOutlineOutlinedIcon />
            </button>
          </ul>
        </div>
      ))}

      
    </div>
  );
};

export default App;
