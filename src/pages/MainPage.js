import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Api from "../utils/Api";

export class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: []
    };
  }

  fetchList = () => {
    Api.get("posts")
      .then(({ data }) => {
        // const { data } = response;
        console.log(data);
        this.setState({
          lists: data.posts
        });
        console.log(this.state.lists, "aaa");
      })
      .catch((error) => console.log(error));
  };

  componentDidMount() {
    console.log("come on!!!!");
    this.fetchList();
  }

  // 리스트 삭제버튼
  deleteList = (_id) => {
    console.log("delete");
    const confirmCheck = window.confirm("정말 삭제하시겠습니까?");
    if (confirmCheck) {
      // comfirm 확인 누를시
      console.log(_id, "asdf");
      Api.delete(`posts/${_id}`)
        .then(() => {
          alert("삭제가 완료되었습니다.");
          this.fetchList();
        })
        .catch((error) => console.log(error));
    }
  };

  render() {
    const { lists } = this.state;
    return (
      <div>
        <h1 className="page-header">학습노트 리스트</h1>
        {lists.length ? (
          <div className="main list-container contents">
            <ul>
              {lists.map((list) => {
                const { _id, title, contents, createdAt } = list;
                return (
                  <li key={_id}>
                    <div className="post-title">{title}</div>
                    <div className="post-contents">{contents}</div>
                    <div className="post-time">
                      {createdAt}
                      <i className="icon ion-md-create"></i>
                      <i
                        className="icon ion-md-trash"
                        onClick={() => this.deleteList(_id)}
                      ></i>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <div className="empty-content">
            <h3>등록된 학습노트가 없습니다.</h3>
          </div>
        )}

        <NavLink to={"/write"} className="create-button">
          <i className="ion-md-add"></i>
        </NavLink>
      </div>
    );
  }
}

export default MainPage;
