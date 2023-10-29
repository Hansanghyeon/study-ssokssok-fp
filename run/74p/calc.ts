import { type TRank, type TCoupon, TUser } from "./data"
import { pipe, flow } from 'fp-ts/function'
import * as A from 'fp-ts/Array'

// 쿠폰등급 계산기
export function subCouponRank(subscribeer: TUser) {
  // rec_count가 10보다 큰 구독자에게 best 쿠폰을 보내야 한다.
  if (subscribeer.rec_count >= 10) {
    return 'best' as const
  }
  return 'good' as const
}

// 특정 등급의 쿠폰 목록을 선택하는 계산기
export function selectCouponsByRank(coupons: TCoupon[], rank: TRank) {
  // 쿠폰 목록에서 rank가 best인 쿠폰만 골라낸다.
  return pipe(
    coupons,
    A.filter(coupon => coupon.rank === rank),
    A.map(coupon => coupon.code)
  )
}

// good등급이면 good등급 이메일 만들기
export function makeGoodEmail(subscribeer: TUser, goods: string[], bests: string[]) {
  const rank = subCouponRank(subscribeer)
  if (rank === 'best') {
    return {
      from: 'newsletter@coupondog.co',
      to: subscribeer.email,
      subject: 'Your weekly coupons inside',
      body: `Here are the best coupons: ${bests.join(', ')}`,
    }
  } else {
    return {
      from: 'newsletter@coupondog.co',
      to: subscribeer.email,
      subject: 'Your weekly coupons inside',
      body: `Here are the best coupons: ${goods.join(', ')}`,
    }
  }
}

// 보낼 이메일 목록을 준비하기
export function emailsForSubscribers(subscribeers: TUser[], goods: string[], bests: string[]) {
  return pipe(
    subscribeers,
    A.map(subscribeer => makeGoodEmail(subscribeer, goods, bests))
  )
}