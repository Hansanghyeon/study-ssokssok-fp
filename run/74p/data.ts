export type TUser = {
  email: string,
  rec_count: number,
}
const users: TUser[] = [
  {
    email: 'john@coldmail.com',
    rec_count: 2,
  },
  {
    email: 'sam@pmail.co',
    rec_count: 16,
  },
  {
    email: 'linda1989@oal.com',
    rec_count: 1,
  },
  {
    email: 'jan1940@ahoy.com',
    rec_count: 0,
  },
  {
    email: 'mrbig@pmail.co',
    rec_count: 25,
  },
  {
    email: 'lol@lol.lol',
    rec_count: 0,
  },
]

export type TRank = 'good' | 'bad' | 'best'
export type TCoupon = {
  code: string,
  rank: TRank,
}
const coupons: TCoupon[] = [
  {
    code: 'MAYDISCOUNT',
    rank: 'good',
  },
  {
    code: '10PERCENT',
    rank: 'bad',
  },
  {
    code: 'PROMOTION45',
    rank: 'best',
  },
  {
    code: 'IHEARTYOU',
    rank: 'bad',
  },
  {
    code: 'GETADEAL',
    rank: 'best',
  },
  {
    code: 'ILIKEDISCOUNTS',
    rank: 'good',
  },
]

const message = {
  from: 'newsletter@coupondog.co',
  to: 'sam@pmail.com',
  subject: 'Your weekly coupons inside',
  body: 'Here are your coupons for this week. Enjoy!',
}

export class DB74p {
  constructor() {
  }
  get users() {
    return users
  }
  get coupons() {
    return coupons
  }
  get message() {
    return message
  }
}
