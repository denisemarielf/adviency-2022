import { Gift } from "../types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

interface Props {
    gifts: Array<Gift>
    onDeleteGift: (id: string) => void
}

export default function List ({gifts, onDeleteGift}: Props) {

    const renderList = (): JSX.Element[] => {
        console.log(gifts)
         return gifts.map(gift => {
            return <li className="list-item">{gift.name 
            }<button onClick={()=>onDeleteGift(gift.id)} className="list-button"><FontAwesomeIcon icon={faXmark} /></button></li>
          }
          )
        
    }
    return (
        <ul className='wishlist-list'>
        {renderList()}
      </ul>
    )
}