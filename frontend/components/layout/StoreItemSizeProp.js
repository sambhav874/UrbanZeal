import Trash from './../../components/icons/Trash';
import Plus from './../../components/icons/Plus';
import ChevronDown from './../../components/icons/ChevronDown'
import ChevronUp from './../../components/icons/ChevronUp'
import { useState } from 'react';


export default function StoreItemSizeProp({ name, addLabel, props, setProps }) {

    const [isOpen , setIsOpen] = useState(false);

    function addProp(ev) {
        ev.preventDefault();
        setProps(oldProps => {
          // Check if oldProps is null or undefined, and initialize it as an empty array if so
          if (!oldProps) {
            return [{ name: '', price: 0 }];
          }
          // If oldProps is already an array, return a new array with the new item appended
          return [...oldProps, { name: '', price: 0 }];
        });
      }
      

  function editProp(ev, index, prop) {
    ev.preventDefault();
    const newValue = ev.target.value;
    setProps(prevSizes => {
      const newSizes = [...prevSizes];
      newSizes[index][prop] = newValue;
      return newSizes;
    });
  }

  function removeProp(indexToRemove) {
    setProps(prev => prev.filter((v, index) => index !== indexToRemove));
  }

  return (
    <div className='bg-gray-200 p-2 rounded-md mb-2'>
        <button type='button' onClick={() => {setIsOpen(prev => !prev)}} className='inline-flex p-1 border-0 justify-start'>
            {isOpen && (<ChevronUp />)}
            {!isOpen && (<ChevronDown />)}<span>{name}</span>
            <span>({props?.length})</span>
            </button>
        
      
<div className={isOpen ? 'block' : 'hidden'}>

{props?.length > 0 && props.map((size, index) => (
        <div key={index} className='flex gap-2 items-end'>
          <div>
            <div><label className='text-gray-800'>Name</label></div>
            
            <input
              onChange={ev => editProp(ev, index, 'name')}
              type='text'
              placeholder='Size Name'
              value={size.name}
            />
          </div>
          <div>
            <label>Extra Price</label>
            <input
              onChange={ev => editProp(ev, index, 'price')}
              type='text'
              placeholder='Price'
              value={size.price}
            />
          </div>
          <div>
            <button type='button' onClick={() => removeProp(index)} className='bg-white mb-2 px-2'>
              <Trash />
            </button>
          </div>
        </div>
      ))}
      <div className="flex justify-center mt-4">
        <button onClick={addProp} className='bg-black items-center'>
          <Plus className='w-4 h-4' />
          <span>{addLabel}</span>
        </button>
      </div>

</div>
      
    </div>
  );
}
