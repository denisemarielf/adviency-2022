import { Gift } from "../types"
interface Props {
    gifts: Array<Gift>
}

export default function List ({gifts}: Props) {

    const renderList = (): JSX.Element[] => {
         return gifts.map(gift => {
            return <li>{gift.name}</li>
          })
    }
    return (
        <ul className='wishlist-list'>
        {renderList()}
      </ul>
    )
}