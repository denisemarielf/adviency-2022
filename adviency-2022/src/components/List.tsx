import { Gift } from "../types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark, faGift } from "@fortawesome/free-solid-svg-icons"

interface Props {
    gifts: Array<Gift>
    onDeleteGift: (id: string) => void
}

export default function List ({gifts, onDeleteGift}: Props) {

    const renderList = (): JSX.Element[] => {
         return gifts.map(gift => {
            return <li className="list-item">
                <div className="img-container">
                {gift.img? <img className="gift-img" alt={`${gift.name}`} src={gift.img}></img> : <FontAwesomeIcon className="gift-img" icon={faGift} />}
                </div>
                <div>
                <p>{`${gift.quantity} ${gift.name} `}</p>
                <p className="addressee">{gift.addressee}</p>
                </div>
                <button onClick={()=>onDeleteGift(gift.id)} className="list-button"><FontAwesomeIcon icon={faXmark} /></button></li>
          }
          )
        
    }
    return (
        <ul className='wishlist-list'>
        {renderList()}
      </ul>
    )
}