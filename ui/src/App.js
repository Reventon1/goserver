import React, {useState, useEffect, useRef} from "react";
import axios from "axios";
import './App.css';

// document.addEventListener("DOMContentLoaded", function(){
//   var scrollbar = document.body.clientWidth - window.innerWidth + 'px';
//   console.log(scrollbar);
//   document.querySelector('[href="#openModal"]').addEventListener('click',function(){
//     document.body.style.overflow = 'hidden';
//     document.querySelector('#openModal').style.marginLeft = scrollbar;
//   });
//   document.querySelector('[href="#close"]').addEventListener('click',function(){
//     document.body.style.overflow = 'visible';
//     document.querySelector('#openModal').style.marginLeft = '0px';
//   });
// });

function App() {
  const [notes, setNotes] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);

  const inputInfo = useRef(null);
  const inputTitle = useRef(null);
  const inputEditTitle = useRef(null);
  const inputEditInfo = useRef(null);
  
  useEffect(() => {
    axios.get(
      'http://localhost:9090/api/notes',
      {
        withCredentials: false
      }
    ).then(response => {
      console.log(response.data);
      setNotes(response.data);
    });
  }, [isUpdate]);

  const addNote = () => {
    axios.post(
      'http://localhost:9090/api/note/add', 
      {
        title: inputTitle.current.value,
        info: inputInfo.current.value
      }, 
      {
        withCredentials: false
      }).then(() => {
        setIsUpdate(!isUpdate);
      });
  }

  const delNote = (id) => {
    axios.delete(
      'http://localhost:9090/api/note/'+ id, 
      ).then(() => {
        setIsUpdate(!isUpdate);
      });
  }

  const editNote = () => {
    axios.put(
      'http://localhost:9090/api/note/edit/',
      {
        title: inputEditTitle.value,
        info: inputEditInfo.value,
      },
      {
        withCredentials: false
      }
    ).then(() => {
      setIsUpdate(!isUpdate)
    })
  }

  return (
    <div className="App">
      <div id="openModal" className="modal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Создание заметки</h3>
              <a href="#close" title="Close" className="close">×</a>
            </div>
              <div className="modal-body">    
              <label>Заголовок</label>
              <input ref={inputTitle} type="text"/>
              <label>Описание</label>
              <input ref={inputInfo} type="text"/>
              <br></br>
              <button 
                onClick={() => addNote()}>
                  Добавить
              </button>
            </div>
          </div>
        </div>
      </div>

      <a href="#openModal"><div className="openButton">Создать заметку</div></a>
      

      
      {!!notes && notes.map((note, index) => (
        <div className="card">
          <div className="card_id">
            <div key={index}>{note.id}</div>
            <div className="delButton">
              <button 
                onClick={() => delNote(note.id)}>
                  ×
              </button>
            </div>
          </div>
          <div className="card_text">
            <div className="title" key={index}>{note.title}</div>
            <div className="info" key={index}>{note.info}</div>
          </div>
          {/* <div className="card_edit">
            <label>Новый заголовок</label>
            <input ref={inputEditTitle} type="text"/>
            <label>Новое описание</label>
            <input ref={inputEditInfo} type="text"/>
            <button 
              onClick={() => editNote(note.id)}>
                Обновить
            </button>
          </div> */}
        </div>
      ))}
    </div>
  );
}

export default App;
