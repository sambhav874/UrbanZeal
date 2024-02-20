import Trash from './../../components/icons/Trash'
import Plus from './../../components/icons/Plus'


export default function StoreItemSizeProp({name ,addLabel , props , setProps}){



function addProp(){
  
    setProps(oldProps => {
      return [...oldProps , {name : '' , price : 0}]
    })
  
  }
  
  function editProp(ev , index , prop){
  
    const newValue = ev.target.value;
    setProps(prevSizes => {
      const newSizes = [...prevSizes]
      newSizes[index][prop] = newValue ;
      return newSizes;
    })
  
  
  }
  
    function removeProp(indexToRemove){
      setProps(prev => prev.filter(( v , index) => index !== indexToRemove))
    }
  
    return (
        <div className='bg-gray-200 p-2 rounded-md mb-2'>
          <label>Sizes</label>
          {props?.length > 0 && props.map((size, index) => (
            <div key={index} className='flex gap-2 items-end'>
              <div>
                <label>{name}</label>
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
          <button onClick={addProp} className='bg-black items-center'>
            <Plus className='w-4 h-4' />
            <span>{addLabel}</span>
          </button>
        </div>
      );
      
}