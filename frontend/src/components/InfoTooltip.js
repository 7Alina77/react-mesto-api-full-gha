import doneImage from '../images/doneImage.svg';
import failImage from '../images/failImage.svg';

function InfoTooltip({name , isOpen, onClose, isSuccessInfoTooltipStatus}) {
  const {isSuccess, text} = isSuccessInfoTooltipStatus;
  
  return (
    <section className={`popup popup_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <div className="popup__info">
        <img className="popup__info-img" src={isSuccess? doneImage: failImage} alt={text}/>
        <h2 className="popup__info-text">{text}</h2>
      </div>
      <button className="popup__close" type="button" onClick={onClose}></button>
      </div>
    </section>
  )
}

export default InfoTooltip;