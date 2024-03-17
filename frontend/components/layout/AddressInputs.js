export default function AddressInputs(
    {addressProps , setAddressProps , disabled=false}
){

    const {phoneNumber , streetAddress , pincode , city , country} = addressProps;
    return(<>
        <label>
          Phone Number:
          <input disabled={disabled}
            type="tel"
            className="text-black"
            onChange={(ev) => setAddressProps('phoneNumber' ,ev.target.value)}
            value={phoneNumber}
            placeholder="Phone Number"
          />
        </label>
        <label>
          Street Address:
          <input disabled={disabled}
            type="text"
            className="text-black"
            onChange={(ev) => setAddressProps('streetAddress' ,ev.target.value)}
            value={streetAddress}
            placeholder="Street Address"
          />
        </label>
        <div className="flex gap-4">
          <label>
            Pincode:
            <input disabled={disabled}
              type="text"
              className="text-black"
              onChange={(ev) => setAddressProps('pincode' ,ev.target.value)}
              value={pincode}
              placeholder="Pincode"
            />
          </label>
          <label>
            City:
            <input disabled={disabled}
              type="text"
              className="text-black"
              onChange={(ev) => setAddressProps('city' ,ev.target.value)}
              value={city}
              placeholder="City"
            />
          </label>
        </div>
        <label>
          Country:
          <input disabled={disabled}
            type="text"
            className="text-black"
            onChange={(ev) => setAddressProps('country' ,ev.target.value)}
            value={country}
            placeholder="Country"
          />
        </label></>
    )
}