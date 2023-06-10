require('chai').should()
import { Password } from './password'

describe('Password', function () {
  it('match encrypted password', function () {
    // arrange
    const password = '1234qwerasdf'
    const sut = new Password(password)

    // act
    const result = sut.comparePassword(password)

    // assert
    result.should.be.equal(true)
  })

  it("doesn't match encrypted password", function () {
    // arrange
    const password1 = '1234qwerasdf'
    const password2 = '5678tyuighjk'
    const sut = new Password(password1)

    // act
    const result = sut.comparePassword(password2)

    // assert
    result.should.be.equal(false)
  })
})
