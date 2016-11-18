const chai = require('chai');
const spies = require('chai-spies');

chai.use(spies);

var should = chai.should();
var expect = chai.expect;



const Ship = require('../server/lander.js')

describe('ship', () => {
	let shipObj;

	beforeEach('create a new ship object', () => {
    let spy = chai.spy(Ship);
		shipObj = new Ship({x: 0, y:0})
	})

	describe('ship constructor', () => {
		it('it is a constructor function', () => {
			expect(typeof Ship).to.equal('function')
		})
		it('takes object as input', () => {
			expect(spy).to.have.been.called.with({x: 0, y:0})
      // expect(typeof arguments[0]).to.equal('object')
		})
		it('has x and y numbers on the input obj', () => {
      console.log(shipObj.arguments)
			expect(arguments[0].x).to.be.a('number')
			expect(arguments[0].y).to.be.a('number')
		})
		it('returns a new obj', () => {
			expect(typeof shipObj).to.equal('object')
		})
	})

  describe('ship properties', () => {
    xit('has a position property with x and y coordinate set to zero', () => {
      expect(typeof shipObj.position).to.equal('object')
      expect(shipObj.position).to.equal(arguments[0])
    })
    it('has a velocity object with x and y coordinate set to zero', () => {
      expect(typeof shipObj.velocity).to.equal('object')
      expect(shipObj.velocity.x).to.equal(0)
      expect(shipObj.velocity.y).to.equal(0)
    })
    it('has a rotation initially set to zero', () => {
      expect(shipObj.rotation).to.equal(0)
    })
    it('has a rotation speed set to 6', () => {
      expect(shipObj.rotationSpeed).to.equal(6)
    })
    it('has a speed set to 0.15', () => {
      expect(shipObj.speed).to.equal(0.15)
    })
    it('has inertia property set to 0.99', () => {
      expect(shipObj.inertia).to.equal(0.99)
    })
    it('has gravity property set to 0.0005', () => {
      expect(shipObj.gravity).to.equal(0.0005)
    })
    it('has radius property set to 20', () => {
      expect(shipObj.radius).to.equal(20)
    })

  describe('ship methods', () => {

    beforeEach('create a new ship object', () => {
      shipObj = new Ship({x: 0, y: 0});
      shipObj.rotate('left')
	  })

    describe('rotate', () => {
      xit('takes a direction as an argument',() =>{
        expect(typeof arguments[0]).to.equal('string')
      })
      it('subracts rotations speed from rotation if direction is left', () => {   
        expect(shipObj.rotation).to.equal(-6)
      })
      it('adds rotations speed to rotation if direction is right', () => {
        shipObj.rotate('right')
        shipObj.rotate('right')
        expect(shipObj.rotation).to.equal(6)
      })
    })

    describe('accelerate', () => {
      xit('subracts from velocity.x, rotation angle times speed', () => {
        // calling with current rotation of 6
        shipObj.accelerate();
        expect(shipObj.velocity.x).to.equal((shipObj.velocity.x - (Math.sin(-1 * shipObj.rotation * (Math.PI/180)))* shipObj.speed))
      })
      xit('subracts from velocity.y, rotation angle times speed', () => {
        expect(shipObj.velocity.x).to.equal((shipObj.velocity.y - (Math.cos(-1 * shipObj.rotation * (Math.PI/180)))* shipObj.speed))
      })
    })
  })


  })

})

/*
what do we want to test

- ship constructor exists
- has properties:
	- position (x & y)
	- velocity object
		-speed & direction
		- affected by speed & inertia
	- rotation
	- rotation speed
	- inertia
		- constant
	- gravity
		- constant
- methods:
	- rotate (takes direction)
	- accelerate (takes value)
	-
-context.translate & context.rotate will be run in pixi/gameloop to change pos of ship








*/