export interface Customer {
  _id: string
  firstName: string
  lastName: string
  createdAt: string
  DOB: string
  email: string
  phone: string
  address: Address
}

export interface Address {
  _id: string
  line1: string
  line2?: string
  city: string
  postcode: string
  state: string
  country: string
}
