const expect = require('chai');

describe('ship', () => {
	let shipObj;

	beforeEach('create a new ship object', () => {
		shipObj = new Ship({x: 0, y:0})
	})

	describe('ship constructor', () => {
		it('it is a constructor function', () => {
			expect(typeof Ship).toEqual('function')
		})
		it('takes object as input', () => {
			expect(typeof arguments[0]).toEqual('object')
		})
		it('has x and y numbers on the input obj', () => {
			expect(arguments[0].x).to.be.a('number')
			expect(arguments[0].y).to.be.a('number')
		})
		it('returns a new obj', () => {
			expect(typeof shipObj).toEqual('object')
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