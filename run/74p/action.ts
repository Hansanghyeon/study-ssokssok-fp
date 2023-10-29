import { emailsForSubscribers, selectCouponsByRank } from "./calc";
import { DB74p } from "./data";

export function sendIssue() {
  const db = new DB74p()
  // 1. 모든쿠폰을 가져온다.
  const coupons = db.coupons
  // good 쿠폰을 고른다.
  const goods = selectCouponsByRank(coupons, 'good')
  // best 쿠폰을 고른다.
  const bests = selectCouponsByRank(coupons, 'best')
  // subscribeer를 가져온다.
  const subscribeers = db.users
  // 이메일을 만든다
  const emails = emailsForSubscribers(subscribeers, goods, bests)
  // 이메일을 보낸다.
  return emails
}