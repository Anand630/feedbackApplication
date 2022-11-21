import {formatDistanceToNow} from 'date-fns'
import './index.css'

const CommentItem = props => {
  const {commentDetails, deleteComment, toggleLike} = props

  const {
    id,
    commenter,
    comment,
    isLiked,
    commentedAt,
    bgClassName,
  } = commentDetails

  const onDeleteClick = () => deleteComment(id)

  const onLikeClick = () => toggleLike(id)

  const likeImageUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const likeTextColor = isLiked ? 'liked-styling' : 'like-styling'
  const likeText = isLiked ? 'Liked' : 'Like'

  const elapsedTime = formatDistanceToNow(new Date(commentedAt))
  console.log(elapsedTime)

  return (
    <>
      <li className="comment-container">
        <div className="comment-top-container">
          <div className={`icon-container ${bgClassName}`}>
            <p className="initial">{commenter.slice(0, 1)}</p>
          </div>
          <div className="name-time-posted-comment-container">
            <div className="name-time-posted-container">
              <p className="name">{commenter}</p>
              <p className="time">{elapsedTime}</p>
            </div>
            <p className="comment">{comment}</p>
          </div>
        </div>
        <div className="comment-bottom-container">
          <div className="like-icon-and-like-text-container">
            <button onClick={onLikeClick} type="button" className="like-button">
              <img alt={likeText} className="like-icon" src={likeImageUrl} />
            </button>
            <p className={likeTextColor}>{likeText}</p>
          </div>
          <button
            onClick={onDeleteClick}
            type="button"
            className="delete-button"
          >
            <img
              className="delete-icon"
              alt="delete"
              src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            />
          </button>
        </div>
      </li>
      <hr />
    </>
  )
}

export default CommentItem
