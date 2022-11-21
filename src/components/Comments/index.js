import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'
import CommentItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

export default class Comments extends Component {
  state = {name: '', comment: '', commentsList: []}

  onNameInput = event => this.setState({name: event.target.value})

  onCommentInput = event => this.setState({comment: event.target.value})

  addComment = e => {
    e.preventDefault()
    const {name, comment} = this.state
    const newComment = {
      id: uuidv4(),
      commenter: name,
      comment,
      isLiked: false,
      commentedAt: new Date(),
    }
    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      name: '',
      comment: '',
    }))
  }

  deleteComment = id => {
    const {commentsList} = this.state
    const updatedList = commentsList.filter(
      eachComment => eachComment.id !== id,
    )
    this.setState({commentsList: [...updatedList]})
  }

  toggleLike = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (eachComment.id === id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  render() {
    const {name, comment, commentsList} = this.state

    return (
      <div className="home-container">
        <div className="comments-container">
          <h1 className="comments-heading">Comments</h1>
          <div className="input-details-and-logo-container">
            <form
              onSubmit={this.addComment}
              className="input-details-container"
            >
              <p className="instruction">
                Say something about 4.0 Technologies
              </p>
              <input
                onChange={this.onNameInput}
                value={name}
                placeholder="Your Name"
                type="text"
              />
              <textarea
                onChange={this.onCommentInput}
                value={comment}
                placeholder="Your Comment"
              >
                {null}
              </textarea>
              <button type="submit" className="add-comment-button">
                Add Comment
              </button>
            </form>
            <img
              className="comments-logo"
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
            />
          </div>
          <hr />
          <p className="comments-indication">
            <span className="comments-count">{commentsList.length}</span>
            Comments
          </p>
          {commentsList.length > 0 ? (
            <ul className="comments-list-container">
              {commentsList.map(eachComment => (
                <CommentItem
                  commentDetails={eachComment}
                  key={eachComment.id}
                  deleteComment={this.deleteComment}
                  toggleLike={this.toggleLike}
                />
              ))}
                       
            </ul>
          ) : null}
        </div>
      </div>
    )
  }
}
