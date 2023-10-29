import { describe, expect, test } from 'vitest'
import { DB74p } from './data'
import { Spec } from '@spec'
import * as calc from './calc'

describe('10명 이상 추천한 사용자는 더 좋은 쿠폰을 받을 수 있습니다.', () => {
  const db = new DB74p()
  
  test('DB에서 구독자 가져오기', () => {
    expect(db.users).toEqual([
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
    ])
  })

  test('데이터베이스에서 쿠폰 목록 가져오기', () => {
    expect(db.coupons).toEqual([
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
    ])
  })

  test('[계산] 쿠폰 등급을 결정 (DB첫번째 유저로 테스트)', () => {
    const subscribeer = db.users[0]
    const rank = calc.subCouponRank(subscribeer)
    expect(rank).toEqual('good')
  })

  test('[계산] 특정 등급의 쿠폰 목록을 선택하는 함수', () => {
    const coupons = db.coupons
    const goods = calc.selectCouponsByRank(coupons, 'good')
    expect(goods).toEqual(['MAYDISCOUNT', 'ILIKEDISCOUNTS'])
  })

  test('[계산] 구독자가 받을 이메일을 계획하는 함수', () => {
    const subscribeer = db.users[0]
    const goods = calc.selectCouponsByRank(db.coupons, 'good')
    const bests = calc.selectCouponsByRank(db.coupons, 'best')
    const email = calc.makeGoodEmail(subscribeer, goods, bests)
    expect(email).toEqual({
      from: 'newsletter@coupondog.co',
      to: 'john@coldmail.com',
      subject: 'Your weekly coupons inside',
      body: `Here are the best coupons: MAYDISCOUNT, ILIKEDISCOUNTS`,
    })
  })

  test('[계산] 보낼 이메일 목록을 준비', () => {
    const goods = calc.selectCouponsByRank(db.coupons, 'good')
    const bests = calc.selectCouponsByRank(db.coupons, 'best')
    const emails = calc.emailsForSubscribers(db.users, goods, bests)
    expect(emails).toEqual([
      {
        "body": "Here are the best coupons: MAYDISCOUNT, ILIKEDISCOUNTS",
        "from": "newsletter@coupondog.co",
        "subject": "Your weekly coupons inside",
        "to": "john@coldmail.com",
      },
      {
        "body": "Here are the best coupons: PROMOTION45, GETADEAL",
        "from": "newsletter@coupondog.co",
        "subject": "Your weekly coupons inside",
        "to": "sam@pmail.co",
      },
      {
        "body": "Here are the best coupons: MAYDISCOUNT, ILIKEDISCOUNTS",
        "from": "newsletter@coupondog.co",
        "subject": "Your weekly coupons inside",
        "to": "linda1989@oal.com",
      },
      {
        "body": "Here are the best coupons: MAYDISCOUNT, ILIKEDISCOUNTS",
        "from": "newsletter@coupondog.co",
        "subject": "Your weekly coupons inside",
        "to": "jan1940@ahoy.com",
      },
      {
        "body": "Here are the best coupons: PROMOTION45, GETADEAL",
        "from": "newsletter@coupondog.co",
        "subject": "Your weekly coupons inside",
        "to": "mrbig@pmail.co",
      },
      {
        "body": "Here are the best coupons: MAYDISCOUNT, ILIKEDISCOUNTS",
        "from": "newsletter@coupondog.co",
        "subject": "Your weekly coupons inside",
        "to": "lol@lol.lol",
      },
    ])
  })
})