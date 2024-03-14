### **✅ 필수** 기능 구현 리스트

- [x]  로그인 / 회원가입
- [ ]  프로필 보기
- [x]  새 공연 등록
- [x]  공연 목록 보기
- [ ]  공연 검색하기
- [x]  공연 상세보기
- [ ]  좌석을 지정하지 않고 공연 예매하기
- [ ]  예매 확인하기

### **🏆** 보너스 기능 구현 리스트

- [ ]  공연의 좌석 예매 정보 확인하기
- [ ]  좌석을 지정하여 예매하기
- [ ]  동시성 처리하기
- [ ]  예매 취소하기
- [ ]  테스트 코드 내용 채우기

### **💵** 결제 관련 규칙

1. **결제 관련된 기능은 구현하지 않습니다.**
2. 사용자는 **가입시 100만 포인트를 지급**받습니다. 
3. 공연을 예매할 때 **1석에 최대 5만 포인트**까지를 상한 금액으로 정하도록 하겠습니다.
4. 사용자의 보유 포인트가 모자라는 경우 예매를 할 수 없습니다.
5. 예매 취소 기능을 구현한 경우 지불한 포인트는 환불되어야 합니다.

### **🚨** 주의사항

- **필수 기능 구현 리스트**는 전부 구현을 해주세요!
- 서비스를 개발하면서 타입스크립트의 특징을 최대한 활용해 보세요!
- 모든 데이터 구조와 함수에는 적절한 타입 정의를 적용하셔야 하는 것을 잊지마세요.
- 에러 처리는 적절하게 하도록 하세요!

<br>
<br>
<br>

----

<br>
<br>
<br>


<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
